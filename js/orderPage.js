const orderForm = document.getElementById("orderForm");
const orderLoading = document.getElementById("orderLoading");
const productTableBody = document.getElementById("productTableBody");
const loadingForOrderPage = document.getElementById("loadingForOrderPage");

loadingForOrderPage.classList.remove("hidden");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const qty = urlParams.get("qty");

async function renderProducts() {
  //data fetch from api
  const response = await fetch(`https://fabribuzz.onrender.com/api/product`);
  const product = await response.json();

  //find product by params id
  const productData = product.find((p) => p._id === productId);

  loadingForOrderPage.classList.add("hidden");
  // inject row
  productTableBody.innerHTML = `
  <tr>
    <td class="p-3 flex items-center space-x-2">
      <img src="${productData.images}" class="w-10 h-10 rounded border" alt="">
      <span>${productData.name}</span>
      <input type="hidden" name="products[0][id]" value="${productData._id}">
    </td>
    <td class="p-3 pl-4 ">$<span class="product-price">${productData.price}</span></td>
    <td class="p-3 pl-5 font-medium text-gray-800">
  ${qty}
</td>
    <td class="p-3 pl-7 ">$<span class="product-subtotal">${productData.price}</span></td>
  </tr>
`;

  // now add tfoot
  const table = productTableBody.closest("table");
  table.querySelector("tfoot")?.remove(); // remove old tfoot if exists

  const tfoot = document.createElement("tfoot");
  tfoot.classList.add("bg-gray-50");
  tfoot.innerHTML = `
  <tr>
    <td colspan="3" class="p-3  text-right font-bold text-gray-700">Total:</td>
    <td class="p-3 pl-7 font-extrabold text-indigo-700 text-xl">
      $<span id="orderTotal">${productData.price}</span>
    </td>
  </tr>
`;
  table.appendChild(tfoot);
}
document.addEventListener("DOMContentLoaded", renderProducts);

// // update subtotal when qty changes
// productTableBody.addEventListener("input", (e) => {
//   if (e.target.classList.contains("qty-input")) {
//     const row = e.target.closest("tr");
//     const price = Number(row.querySelector(".product-price").textContent);
//     const qty = Number(e.target.value);
//     row.querySelector(".product-subtotal").textContent = price * qty;
//   }
// });

// handle form submit
// orderForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   orderLoading.classList.remove("hidden");

//   const formData = new FormData(orderForm);
//   const orderData = Object.fromEntries(formData.entries());

//   try {
//     // send orderData to server
//     const res = await fetch("/api/orders", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(orderData),
//     });
//     if (!res.ok) throw new Error("Order failed");
//     alert("Order placed successfully!");
//     orderForm.reset();
//     renderProducts(); // reset products table
//   } catch (err) {
//     console.error(err);
//     alert("Error placing order");
//   } finally {
//     orderLoading.classList.add("hidden");
//   }
// });

// productTableBody.addEventListener("input", () => {
//   let total = 0;
//   productTableBody.querySelectorAll("tr").forEach((row) => {
//     const price = Number(row.querySelector(".product-price").textContent);
//     const qty = Number(row.querySelector(".qty-input").value);
//     const subtotal = price * qty;
//     row.querySelector(".product-subtotal").textContent = subtotal;
//     total += subtotal;
//   });
//   document.getElementById("orderTotal").textContent = total;
// });
