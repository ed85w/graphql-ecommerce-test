// define structure of data and queries
// scala types = String, Int, Float, Boolean. '!' means no null value allowed (ie required field)
const {  gql } = require("apollo-server");

exports.typeDefs = gql`
  # queries
  type Query {
    products(filter: ProductsFilterInput): [Product!]! 
    product(id: ID!): Product!
    categories: [Category!]!
    category(id: ID!): Category!
    reviews: [Review!]!
    review(id: ID!): Review!
  }

  #mutations (add/delete/update)
  type Mutation {
    addCategory(input: AddCategoryInput!): Category!
    addProduct(input: AddProductInput!): Product!
    addReview(input: AddReviewInput!): Review!
  }

  # data 
  type Product {
    id: ID!
    name: String!   
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    category: Category
    reviews: [Review!]!
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
    product: Product!
  }

  # inputs - used for filters and mutations

  # filter (see query.js category.js for uses)
  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }

  #input
  input AddCategoryInput {
    name: String!
  }

  input AddProductInput {
    name: String!   
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    categoryId: String!
  }

  input AddReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: String!
  }
  
`