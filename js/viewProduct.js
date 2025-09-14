const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
loading.classList.remove("hidden");
async function fetchProductDetails() {
  try {
    const response = await fetch(`https://fabribuzz.onrender.com/api/product`);
    const product = await response.json();

    //find product by id
    const productData = product.find((p) => p._id === productId);
    const productSection = document.getElementById("product-section");

    //loader
    const loading = document.getElementById("loading");

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
              <div class="flex items-center space-x-2">
  <button type="button" id="decrease" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
  <input type="number" id="quantity" value="1" min="1" class="w-16 text-center border border-gray-300 rounded">
  <button type="button" id="increase" class="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
</div>
            <button 
            id="buyNowBtn"
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
    loading.classList.add("hidden");

    const buyNowBtn = document.getElementById("buyNowBtn");
    const qtyInput = document.getElementById("quantity");
    const increaseBtn = document.getElementById("increase");
    const decreaseBtn = document.getElementById("decrease");

    increaseBtn.addEventListener("click", () => {
      qtyInput.value = Number(qtyInput.value) + 1;
    });

    decreaseBtn.addEventListener("click", () => {
      if (Number(qtyInput.value) > 1) {
        qtyInput.value = Number(qtyInput.value) - 1;
      }
    });

    //manage button
    buyNowBtn.addEventListener("click", () => {
      const qty = qtyInput.value;
      window.location.href = `../src/orderPage.html?id=${productId}&qty=${qty}&p=${productData.pID}`;
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchProductDetails);
