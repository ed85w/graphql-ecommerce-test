// associate products with categories
// used when category or categories query is fired with 'products' included - NOT 'product', won't work)

// exports.Category = {
//   products: (parent, args, context) => {
//     const categoryId = parent.id
//     return context.products.filter(product => product.categoryId === categoryId)
//   }
// }

// cleaner syntax - uses destructuring 
exports.Category = {
  products: ({ id: categoryId }, { filter }, { data }) => {
    const categoryProducts = data.products.filter(product => product.category === categoryId);
    let filteredCategoryProducts = categoryProducts

    if(filter){
      const { onSale, avgRating } = filter
      // sale filter
      if(onSale) {
        filteredCategoryProducts = filteredCategoryProducts.filter(product => {
          return product.onSale
        })
      } else {
        filteredCategoryProducts = filteredCategoryProducts.filter(product => {
          return !product.onSale
        })
      }
      // rating filter
      if(avgRating){
        filteredCategoryProducts = filteredCategoryProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          
          // loop through reviews
          data.reviews.forEach((review) => {
            // if the review matches the current product 
            if(review.productId === product.id) {
              numberOfReviews += 1;
              sumRating += review.rating
            }
          });
          // calculate the avergae score of the reviews for the product 
          const avgProductRating = sumRating / numberOfReviews;

          // if the average score is greater than or equal to the filter val then return it (filter returns product if true)
          return avgProductRating >= avgRating
        })
      }
    }

    return filteredCategoryProducts

  }
}