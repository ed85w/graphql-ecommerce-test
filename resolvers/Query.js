// base queries (reolvers)


exports.Query = {
  // resolver (eg 'products') has to match type defs query (in schema.js)
  products: (parent, {filter}, {products}) => {
    let filteredProducts = products

    if(filter){
      const { onSale, avgRating } = filter
      // console.log("on sale", onSale)
      // sale filter
      if(onSale) {
        filteredProducts = filteredProducts.filter(product => {
          return product.onSale
        })
      } else {
        filteredProducts = filteredProducts.filter(product => {
          return !product.onSale
        })
      }
      // rating filter
      if(avgRating){
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          
          // loop through reviews
          reviews.forEach((review) => {
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

    return filteredProducts
  },

  product: (parent, args, {products}) => {
    const productID = args.id;
    const product = products.find((product) => product.id === productID)

    if (!product) return null
    return product;
  },

  categories: (parent, args, {categories}) => {
    return categories
  },  // same as products above, just different syntax

  category: (parent, { id }, {categories}) => {                      // same as product above, just different syntax
    return categories.find((category) => category.id == id);
  },

  reviews: (parent, args, {reviews}) => {
    return reviews
  },

  review: (parent, { id }, {reviews}) => {                    
    return reviews.find((review) => review.id == id);
  },
}
