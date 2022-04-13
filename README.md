to run - `npm run dev`

install node modules first obs!

example queries in playground;

query {
  products {
    name
    description
    category {
      name
    }
  }
}


query {
  category(id: "c01b1ff4-f894-4ef2-b27a-22aacc2fca70") {
    name
    products {
      name
      price
      description
    }
  }
}

example mutation;

mutation {
  addProduct(input: {
    name: "fork",
    description: "a fork",
    quantity: 5,
    price: 55.55,
    image: "img-55",
    onSale: false,
    categoryId: "c01b1ff4-f894-4ef2-b27a-22aacc2fca70"
  }) {
    name
    description
  }
}