// associate category, reviews with product
// used when product or products query is fired with the relevant sub type included - eg category and/or reviews

// exports.Product = {
//   category: (parent, args, context) => {
//     const categoryId = parent.categoryId
//     return context.categories.find(category => category.id === categoryId)
//   }
// }

// 'cleaner' syntax
exports.Product = {
  category: ({categoryId}, args, { data }) => {
    return data.categories.find((category) => category.id === categoryId);
  },
  reviews: ({id: productId}, args, { data }) => {
    return data.reviews.filter((review) => review.productId === productId)
  }
}