//fetch category data for navbar
const categoryList = document.getElementById("category-list");
const loadingCatWiseProduct = document.getElementById("loading-catWiseProduct");
const loadingCat = document.getElementById("loading-cat");
const productsContainer = document.getElementById("products-container");
const noProductFound = document.getElementById("noProductFound");
loadingCatWiseProduct.classList.remove("hidden");
loadingCat.classList.remove("hidden");

async function fetchCategoryList() {
  try {
    const response = await fetch("https://fabribuzz.onrender.com/api/category");
    const categories = await response.json();

    categories.forEach((category) => {
      const categoryItem = document.createElement("button"); // use button instead of <a>
      categoryItem.className =
        "flex-shrink-0 px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-indigo-100 transition";
      categoryItem.textContent = category.catName;

      // Add click event
      categoryItem.addEventListener("click", () => {
        noProductFound.classList.add("hidden");
        productsContainer.classList.add("hidden");
        loadingCatWiseProduct.classList.remove("hidden");

        // Update section heading
        document.querySelector("#section-heading").textContent =
          category.catName;

        // Fetch and display products for the selected category
        displayProductsByCategory(category.catID);
      });
      loadingCat.classList.add("hidden");
      categoryList.appendChild(categoryItem);
    });
  } catch (error) {
    console.error("Error fetching category list:", error);
  }
}
document.addEventListener("DOMContentLoaded", fetchCategoryList);

// //show cat data
async function displayProductsByCategory(categoryID) {
  try {
    const response = await fetch(
      `https://fabribuzz.onrender.com/api/product?category=${categoryID}`
    );
    const products = await response.json();

    // Clear existing products
    productsContainer.innerHTML = "";
    loadingCatWiseProduct.classList.add("hidden");
    if (products.length > 0) {
      noProductFound.classList.add("hidden");
      productsContainer.classList.remove("hidden");

      products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.className = "border rounded-lg p-4";
        productItem.innerHTML = `<div
              class="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transform transition cursor-pointer" onclick="window.location.href='../src/viewProduct.html?id=${product._id}'"
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
        loadingCatWiseProduct.classList.add("hidden");
        productsContainer.appendChild(productItem);
      });
    } else {
      noProductFound.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// On initial load, display products for the first category
document.addEventListener("DOMContentLoaded", () => {
  //catid fetch from url
  const urlParams = new URLSearchParams(window.location.search);
  const initialCatID = urlParams.get("id") || "1"; // Default to category ID 1 if not specified

  sectionHeading(initialCatID);
  displayProductsByCategory(initialCatID);
  // Set initial section heading
});

async function sectionHeading(initialID) {
  const response = await fetch(
    `https://fabribuzz.onrender.com/api/category?catID=${initialID}`
  );
  const resData = await response.json();
  const catDataName = resData[0]["catName"];
  // Update section heading
  document.querySelector("#section-heading").textContent = catDataName;
}
