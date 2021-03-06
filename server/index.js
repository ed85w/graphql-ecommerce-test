const { ApolloServer } = require("apollo-server");
const { typeDefs } = require('./schema');
const { Query } = require('./resolvers/Query');
const { Category } = require('./resolvers/Category');
const { Product } = require('./resolvers/Product');
const { Review } = require('./resolvers/Review');
const { Mutation } = require('./resolvers/Mutation')

const { data } = require('./data');


const server = new ApolloServer({
  typeDefs,  
  resolvers: {
    Query,
    Category,
    Product,
    Review,
    Mutation
  },
  // context allows us to pass the context/data (for use in Query.js, Category.js, Product.js etc)
  context: {
    // products,
    // categories,
    // reviews,
    data   // see data.js
  }
});

const PORT = process.env.PORT || 5000;  // default is same as react, so change to 5000

server.listen(PORT).then(({url}) => {
  console.log("server is ready at " + url)
})