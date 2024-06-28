import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";
import typeDefs from "./schemagql.js";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("connected to mongodb");
})

mongoose.connection.on("error", (err) => {
    console.log("connection fail", err);
})


//Import model
import "./models/User.js"
import "./models/Quotes.js"
import resolvers from "./resolvers.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen().then(({ url }) => {
    console.log(`server ready at ${url}`);
});