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
              class="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transform transition cursor-pointer" onclick="window.location.href='src/viewProduct.html?id=${product._id}'"
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

//
// -------------------fetch category---------------------
const categoryGrid = document.getElementById("category-grid");
async function fetchCategories() {
  try {
    const response = await fetch("https://fabribuzz.onrender.com/api/category");
    const categories = await response.json();

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

//fetch category data for navbar
const categoryList = document.getElementById("category-list");
async function fetchCategoryList() {
  try {
    const response = await fetch("https://fabribuzz.onrender.com/api/category");
    const categories = await response.json();

    categories.forEach((category) => {
      const categoryItem = document.createElement("a");
      categoryItem.href = `src/catWiseProducts.html?id=${category.catID}`;
      categoryItem.className =
        "flex-shrink-0 px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-indigo-100 transition";
      categoryItem.textContent = category.catName;
      categoryList.appendChild(categoryItem);
    });
  } catch (error) {
    console.error("Error fetching category list:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchCategoryList);
