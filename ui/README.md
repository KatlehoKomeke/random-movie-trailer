# :warning: Warning

The project is not supplied with .env files   
so if you wish to run this yourself, you will  
need to create some yourselves

# Here is a simple flow chart:

```mermaid 
    graph TD;
    SignIn-->Home;
    Home---Menu;
    Home---Content;
    *:::errorHandling-->|Any exception|Error:::errorHandling;
    Error-->Home;
    Error-->SignIn;
    classDef errorHandling stroke:#f00
```
<a href="https://www.figma.com/file/ZO9bm3t2hx4vl7TNvPaKA7/Games-Global-Technical-Assessment?type=design&node-id=0%3A1&mode=design&t=qyyrC9ExufdGi1lr-1" target="_blank">
    click to see design
</a>

# Tech Stack

node version: 20.7.0  
npm version: 10.1.0  

for more information read the pacakge.json file
