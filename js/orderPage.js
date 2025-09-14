const orderLoading = document.getElementById("orderLoading");
const productTableBody = document.getElementById("productTableBody");
const loadingForOrderPage = document.getElementById("loadingForOrderPage");
const placeOrderBtn = document.getElementById("place-order");
const orderPageForm = document.getElementById("order-page-form");
const loadingForCongratulationPage = document.getElementById(
  "loadingForCongratulationPage"
);
const orderPageFooter = document.getElementById("orderPageFooter");

orderPageFooter.classList.remove("hidden");
loadingForOrderPage.classList.remove("hidden");
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const pid = urlParams.get("p");
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
      <img src="${
        productData.images
      }" class="w-10 h-10 rounded border" alt="images">
      <span>${productData.name}</span>
      <input type="hidden" name="products[0][id]" value="${productData._id}">
    </td>
    <td class="p-3 pl-4 ">$<span class="product-price">${
      productData.price
    }</span></td>
    <td class="p-3 pl-5 font-medium text-gray-800">
  ${qty}
</td>
    <td class="p-3 pl-5 ">$<span class="product-subtotal">${
      productData.price * qty
    }</span></td>
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
    <td class="p-3 pl-5 font-extrabold text-indigo-700 text-xl">
      $<span id="orderTotal">${productData.price * qty}</span>
    </td>
  </tr>
`;
  table.appendChild(tfoot);
}
document.addEventListener("DOMContentLoaded", renderProducts);

//place Order
placeOrderBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  console.log("click order");
  const response = await fetch(`https://fabribuzz.onrender.com/api/product`);
  const product = await response.json();
  //console.log(product);

  const productData = product.find((p) => p._id === productId);
  //console.log(productData);
  const form = e.target.form;
  //check empty
  if (
    form.customerName.value &&
    form.customerEmail.value &&
    form.customerPhone.value &&
    form.address.value &&
    form.payment.value &&
    productData.name &&
    productData.price !== undefined &&
    qty !== undefined &&
    pid &&
    productData.images &&
    productData.category &&
    productId
  ) {
    orderPageForm.classList.add("hidden");
    orderPageFooter.classList.add("hidden");
    loadingForCongratulationPage.classList.remove("hidden");
    //  orderPageForm.classList.remove("hidden");
    //genarate OID
    const orderRes = await fetch(`https://fabribuzz.onrender.com/api/order`);
    const orders = await orderRes.json(); // assuming it's an array
    // Sort orders by createdAt descending (latest first)
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    // Get the last order
    const lastOrder = orders[0];
    let newNumber = 1;
    if (lastOrder && lastOrder.OID) {
      // Extract numeric part from "OID00000001"
      newNumber = parseInt(lastOrder.OID.slice(3)) + 1;
    }
    // Generate new Order ID
    const newID = "OID" + String(newNumber).padStart(8, "0");
    data = {
      customerName: form.customerName.value,
      customerEmail: form.customerEmail.value,
      customerPhone: form.customerPhone.value,
      // orderDate: form.orderDate.value, send it from controller
      shippingAddress: form.address.value,
      paymentMethod: form.payment.value,
      productName: productData.name,
      productPrice: productData.price,
      totalPrice: productData.price * qty,
      pID: pid,
      OID: newID,
      images: productData.images,
      category: productData.category,
      productQuantity: qty,
      productObjectID: productId,
      paymentMethod: form.payment.value,
    };

    console.log(data);

    await fetch("https://fabribuzz.onrender.com/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    //hide order form

    loadingForCongratulationPage.classList.add("hidden");
    window.location.href = `../src/orderConfirmationPage.html?id=${productData}`;
  } else {
    alert("Please fill out all necessary information.");
  }
});
