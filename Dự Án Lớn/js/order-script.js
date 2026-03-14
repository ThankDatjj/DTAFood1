/* HIỂN THỊ TÊN NGƯỜI DÙNG */

const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"))

if(loggedUser){

const authText = document.getElementById("authText")

authText.textContent = loggedUser.name

}

/* USER DROPDOWN */

const userMenu = document.querySelector(".user-menu")
const logoutBtn = document.getElementById("logoutBtn")

if(userMenu){

userMenu.addEventListener("click",()=>{

userMenu.classList.toggle("open")

})

}

/* LOGOUT */

if(logoutBtn){

logoutBtn.addEventListener("click",()=>{

localStorage.removeItem("loggedInUser")

window.location.href="auth.html"

})

}

document.addEventListener('DOMContentLoaded', () => {
    const dishes = [
        { id:1, name:"Cơm tâm Sà Bì Chưởng", category:"Món chính", price:65000, rating:5.0, img:"https://mms.img.susercontent.com/vn-11134259-7r98o-lw7g3dm13tuhef@resize_ss1242x600!@crop_w1242_h600_cT", hot:true },
        { id:2, name:"Bún Chả Đắc Kim", category:"Món chính", price:40000, rating:4.9, img:"https://hanoireview.vn/wp-content/uploads/2025/01/1735809648-bun-cha-dac-kim.jpg", hot:true },
        { id:3, name:"Cơm Gà Hải Nam", category:"Món chính", price:50000, rating:4.6, img:"https://cdn.tgdd.vn/2022/01/CookRecipe/GalleryStep/tha%CC%80nh-pha%CC%89m-2.jpg" },
        { id:4, name:"Phở Lý Quốc Sư", category:"Món chính", price:35000, rating:4.7, img:"https://mms.img.susercontent.com/vn-11134259-7ras8-m1ninnz3kdhv9d@resize_ss1242x600!@crop_w1242_h600_cT" },
        { id:5, name:"Súp cua Tôn Đức Thắng", category:"Khai vị", price:50000, rating:4.5, img:"https://img.mservice.com.vn/common/u/2e02fb5fe4f64fb55bc713540643c6f8eae702d101cea8c59afc49cfc505fc37/4c1db86b-4ea4-4cce-805e-a4ea38755a3e0xhfe958.jpeg" },
        { id:6, name:"Trà Sữa ToCoToCo", category:"Đồ uống", price:28000, rating:4.5, img:"https://tocotocotea.com/wp-content/uploads/2024/10/Hinh-1-9.jpg" },
        { id:7, name:"Kem Xôi Tràng Tiền", category:"Tráng miệng", price:32000, rating:4.8, img:"https://kemtrangtien.vn/upload/feature/thumb_1920x0/bannerkem-xoi-mobile-1709523965.png" },
        // thêm món nếu muốn
    ];

    const categories = ["Tất cả", "Khai vị", "Món chính", "Đồ uống", "Tráng miệng"];

    // Render categories
    const catList = document.getElementById('categoryList');
    categories.forEach(cat => {
        const div = document.createElement('div');
        div.className = `category-item ${cat === 'Tất cả' ? 'active' : ''}`;
        div.textContent = cat;
        div.onclick = () => filterByCategory(cat);
        catList.appendChild(div);
    });

    // Render dishes
    function renderDishes(filteredDishes) {
        const grid = document.getElementById('dishGrid');
        grid.innerHTML = '';
        filteredDishes.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'dish-card';
            card.innerHTML = `
                <img src="${dish.img}" alt="${dish.name}">
                <div class="dish-info">
                    <h4>${dish.name}</h4>
                    <p class="rating">⭐ ${dish.rating} • 15-25 phút</p>
                    <p class="price">${dish.price.toLocaleString('vi-VN')}đ</p>
                    <button class="add-btn" data-id="${dish.id}">Thêm vào giỏ</button>
                </div>
            `;
            grid.appendChild(card);
        });
    }
    renderDishes(dishes);
    // ================= SEARCH =================

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", () => {

