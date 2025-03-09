$(document).ready(function() {
    // verileri çağırma
    $.getJSON('data.json', function(data) {
        renderProducts(data.products);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Veri yükleme hatası:', textStatus, errorThrown);
    });

    // ürünleri listele
    function renderProducts(products) {
        const $productsContainer = $('.products');
        
        products.forEach((product, index) => {
            const $productCard = $('<div>')
                .addClass('product-card')
                .css('animation-delay', `${index * 0.1}s`)
                .data('product', product)
                .append(
                    $('<img>')
                        .addClass('product-image')
                        .attr('src', product.image)
                        .attr('alt', product.name),
                    $('<h3>')
                        .addClass('product-name')
                        .text(product.name),
                    $('<div>')
                        .addClass('product-price')
                        .text(product.price.replace(' TL', ''))
                );
            
            $productsContainer.append($productCard);
        });
    }

    function showModal(product) {
        const $modal = $('.modal');
        const $overlay = $('.modal-overlay');

        $modal.find('.modal-image').attr('src', product.image);
        $modal.find('.modal-title').text(product.name);
        $modal.find('.modal-price').text(product.price);
        $modal.find('.modal-description').text(product.description);

        $overlay.fadeIn(300, function() {
            $modal.addClass('active');
        });
    }

    function hideModal() {
        const $modal = $('.modal');
        const $overlay = $('.modal-overlay');

        $modal.removeClass('active');
        setTimeout(() => {
            $overlay.fadeOut(300);
        }, 200);
    }

    $(document).on('click', '.product-card', function() {
        const product = $(this).data('product');
        showModal(product);
    });

    $('.modal-close, .modal-overlay').on('click', function(e) {
        if (e.target === this) {
            hideModal();
        }
    });

    $(document).keydown(function(e) {
        if (e.key === "Escape") {
            hideModal();
        }
    });
});