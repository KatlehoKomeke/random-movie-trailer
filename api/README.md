# :warning: Warning

The project is not supplied with .env files   
so if you wish to run this yourself, you will  
need to create some yourselves

# Here is a simple flow chart:

```mermaid 
    graph TD;
    main-handler--->deleteWatchlist-->ubt[(userBahviour_table)];
    main-handler--->getContent-->tmdb-API;
    main-handler--->getContentById-->tmdb-API;
    main-handler--->getWatchlist-->ubt[(userBahviour_table)];
    main-handler--->updateWatchlist-->ubt[(userBahviour_table)];
```

# Tech Stack

node version: 20.7.0  
npm version: 10.1.0  

for more information read the pacakge.json file