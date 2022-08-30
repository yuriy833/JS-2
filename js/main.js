const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const catalogData = 'catalogData.json'
const getBasket = 'getBasket.json'

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                //                 console.log(data);
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();
console.log(list.allProducts);

class BasketList {
    constructor(container = '.basket') {
        this.container = container;
        this.goods = [];
        this.showBasket();
        this._getProducts()
            .then(data => {
                this.goods = data.contents;
                this.render();
            });

    }

    _getProducts() {
        return fetch(`${API}/${getBasket}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new BasketItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }


    showBasket() {
        document.querySelector('.btn-cart').addEventListener("click", () => {
            document.querySelector(this.container).classList.toggle('hidden');
        });
    }
}
class BasketItem {
    constructor(product, img = 'https://via.placeholder.com/250x150') {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.volume = product.quantity;
        this.totalPrice = this.price * this.volume;
        if (!product.img) {
            this.img = img;
        } else {
            this.img = product.img;
        };
    }
    render() {
        return `<div data-id="${this.id}" class="basket__basket-item basket-item">
                        <img class="basket-item__img" src="${this.img}" alt="${this.title}" height="50px">
                        <div class="basket-item__wrp">
                            <h3 class="basket-item__title">${this.title}</h3>
                            <p class="basket-item__price">Цена за шт.: <span>${this.price}</span> $</p>
                            <p class="basket-item__volume">Количество: <span>${this.volume}</span> шт.</p>
                            <p class="basket-item__totalPrice">Цена: <span>${this.totalPrice}</span> $</p>
                        </div>
                        <button data-id="${this.id}" class="basket-item__btn btn-delete" type="button">X</button>
                    </div>`
    }
}

let basketList = new BasketList();