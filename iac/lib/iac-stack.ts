import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as dotenv from 'dotenv'
import { standardCognitoAttributes } from '../types/cognitoClientAttributes'
import { nodeModules } from './../../api/lambdas/signUp'
import * as path from 'path'

// The project is not suppplied with 
// a .env as that is bad practice. 
// So please note that should you wish 
// to run this, you would have to create 
// one.
dotenv.config({path:'./.env'})

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, {
      env: {
        region: process.env.aws_region!
      },
      ...props
    })

    // // // Prints out the AppSync GraphQL endpoint to the terminal
    // new cdk.CfnOutput(this, "GraphQLAPIURL", {
    //   value: api_graphql.graphqlUrl
    // })

    // Prints out the stack region to the terminal
    new cdk.CfnOutput(this, "Stack Region", {
      value: this.region
    })

    // Prints out the stack working directory
    new cdk.CfnOutput(this, "__dirname", {
      value: __dirname
    })

    const userPool = new cdk.aws_cognito.UserPool(this, process.env.user_pool!, {
      userPoolName: process.env.user_pool!,
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        createdAt: new cdk.aws_cognito.DateTimeAttribute()
      },
      passwordPolicy: {
        minLength: parseInt(process.env.user_pool_password_min_length!),
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: true,
        requireSymbols: true,
      },
      accountRecovery: cdk.aws_cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    })

    const clientReadAttributes = new cdk.aws_cognito.ClientAttributes()
    .withStandardAttributes(standardCognitoAttributes)
    .withCustomAttributes('createdAt')

    const clientWriteAttributes = new cdk.aws_cognito.ClientAttributes()
    .withStandardAttributes({
      ...standardCognitoAttributes,
      email: false,
      emailVerified: false,
      phoneNumberVerified: false,
      lastUpdateTime: false
    })

    new cdk.aws_cognito.UserPoolClient(this, process.env.user_pool_client!, {
      userPool,
      supportedIdentityProviders: [
        cdk.aws_cognito.UserPoolClientIdentityProvider.COGNITO,
      ],
      readAttributes: clientReadAttributes,
      writeAttributes: clientWriteAttributes,
    })

    // Creates a graphql API using AppSync
    // const api_graphql = new cdk.aws_appsync.GraphqlApi(this, process.env.api_graphql!, {
    //   name: process.env.api_graphql!,
    //   // The schema prop is deprecated and will be removed
    //   // however the current documentation is not clear on
    //   // how to migrate from this implementation, so I'm
    //   // leaving it here for now.
    //   // schema: cdk.aws_appsync.SchemaFile.fromAsset(process.env.api_graphql_schema_path!),
    //   authorizationConfig: {
    //     defaultAuthorization: {
    //       authorizationType: cdk.aws_appsync.AuthorizationType.API_KEY,
    //       apiKeyConfig: {
    //         expires: cdk.Expiration.after(
    //           cdk.Duration.days(
    //             parseInt(process.env.api_key_expiration!)
    //           )
    //         )
    //       }
    //     },
    //     additionalAuthorizationModes: [
    //       {
    //         authorizationType: cdk.aws_appsync.AuthorizationType.USER_POOL,
    //         userPoolConfig: {
    //           userPool: userPool
    //         }
    //       }
    //     ]
    //   },
    //   xrayEnabled: true
    // })

    const signUpLambda = new cdk.aws_lambda_nodejs.NodejsFunction(this, process.env.signUp_lambda_id!, {
      runtime: cdk.aws_lambda.Runtime.NODEJS_LATEST,
      entry: process.env.signUp_lambda_path!, // accepts .js, .jsx, .ts, .tsx and .mjs files
      // handler: process.env.signUp_lambda, // defaults to 'handler'
      memorySize: parseInt(process.env.lambda_size!), // size in MBs
      bundling: {
        nodeModules: nodeModules
      }
    })

    const userTable = new cdk.aws_dynamodb.Table(this, process.env.user_table!, {
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: process.env.user_table_partition_key!,
        type: cdk.aws_dynamodb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.RETAIN
    })

    // enable the Lambda function to access the DynamoDB table (using IAM)
    userTable.grantFullAccess(signUpLambda)

    // Create an environment variable that we will use in the function code
    signUpLambda.addEnvironment(process.env.user_table!, userTable.tableName)

  }
}
