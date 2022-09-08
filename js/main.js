const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.toggle('hidden');
});

const app = new Vue({
    el: '#app',
    data: {
        basketUrl: '/getBasket.json',
        catalogUrl: '/catalogData.json',
        basketGoods: [],
        products: [],
        filtered: [],
        stubImg: 'https://via.placeholder.com/200x150',
        userSearch: '',
        showBasket: false
    },
    methods: {
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.basketGoods.find(item => product.id_product == item.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            this.$set(product, 'quantity', 1);
                            this.basketGoods.push(product);
                        }
                    }
                })
        },
        deleteProduct(cart) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (cart.quantity > 1) {
                            cart.quantity--;
                        } else {
                            this.basketGoods.splice(this.basketGoods.indexOf(cart), 1);
                        }
                    }
                })
        },
        clearBasket() {
            this.basketGoods = [];
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });

        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.basketGoods.push(el);
                }
            });

        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    }
})