const mongoose = require('mongoose');
const {ApolloServer} = require('apollo-server');
const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolvers');
require('dotenv').config({path: '.env'});

mongoose.connect(process.env.BBDD, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, _) => {
    if(err) {
        console.log('Error de conexion');
    } else {
        server();
    }
});
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

function server() {
    const serverApollo = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground({
              // options
            })
        ],
    });
    serverApollo.listen().then(({url}) => {
        console.log(`Servidor Listo en: ${url}`)
    })
}