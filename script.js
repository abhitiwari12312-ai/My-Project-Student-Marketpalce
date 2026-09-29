const products = [
  {name:"Java Programming Complete Guide",category:"Books",price:250,seller:"Rahul",icon:"📚"},
  {name:"Wireless Headphones",category:"Electronics",price:900,seller:"Aman",icon:"🎧"},
  {name:"Study Table",category:"Furniture",price:1200,seller:"Neha",icon:"🪑"},
  {name:"Scientific Calculator",category:"Electronics",price:450,seller:"Vikas",icon:"🧮"},
  {name:"DBMS Notes + Question Bank",category:"Books",price:180,seller:"Priya",icon:"📖"},
  {name:"Desk Lamp",category:"Furniture",price:550,seller:"Karan",icon:"💡"}
];

const grid = document.getElementById("productGrid");
const empty = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
let activeCategory = "All";

function renderProducts() {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = products.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    `${p.name} ${p.category} ${p.seller}`.toLowerCase().includes(query)
  );

  grid.innerHTML = filtered.map(p => `
    <article class="product">
      <div class="product-image">${p.icon}</div>
      <div class="product-info">
        <span class="tag">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="price">₹${p.price.toLocaleString("en-IN")}</div>
        <div class="seller">Listed by ${p.seller} · Student seller</div>
      </div>
    </article>
  `).join("");

  empty.style.display = filtered.length ? "none" : "block";
}

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    renderProducts();
  });
});

searchInput.addEventListener("input", renderProducts);
document.getElementById("searchBtn").addEventListener("click", renderProducts);

const modal = document.getElementById("sellModal");
document.getElementById("sellTopBtn").addEventListener("click", () => modal.classList.add("show"));
document.getElementById("closeModal").addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("show"); });

document.getElementById("sellForm").addEventListener("submit", e => {
  e.preventDefault();
  products.unshift({
    name: document.getElementById("itemName").value,
    category: document.getElementById("itemCategory").value,
    price: Number(document.getElementById("itemPrice").value),
    seller: document.getElementById("itemSeller").value,
    icon: "🛍️"
  });
  e.target.reset();
  modal.classList.remove("show");
  renderProducts();
  const toast = document.getElementById("toast");
  toast.textContent = "Your listing was published!";
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 2500);
});

renderProducts();