const keyword = searchInput.value.toLowerCase();

if(keyword === ""){
searchResults.style.display = "none";
return;
}

const results = dishes.filter(dish =>
dish.name.toLowerCase().includes(keyword)
);

renderSearchResults(results);

});


function renderSearchResults(results){

searchResults.innerHTML = "";

if(results.length === 0){

searchResults.innerHTML =
"<div class='search-item'>Không tìm thấy món</div>";

searchResults.style.display="block";
return;
}

results.forEach(dish => {

const div = document.createElement("div");

div.className = "search-item";

div.innerHTML = `

<img src="${dish.img}">

<div class="search-info">

<div class="search-name">${dish.name}</div>

<div class="search-price">
${dish.price.toLocaleString('vi-VN')}đ
</div>

</div>

`;

div.onclick = () => {

searchInput.value = dish.name;

searchResults.style.display = "none";

};

searchResults.appendChild(div);

});

searchResults.style.display="block";

}

    // Filter by category
    window.filterByCategory = function(cat) {
        document.querySelectorAll('.category-item').forEach(el => el.classList.toggle('active', el.textContent === cat));
        const filtered = cat === 'Tất cả' ? dishes : dishes.filter(d => d.category === cat);
        renderDishes(filtered);
    };

    // Price filter
    document.querySelectorAll('.price-filters button').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.price-filters button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const max = parseInt(btn.dataset.price);
            const filtered = max === 0 ? dishes : dishes.filter(d => d.price <= max);
            renderDishes(filtered);
        });
    });

// Cart logic
let cart = [];

function updateCart() {

const totalItems = cart.reduce((sum,item)=> sum + item.qty ,0);

document.getElementById('cartCount').textContent = totalItems;

const floating = document.getElementById('floatingCount');
if(floating) floating.textContent = totalItems;

const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

cartItems.innerHTML = '';

let total = 0;

cart.forEach((item, index) => {

    total += item.price * item.qty;

    const div = document.createElement('div');
    div.className = 'cart-item';

    div.innerHTML = `

        <img src="${item.img}" class="cart-thumb">

        <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${item.price.toLocaleString('vi-VN')}đ</div>
        </div>

        <div class="quantity-control">
            <button class="minus" data-index="${index}">-</button>
            <span>${item.qty}</span>
            <button class="plus" data-index="${index}">+</button>
        </div>

        <button class="remove-item" data-index="${index}">
            ❌
        </button>

    `;

    cartItems.appendChild(div);

});

cartTotal.textContent = total.toLocaleString('vi-VN') + "đ";

}


// ================= ADD TO CART =================

document.addEventListener('click', e => {

if (e.target.classList.contains('add-btn')) {

    const id = parseInt(e.target.dataset.id);
    const dish = dishes.find(d => d.id === id);

    const existing = cart.find(item => item.id === dish.id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({...dish, qty:1});
    }

    updateCart();

}

});


// ================= CART BUTTONS =================

document.addEventListener('click', e => {

if (e.target.classList.contains('plus')) {

    const index = e.target.dataset.index;

    cart[index].qty++;

    updateCart();
}

if (e.target.classList.contains('minus')) {

    const index = e.target.dataset.index;

    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        cart.splice(index,1);
    }

    updateCart();
}

if (e.target.classList.contains('remove-item')) {

    const index = e.target.dataset.index;

    cart.splice(index,1);

    updateCart();
}

});


// ================= OPEN / CLOSE CART =================

document.getElementById('openCartBtn').addEventListener('click', () => {

const cartSidebar = document.getElementById('cartSidebar');

cartSidebar.classList.toggle('open');

});
document.getElementById("floatingCartBtn").addEventListener("click", () => {

const cartSidebar = document.getElementById('cartSidebar');

cartSidebar.classList.toggle('open');

});

