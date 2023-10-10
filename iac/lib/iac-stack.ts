import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as dotenv from 'dotenv'
import { graphqlQueryType, standardCognitoAttributes } from '../types/types'

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
      customAttributes: {
        createdAt: new cdk.aws_cognito.DateTimeAttribute()
      },
      passwordPolicy: {
        minLength: parseInt(process.env.user_pool_password_min_length!),
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: true,
        requireSymbols: true
      },
      accountRecovery: cdk.aws_cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE
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
    const api_graphql = new cdk.aws_appsync.GraphqlApi(this, process.env.api_graphql!, {
      name: process.env.api_graphql!,
      // The schema prop is deprecated and will be removed
      // however the current documentation is not clear on
      // how to migrate from this implementation, so I'm
      // leaving it here for now.
      schema: cdk.aws_appsync.SchemaFile.fromAsset(process.env.api_graphql_schema_path!),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: cdk.aws_appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: cdk.Expiration.after(
              cdk.Duration.days(
                parseInt(process.env.api_key_expiration!)
              )
            )
          }
        },
        additionalAuthorizationModes: [
          {
            authorizationType: cdk.aws_appsync.AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool: userPool
            }
          }
        ]
      }
    })

    const mainLambda = new cdk.aws_lambda.Function(this, process.env.main_lambda_handler!, {
      runtime: cdk.aws_lambda.Runtime.NODEJS_LATEST,
      handler: process.env.main_handler!,
      code: cdk.aws_lambda.Code.fromAsset(process.env.main_handler_dirname!),
      memorySize: parseInt(process.env.lambda_size!)
    })

    // Set the new Lambda function as a data source for the AppSync API
    const mainLambdaDS = api_graphql.addLambdaDataSource(process.env.main_lambdaDS!, mainLambda);

    mainLambdaDS.createResolver(process.env.get_content_by_id_resolver!,{
      typeName: graphqlQueryType.Query,
      fieldName: process.env.get_content_by_id!
    })
    
    const userBehaviourTable = new cdk.aws_dynamodb.Table(this, process.env.user_behaviour_table!, {
      billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: process.env.user_behaviour_table_partition_key!,
        type: cdk.aws_dynamodb.AttributeType.STRING,
      },
      removalPolicy: cdk.RemovalPolicy.RETAIN
    })

    // enable the Lambda function to access the DynamoDB table (using IAM)
    // userBehaviourTable.grantFullAccess(signUpLambda)

    // Create an environment variable that we will use in the function code
    // signUpLambda.addEnvironment(process.env.user_table!, userBehaviourTable.tableName)

    const cloudfrontBucket = new cdk.aws_s3.Bucket(this, process.env.s3_bucket!, {
      encryption: cdk.aws_s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: process.env.website_entrypoint!,
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false
      },
      // S3 bucket hack for rendering 404s for SPAs
      // as S3 does not support SPAs properly
      websiteErrorDocument: process.env.website_entrypoint!,
      publicReadAccess: true,
      objectOwnership: cdk.aws_s3.ObjectOwnership.OBJECT_WRITER,
      autoDeleteObjects: true
    })
    
    new cdk.aws_s3_deployment.BucketDeployment(this, process.env.s3_deployment!, {
      sources: [cdk.aws_s3_deployment.Source.asset(process.env.frontend_path!)],
      destinationBucket: cloudfrontBucket,
      contentLanguage: "en"
    })
    
    new cdk.aws_cloudfront.Distribution(this, process.env.cloudfront_distribution!, {
      defaultBehavior: { 
        origin: new cdk.aws_cloudfront_origins.S3Origin(cloudfrontBucket)
      }
    })
  }
}
