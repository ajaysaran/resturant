let carts = document.querySelectorAll('.add-cart');

let products = [
{
    name: 'Itly',
    tag: 'itly',
    price: 10,
    incart: 0
},
{
    name: 'Dosa',
    tag: 'dosa',
    price: 20,
    incart: 0
},
{
    name: 'Puri',
    tag: 'puri',
    price: 20,
    incart: 0
},
{
    name: 'Vadai',
    tag: 'vadai',
    price: 5,
    incart: 0
}

];

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalcost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers =localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContext = productNumbers;
    }
}
function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');
  

    productNumbers = parseInt(productNumbers);
 
    if(productNumbers)
    {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);   
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}
function setItems(product){
let cartItems = localStorage.getItem('productsInCart');
cartItems=JSON.parse(cartItems);
if(cartItems != null){
    if(cartItems[product.tag] == undefined){
        cartItems={
...cartItems,
[product.tag]: product
        }
    }
    
    cartItems[product.tag].incart += 1; 
}else{
    product.incart= 1;

    cartItems={
        [product.tag]: product
}

}

localStorage.setItem("productsInCart", JSON.stringify (cartItems));
}

function totalcost(product)
{
//console.log("the product price is", product.price);
let cartcost =localStorage.getItem('totalcost');

console.log("my cartcost is", cartcost);
console.log(typeof cartcost);

if(cartcost != null){
    cartcost=parseInt(cartcost);
localStorage.setItem("totalcost", cartcost + product.price);
}else{
    localStorage.setItem("totalcost", product.price);
}

}
function displaycart(){
let cartItems =localStorage.getItem("productsInCart");
cartItems=JSON.parse(cartItems);
let productContainer = document.querySelector(".product");
let cartcost =localStorage.getItem('totalcost');
console.log(cartItems);
if(cartItems && productContainer){

    productContainer.innerHTML='';
    Object.values(cartItems).map(item =>{
productContainer.innerHTML +=`
    <div class="product">
     <ion-icon name="close-circle-outline"></ion-icon>
     <img src="./img/${item.tag}.jpg">
    <span>${item.name}</span>
    </div>
    <div class="price">${item.price}</div>
    <div class="quantity"><ion-icon name="caret-back-outline"></ion-icon>
    <span>${item.incart}</span><ion-icon name="caret-forward-outline"></ion-icon></div>
    <div class="total">
    ${item.incart*item.price}
    </div>
    `;
    });
productContainer.innerHTML +=`
<div class="basketTotalContainer">
<h4 class="basketTotalTitle">
Basket Total
</h4>
<h4 class="baseketTotal">
${cartcost}
</h4>

`;
}
}

onLoadCartNumbers();
displaycart();