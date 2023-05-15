// categories menu
$('.categori-menu-title').on('click', function () {
    $('.categori-menu-toggle').slideToggle(500);
});


$('.category-menu-more-item-parent').on('click', function () {
    $('.category-menu-more-item-child').slideToggle();
    $(this).toggleClass('rx-change');
});
// mobile menu
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");




if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}
if (bar) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}
//  Load sản phẩm lên trang từ localstorage
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
                    <div class="product-hover-action" onclick="buy(event, '${p.id}')">
                        <ul>
                            <li><a href="#"><i class="icofont-eye"></i></a></li>
                            <li><a href="#"><i class="icofont-shopping-cart"></i></a></li>
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
loadProduct();

// Khai báo biến giỏ hàng
let carts = JSON.parse(sessionStorage.getItem('carts')) || [];
console.log(carts);

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



//Load sản phẩm lên trên giỏ hàng

function loadCarts() {
    let item = '';
    for (let p of carts) {
        item += `
<tr data-id="${p.productId}">
                                <td class="cart-product-revome">x</td>
                                <td class="cart-product-image"><a href="#"><img src="${p.image}" alt=""></a></td>
                                <td class="cart-product-info">
                                    <h4><a href="#">${p.name}</a></h4>
                                </td>
                                <td class="cart-product-price">$${p.price}</td>
                                <td class="cart-product-quantity">
                                    <div class="cart-plus-minus">
                                        <div class="dec qtybutton">-</div>
                                        <input class="inputQu" type="text" value=${p.quantity}>
                                        <div class="inc qtybutton">+</div>
                                    </div>
                                </td>
                                <td class="cart-product-subtotal">
                                    $${(p.price * p.quantity)}
                                </td>

                            </tr>
        `

    }
    $('.load-carts').html(item);
}
loadCarts();
//Quantity plus minus
$(document).on('click', '.qtybutton', function () {
    let newVal = null;


    let oldValue = $(this).parent().find("input").val();
    if ($(this).text() == "+") {
        newVal = parseFloat(oldValue) + 1;
    }
    else {
        if (oldValue > 0) {
            newVal = parseFloat(oldValue) - 1;
        }
        else {
            newVal = 0;
        }
    }
    $(this).parent().find("input").val(newVal);

    let tr = $(this).parents('tr');
    let id = $(tr).data('id');
    console.log("id", id);
    let cart = carts.find(c => c.productId == id);
    cart.quantity = newVal;
    sessionStorage.setItem('carts', JSON.stringify(carts));


    showCarts();
    showTotal();
    cartTotal();
    oderTotal();
    loadCarts();

});




$(document).on('click', '.cart-product-revome', function () {

    let tr = $(this).parents('tr');
    let id = $(tr).data('id');

    let cart = carts.findIndex(c => c.productId == id);
    console.log(cart);
    // Xóa
    carts.splice(cart, 1);
    // Lưu lại local sau khi xóa
    sessionStorage.setItem('carts', JSON.stringify(carts));
    loadCarts();
    showCarts();
    showTotal();
    cartTotal();
    oderTotal();
})




function cartTotal() {

    let total = 0;
    for (let i = 0; i < carts.length; i++) {
        total += carts[i].quantity * carts[i].price;

    }
    // let cart1 = cart.find(c => c.productId == id);
    // console.log("cart1", cart1)
    // total = cart1.quantity * cart1.price;
    // console.log("total", total);

    $('.cart-subtotal').html(total);
}
cartTotal();




function oderTotal() {
    let total = 0;
    total += parseInt($('.cart-subtotal').text());
    console.log("tong", total);
    $('.oder-total').html(total);
}
oderTotal();














