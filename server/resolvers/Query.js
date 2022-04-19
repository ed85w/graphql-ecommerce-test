// base queries (reolvers)


exports.Query = {
  // resolver (eg 'products') has to match type defs query (in schema.js)
  products: (parent, {filter}, {data}) => {
    let filteredProducts = data.products

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

    return filteredProducts
  },

  product: (parent, args, {data}) => {
    const productID = args.id;
    const product = data.products.find((product) => product.id === productID)

    if (!product) return null
    return product;
  },

  categories: (parent, args, {data}) => {
    return data.categories
  },  // same as products above, just different syntax

  category: (parent, { id }, {data}) => {                      // same as product above, just different syntax
    return data.categories.find((category) => category.id == id);
  },

  reviews: (parent, args, {data}) => {
    return data.reviews
  },

  review: (parent, { id }, {data}) => {                    
    return data.reviews.find((review) => review.id == id);
  },
}
