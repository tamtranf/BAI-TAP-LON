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
showCarts();
showTotal();

//Load sản phẩm lên trên giỏ hàng
var carts = JSON.parse(sessionStorage.getItem('carts')) || [];

function loadCarts() {
    let item = '';
    for (let p of carts) {
        item += `
<tr data-id="${p.productId}">
                                <td class="cart-product-revome">x</td>
                                <td class="cart-product-image"><a href="#"><img src="img/1 (3).png" alt=""></a></td>
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

$(".qtybutton").on("click", function () {


    var oldValue = $(this).parent().find("input").val();
    if ($(this).text() == "+") {
        var newVal = parseFloat(oldValue) + 1;
    }
    else {
        if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
        }
        else {
            newVal = 0;
        }
    }
    $(this).parent().find("input").val(newVal);

    let tr = $(this).parents('tr');
    let id = $(tr).data('id');
    let cart = carts.find(c => c.productId == id);
    cart.quantity = newVal;
    sessionStorage.setItem('carts', JSON.stringify(carts));
    loadCarts();
    showCarts();
    showTotal();
    cartTotal();
    oderTotal();
});

// //update số lượng từ thanh số lượng vào mảng

// $(document).on('click', '.qtybutton', function () {

//     let tr = $(this).parents('tr');
//     let id = $(tr).data('id');
//     // Tìm task cần 
//     let cart = carts.find(c => c.productId == id);
//     // 
//     console.log(cart);

//     // cart.quantity = $('.inputQu').val();
//     cart.quantity = $(this).parent().find("input").val();
//     console.log(cart.quantity);

//     loadCarts();
//     console.log(carts);
//     sessionStorage.setItem('carts', JSON.stringify(carts));

// })



//xóa cart

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


var carts = JSON.parse(sessionStorage.getItem('carts')) || [];

function cartTotal() {
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
        total += carts[i].quantity * carts[i].price;

    }
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
