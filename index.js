const express = require("express");
const mongoose = require("mongoose");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./Schema/Schema")
require('dotenv').config()
console.log(process.env)

const app = express();

//This route will be used as an endpoint to interact with Graphql, 
//All queries will go through this route. 
app.use("/graphql", graphqlHTTP({
    //directing express-graphql to use this schema to map out the graph 
    schema,
    //directing express-graphql to use graphiql when goto "/graphql" address in the browser
    //which provides an interface to make GraphQl queries
    graphiql:true
}));

mongoose.connect(`mongodb+srv://AmadoJunior:${process.env.DB_PASS}@cluster0.s3lnp.mongodb.net/GRAPHQL?retryWrites=true&w=majority`);
mongoose.connection.once("open", () => {
    app.listen(3000, () => {
        console.log("Listening on port 3000");
    }); 
});
