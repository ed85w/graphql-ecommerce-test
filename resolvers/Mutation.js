const { v4: uuid } = require("uuid")

exports.Mutation = {
  // add a new category
  addCategory: (parent, args, {categories}) => {
    const newCategory = {
      id: uuid(),
      name: args.input.name
    }

    categories.push(newCategory);

    return newCategory
  },
  // add a new product
  addProduct: (parent, {input}, {products}) => {
    const {
      name,
      description,
      quantity,
      price,
      image,
      onSale,
      categoryId
    } = input;

    const newProduct = {
      id: uuid(),
      name,
      description,
      quantity,
      price,
      image,
      onSale,
      categoryId
    }

    products.push(newProduct)

    return newProduct
  },
  // add a new review
  addReview: (parent, {input}, {reviews}) => {
    const {
      date,
      title,
      comment,
      rating,
      productId
    } =  input 

    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productId
    }

    reviews.push(newReview);

    return newReview
  }
}