const allProductGrid = document.getElementById("allProduct-grid");
const loaderAllCategory = document.getElementById("loading-allcategory");
const loaderAllProduct = document.getElementById("loading-allProduct");
const loadingForSlider = document.getElementById("loadingForSlider");
loaderAllCategory.classList.remove("hidden");
loaderAllProduct.classList.remove("hidden");
loadingForSlider.classList.remove("hidden");
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
  products.slice(0, 8).forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "border rounded-lg p-3";
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
    loaderAllProduct.classList.add("hidden");
    allProductGrid.appendChild(productCard);
  });
}
document.addEventListener("DOMContentLoaded", fetchAllProducts);

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
    loaderAllCategory.classList.add("hidden");
  } catch (error) {
    console.error("Error fetching category list:", error);
  }
}
document.addEventListener("DOMContentLoaded", fetchCategoryList);

//data fetch for new arival slider
const newArivalSlider = document.getElementById("category-grid");

async function fetchAllProductForNewSlider() {
  try {
    const response = await fetch("https://fabribuzz.onrender.com/api/product");
    const products = await response.json(); // Assuming the response is a JSON array of products
    console.log(products);

    displaySlider(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function displaySlider(products) {
  newArivalSlider.innerHTML = "";
  console.log(products);

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.innerHTML = `
           <div
                class="slide-card flex-shrink-0 w-[280px] snap-center bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transform transition cursor-pointer" onclick="window.location.href='src/viewProduct.html?id=${product._id}'"
              >
                <img src="${product.images}" class="w-full h-48 object-cover" />
                <div class="p-4">
                  <h3 class="font-semibold mb-2">${product.name}</h3>
                </div>
              </div>
        `;

    loadingForSlider.classList.add("hidden");
    newArivalSlider.appendChild(productCard);
  });
}
document.addEventListener("DOMContentLoaded", fetchAllProductForNewSlider);
