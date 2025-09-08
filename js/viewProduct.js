const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

async function fetchProductDetails() {
  try {
    const response = await fetch(`https://fabribuzz.onrender.com/api/product`);
    const product = await response.json();

    //find product by id
    const productData = product.find((p) => p._id === productId);
    const productSection = document.getElementById("product-section");
    productSection.innerHTML = `<div
        class="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-8"
      >
        <!-- Left: Product Images -->
        <div>
          <img
            src="${productData.images}"
            alt="${productData.name}"
            class="w-full h-[500px] object-cover rounded-lg shadow-lg mt-10"
          />
        </div>

        <!-- Right: Product Info -->
        <div class="flex flex-col justify-center">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">${productData.name}</h2>
          <p class="text-gray-600 text-lg mb-2">
            ${productData.description}
            Perfect for everyday wear. Available in multiple colors and sizes.
          </p>

          <p class="text-2xl font-semibold text-indigo-600 mb-4">$${productData.price}</p>

          <div class="mb-6">
            <label for="size" class="block text-gray-700 font-semibold mb-2"
              >Choose Size:</label
            >
            <select
              id="size"
              class="border rounded-md px-4 py-2 w-full md:w-1/2"
            >
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
              <option>XL</option>
            </select>
          </div>

          <div class="flex space-x-4 mb-6">
            <button
              class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Add to Cart
            </button>
            <button
              class="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Buy Now
            </button>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2">Product Details:</h3>
            <ul class="list-disc list-inside text-gray-600 space-y-1">
              <li>100% Cotton Material</li>
              <li>Available in multiple colors</li>
              <li>Comfort fit for daily wear</li>
              <li>Free shipping on orders over $50</li>
            </ul>
          </div>
        </div>
      </div>
                    `;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchProductDetails);
