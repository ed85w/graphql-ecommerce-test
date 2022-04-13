// associate reviews with product (for review query, not required if running product query)

// exports.Review = {
//   product: (parent, args, context) => {
//     return context.products.find((product) => product.id === parent.productId)
//   }
// }

exports.Review = {
  product: ({productId}, args, {products}) => {
    return products.find((product) => product.id === productId);
  }
}