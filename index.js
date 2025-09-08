const allProductGrid = document.getElementById("allProduct-grid");

async function fetchAllProducts() {
  try {
    const response = await fetch("https://fabribuzz.onrender.com/api/product");
    const products = await response.json(); // Assuming the response is a JSON array of products

    displayAllProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displayAllProducts(products) {
  products.forEach((product) => {
    const productCard = document.createElement("div");

    productCard.innerHTML = `
           <div
              class="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transform transition cursor-pointer"
            >
              <img
                src="${product.images}"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="font-semibold mb-2">${product.name}</h3>
                <p class="text-indigo-600 font-bold">$${product.price}</p>
              </div>
            </div>
        `;
    allProductGrid.appendChild(productCard);
  });
}

document.addEventListener("DOMContentLoaded", fetchAllProducts);

//fetch category
const categoryGrid = document.getElementById("category-grid");
async function fetchCategories() {
  try {
    const response = await fetch("https://fabribuzz.onrender.com/api/category");
    const categories = await response.json();
    console.log(categories);

    displayCategories(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

function displayCategories(categories) {
  categories.forEach((category) => {
    const categoryCard = document.createElement("div");

    categoryCard.innerHTML = `
           <div
              class="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transform transition cursor-pointer"
            >
              <img
                src="${category.image}"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="font-semibold mb-2">${category.catName}</h3>
              </div>
            </div>
        `;
    categoryGrid.appendChild(categoryCard);
  });
}

document.addEventListener("DOMContentLoaded", fetchCategories);
