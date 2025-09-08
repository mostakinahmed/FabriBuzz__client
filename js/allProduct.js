const allProductGrid = document.getElementById("product-grid");

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
