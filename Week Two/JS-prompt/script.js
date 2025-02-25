// Kullanıcı Bilgileri
const user = {
    name: prompt("Adınızı girin:"),
    age: parseInt(prompt("Yaşınızı girin:")),
    job: prompt("Mesleğinizi girin:")
};
console.log("Adınız Nedir?" ,user.name);
console.log("Yaşınız Kaç?" ,user.age);
console.log("Mesleğiniz Nedir?" ,user.job);
console.log(`Kullanıcı Bilgileri: { name: "${user.name}", age: ${user.age}, job: "${user.job}"} `);

// Ürünler
let cart = [];

function addToCart() {
    let productName = prompt("Eklemek istediğiniz ürünü yazın:");
    let productPrice = parseFloat(prompt("Ürünün fiyatını girin:"));

    if (!productName || isNaN(productPrice)) {
        alert("Geçerli bir ürün adı ve fiyat giriniz!");
        return;
    }

    let product = { name: productName, price: productPrice };
    cart.push(product);

    console.log(`Sepete Eklemek İstediğiniz ürünü Yazın: ${productName}`);
    console.log(`Ürünün Fiyatı: ${productPrice}`);
    console.log(`${productName} ürünü sepete eklendi. Fiyat: ${productPrice} TL`);
}



// Toplam
function getTotalPrice() {
    let total = cart.reduce((sum, product) => sum + product.price, 0);
    console.log(`Toplam Sepet Tutarı: ${total} TL`);
}

// Ürün Çıkarma
function removeFromCart() {
    if (cart.length === 0) return;

    let productIndex = parseInt(prompt("Silmek istediğiniz ürünün numarasını girin:")) - 1;
    
    if (isNaN(productIndex) || productIndex < 0 || productIndex >= cart.length) {
        alert("Geçerli bir numara giriniz!");
        return;
    }

    let removedProduct = cart.splice(productIndex, 1);
    console.log(`"${removedProduct[0].name}" sepetten çıkarıldı.`);
}

// Müşteri Girişi
while (true) {
    let action = prompt("Yapmak istediğiniz işlemi seçin: \n1 - Ürün Ekle \n2 - Toplamı Gör \n3 - Ürün Sil \n4 - Çıkış");

    if (action === "1") addToCart();
    else if (action === "2") getTotalPrice();
    else if (action === "3") removeFromCart();
    else if (action === "4") {
        console.log("Uygulamadan çıkılıyor...");
        break;
    } else {
        alert("Geçerli bir seçenek giriniz!");
    }
}

