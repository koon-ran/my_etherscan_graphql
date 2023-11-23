const { ApolloServer } = require("apollo-server"); //ApolloServer is a class that we will extend
const { importSchema } = require("graphql-import"); //importSchema is a function that we will use to import our schema
const EtherDataSource = require("./datasource/ethDatasource"); //Import the EtherDataSource class that we created in datasource/ethDatasource.js
const typeDefs = importSchema("./schema.graphql"); //Import the schema file




require("dotenv").config(); //Loads the.env file

const resolvers = {
  Query: {
    // Get ether balance for an address
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Get total supply of ether
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Get latest ethereum price
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Get block confirmation time
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};
const server = new ApolloServer({ //Create Apollo Server
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});


server.timeout = 0;
// Start server on port 9000
server.listen("9000").then(({ url }) => {
  // Log message when server is ready
  console.log(`🚀 Server ready at ${url}`);
});
