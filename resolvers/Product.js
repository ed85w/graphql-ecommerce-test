// associate category, reviews with product

// exports.Product = {
//   category: (parent, args, context) => {
//     const categoryId = parent.categoryId
//     return context.categories.find(category => category.id === categoryId)
//   }
// }

// 'cleaner' syntax
exports.Product = {
  category: ({categoryId}, args, {categories}) => {
    return categories.find((category) => category.id === categoryId);
  },
  reviews: ({id: productId}, args, {reviews}) => {
    return reviews.filter((review) => review.productId === productId)
  }
}