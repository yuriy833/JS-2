const products = [
    { id: 1, title: 'Notebook', price: 2000, img: "./img/product1.jpg" },
    { id: 2, title: 'Mouse', price: 20, img: "./img/product2.jpg" },
    { id: 3, title: 'Keyboard', price: 200, img: "./img/product3.jpg" },
    { id: 4, title: 'Gamepad', price: 50, img: "./img/product4.jpg" },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
    return `<div class="product-item">
                <h3 class="product-item__title">${item.title}</h3>
                <img src="${item.img}" alt="${item.title}" height="300px">
                <p class="product-item__price">${item.price} $</p>
                <button class="product-item__btn btn-cart" type="button">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);