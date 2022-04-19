const { v4: uuid } = require("uuid");
const { data } = require("../data");

exports.Mutation = {
  // add a new category
  addCategory: (parent, args, {data}) => {
    const newCategory = {
      id: uuid(),
      name: args.input.name
    }

    data.categories.push(newCategory);

    return newCategory
  },
  // add a new product (different syntax to above)
  addProduct: (parent, {input}, {data}) => {
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

    data.products.push(newProduct)

    return newProduct
  },
  // add a new review
  addReview: (parent, {input}, {data}) => {
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

    data.reviews.push(newReview);

    return newReview
  },
  // delete a category - also removes category from relevant products
  deleteCategory: (parent, { id }, { data }) => {
    // update data.categories
    data.categories = data.categories.filter((category) => category.id !== id);
    // for product(s) that have the deleted category, remove the deleted category
    data.products.forEach(product => {
      if(product.category === id){
        product.category = "";
      }
    })
    return true;
  },
  // delete product - also deletes relevant reviews
  deleteProduct: (parent, { id }, { data }) => {
    // remove the product
    data.products = data.products.filter((product) => product.id !== id);
    // delete all reviews for the product
    data.reviews = data.reviews.filter((review) => review.productId !== id)
    return true
  },
  // delete review
  deleteReview: (parent, { id }, { data }) => {
    // remove the product
    data.reviews = data.reviews.filter((review) => review.id !== id);
    // delete all reviews for the product
    return true
  },
  // update category
  updateCategory: (parent, {id, input}, {data}) => {

    // update the category
    data.categories = data.categories.map((category) => category.id === id ? { ...category, name: input.name } : category);
    // return the updated category
    return data.categories.find((category) => category.id == id);
  },
  updateProduct: (parent, {id, input}, { data }) => {

    data.products = data.products.map((product) => product.id === id ? {...product, ...input } : product);

    return data.products.find((product) => product.id == id);

  }
}