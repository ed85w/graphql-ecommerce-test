// associate reviews with product (for review query, not required if running product query)

exports.Review = {
  product: ({productId}, args, { data }) => {
    return data.products.find((product) => product.id === productId);
  }
}