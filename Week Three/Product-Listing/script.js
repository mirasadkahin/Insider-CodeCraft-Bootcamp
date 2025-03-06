$(document).ready(function() {
    $('#listProducts').click(function() {
        $('#productList').html('<div class="loading">Ürünler yükleniyor...</div>');

        // AJAX ile ürünleri getirme
        $.ajax({
            url: 'product.json',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                // ürünleri listeleme
                setTimeout(function() { // yükleme animasyonunu görebilmek için küçük bir gecikme
                    displayProducts(data.products);
                }, 500);
            },
            error: function(xhr, status, error) {
                // Hata mesajı
                $('#productList').html('<div class="loading">Ürünler yüklenirken bir hata oluştu.</div>');
                console.error('Hata:', error);
            }
        });
    });

    function displayProducts(products) {
        let productHTML = '';
        
        // ürün kartları
        products.forEach(function(product) {
            productHTML += `
                <a href="${product.link}" class="product-card" target="_blank">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="hover-overlay">
                            <span class="action-text">Ürüne Git</span>
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">${product.price}</div>
                    </div>
                </a>
            `;
        });

        // Oluşturulan kartları sayfaya ekleme
        $('#productList').html(productHTML);
    }
});