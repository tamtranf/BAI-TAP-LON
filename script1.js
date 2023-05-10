var listProducts = JSON.parse(localStorage.getItem('products')) || [];

function loadProduct() {
    let item = '';
    for (let p of listProducts.filter(p => p.status)) {
        item += `
        <div class="col-lg-3 tab-content-wrap">
        <div class="product-item">
                <div class="product-img">
                    <a href="#"><img src="${p.images}" alt=""></a>
                    <div class="product-badge">
                        <span>-19%</span>
                    </div>
                    <div class="product-hover-action">
                        <ul>
                            <li><a href="#"><i class="icofont-eye"></i></a></li>
                            <li><a href="#"><i class="icofont-shopping-cart"onclick="buy(event, '${p.id}')"></i></a></li>
                            <li><a href="#"><i class="icofont-heart"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-ratting">
                        <ul>
                            <li><a href="#"><i class="icofont-ui-rating"></i></a></li>
                            <li><a href="#"><i class="icofont-ui-rating"></i></a></li>
                            <li><a href="#"><i class="icofont-ui-rating"></i></a></li>
                            <li><a href="#"><i class="icofont-ui-rating"></i></a></li>
                            <li><a href="#"><i class="icofont-ui-rating"></i></a></li>
                            <li><a href="#" class="ratting">(24)</a></li>
                        </ul>
                    </div>
                    <h2 class="product-title">
                    ${p.name}
                    </h2>
                    <div class="product-price">
                        <span>$${p.price}</span>
                        <del>$46.00</del>
                    </div>
                </div>

            </div>
            </div>`
    }
    $('.load-product').html(item);
}


// Khai báo biến giỏ hàng
var carts = JSON.parse(sessionStorage.getItem('carts')) || [];

// XỬ LÝ MUA HÀNG
// Hiển thị giỏ hàng
function showCarts() {
    $('.total-carts-item').html(carts.length);
    // tính tổng tiền
    let total = 0;
    for (let c of carts) {
        total += (c.quantity * c.price);
    }
}
//tính tổng tiền chưa ra được? phải bấm refresh
function showTotal() {
    let total = 0;
    for (let c of carts) {
        total += (c.quantity * c.price);
        total;
    }
    $('#total-pay').html(total);
}


// Mua hàng
function buy(evt, proId) {
    // Kiểm tra xem sp đó đã được mua chưa
    let cartItem = carts.find(c => c.productId == proId);
    if (cartItem) { // tăng số lượng
        cartItem.quantity += 1;
    } else {
        // Thêm sản phẩm được mua vào giỏ hàng
        carts.push({
            productId: proId,
            name: listProducts.find(p => p.id == proId).name,
            price: listProducts.find(p => p.id == proId).price,
            quantity: 1,
            image: listProducts.find(p => p.id == proId).images,
        });
    }
    // Lưu session
    sessionStorage.setItem('carts', JSON.stringify(carts));
    showCarts();
    showTotal();
}
showCarts();
showTotal();
loadProduct();