document.getElementById('closeCart').addEventListener('click', () => {

document.getElementById('cartSidebar').classList.remove('open');

});

console.log('%c✅ Trang đặt đồ ăn DTAFood đã sẵn sàng!', 'color:#00C9B0; font-size:18px; font-weight:bold');
});
// ==================== PHẦN MỚI: CUISINE CATEGORIES ====================
const cuisines = [
    { name: "Phở & Bún", img: "https://truongthaidu.wordpress.com/wp-content/uploads/2018/09/pho_hanoi.jpg" },
    { name: "Cơm", img: "https://images.baodantoc.vn/uploads/2023/Th%C3%A1ng%205/Ng%C3%A0y_17/Thanh/quan-com-tam-o-ha-noi-.jpg" },
    { name: "Bánh mì", img: "https://media.vov.vn/sites/default/files/styles/large/public/2025-11/banh_mi_0.jpg" },
    { name: "Đồ uống", img: "https://dayphache.edu.vn/wp-content/uploads/2019/08/tra-sua-tran-chau.jpg" },
    { name: "Lẩu & Nướng", img: "https://static.vinwonders.com/production/lau-nuong-ha-noi-banner.jpg" },
    { name: "Fast Food", img: "https://vcdn1-vnexpress.vnecdn.net/2023/11/04/gioithieu1jpeg14261699092108-1-9070-6927-1699112751.jpg?w=500&h=300&q=100&dpr=1&fit=crop&s=E06yLqS_I50n_F-fNzy2lw" },
    { name: "Tráng miệng", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400" },
    { name: "Mì", img: "https://cdn.eva.vn/upload/3-2020/images/2020-08-06/2-cach-lam-mi-cay-han-quoc-tai-nha-ngon-nhu-ngoai-hang-m--n-m---cay-h---i-s---n-1596697335-152-width600height489.jpg" },
    { name: "Hải sản", img: "https://giangghe.com/upload/news/ben-food-1222-4069-1024x536-7358.jpg" },
    { name: "Salad", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC4IJZXr26F894IbUhFXu-uJYf24X2VWebvw&s" },
    { name: "Pizza", img: "https://file.hstatic.net/1000389344/article/pepperoni_5_1c9ba759196f480eba397d628ac958ed_1024x1024.jpg" },
    { name: "Thịt", img: "https://fujifoods.vn/wp-content/uploads/2020/12/beef-steak-bo-toi-2.jpg" },
    { name: "Cháo", img: "https://cdn.tgdd.vn/2021/06/CookProduct/chaohenxaocay-1200x676.jpg" },
    { name: "Xôi", img: "https://i-giadinh.vnecdn.net/2021/10/08/nh1-1633673448-8968-1633673738.jpg" },
];

function renderCuisines() {
    const grid = document.getElementById('cuisineGrid');
    if (!grid) return;

    cuisines.forEach(cuisine => {
        const card = document.createElement('div');
        card.className = 'cuisine-card';
        card.innerHTML = `
            <img src="${cuisine.img}" alt="${cuisine.name}">
            <div class="cuisine-info">
                <h4>${cuisine.name}</h4>
            </div>
        `;
        // Khi click → filter món ăn theo loại (hoặc mở danh sách quán)
        card.onclick = () => {
            // Ví dụ: filter dishGrid theo từ khóa trong tên món
            const searchTerm = cuisine.name.toLowerCase().split(' ')[0]; // lấy từ đầu tiên (phở, cơm, bánh...)
            document.getElementById('searchInput').value = searchTerm;
            // Gọi hàm tìm kiếm/filter nếu bạn đã có (hoặc thêm logic filter)
            alert(`Đang hiển thị quán ăn bán ${cuisine.name} gần bạn!`);
            // Nếu muốn filter thực tế: thêm logic lọc dishes theo category hoặc keyword
        };
        grid.appendChild(card);
    });
}


// Gọi hàm render khi load
renderCuisines();