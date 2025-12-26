function cartListProducts(){
    let cartList = JSON.parse(localStorage.getItem('catalogProducts')) || [];
    const listContainer = document.getElementById('cartListProductsContainer');
    if(cartList.length == 0){
        listContainer.innerHTML=`<h3>Add cart items</h3>`;
    }
    cartList.forEach((item)=>{
        let cartTemplate = createCartTemplate(item);
        listContainer.appendChild(cartTemplate);
    })
}

function createCartTemplate(product){
    const{title,id,brand,price,thumbnail,count} = product;
    
    let productDiv = document.createElement('div');
    productDiv.classList.add('each-cart-product');
    productDiv.setAttribute('id',id);

    //create delete button
    let deleteButtonContainer = document.createElement('div');
    deleteButtonContainer.classList.add('delete-con');
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('button-delete');
    deleteButton.textContent='Delete';
    deleteButtonContainer.appendChild(deleteButton);

    let div =  document.createElement('div');
    div.classList.add('image-details-container');
    //img container
    let imgContainer = document.createElement('div');
    imgContainer.classList.add("cart-image-container");
    let img = document.createElement('img');
    img.src=thumbnail;
    img.alt='image';
    imgContainer.appendChild(img);

    //details container
    let productDetails = document.createElement('div');
    productDetails.classList.add('cart-item-details');

    let productBrand = document.createElement('p');
    productBrand.classList.add('product-brand');
    productBrand.textContent=brand || "";

    let productTitle = document.createElement('p');
    productTitle.classList.add('product-title');
    productTitle.textContent=title;

    let productNumber = document.createElement('p');
    productNumber.classList.add('product-number');
    productNumber.textContent=`x${count}`;

    let productPrice = document.createElement('p');
    productPrice.classList.add('product-price');
    productPrice.textContent=`₹ ${Math.floor(price * 87.97) * count}`;

    //create increment and decrement
    let countSetContainer = document.createElement('div');
    countSetContainer.classList.add('buttonsContainer');

    let incrementButton = document.createElement('button');
    incrementButton.classList.add('increment');
    incrementButton.textContent='+';

    let decrementButton = document.createElement('button');
    decrementButton.classList.add('decrement');
    decrementButton.textContent='-';

    let counterNumber = document.createElement('p');
    counterNumber.classList.add('display-count');
    counterNumber.textContent=count;

    countSetContainer.appendChild(decrementButton);
    countSetContainer.appendChild(counterNumber);
    countSetContainer.appendChild(incrementButton);

    productDetails.appendChild(productBrand);
    productDetails.appendChild(productTitle);
    productDetails.appendChild(productNumber);
    productDetails.appendChild(productPrice);
    productDetails.appendChild(countSetContainer);
    div.appendChild(imgContainer);
    div.appendChild(productDetails);

    productDiv.appendChild(deleteButtonContainer);
    productDiv.appendChild(div);

    productDiv.addEventListener('click',function(e){
        //delete funtionality
        const listContainer = document.getElementById('cartListProductsContainer');
        if(e.target.matches('.button-delete')){
            let cartList = JSON.parse(localStorage.getItem('catalogProducts')) || [];
            let count = JSON.parse(localStorage.getItem('count')) || 0;
            let filterData = cartList.filter(item => item.id != e.currentTarget.id);
            count--;
            localStorage.setItem('catalogProducts',JSON.stringify(filterData));
            localStorage.setItem('count',JSON.stringify(count));
            listContainer.innerHTML="";
            cartListProducts();
            totalAmountPay()
        }
        //increment functionality
        if(e.target.matches('.increment')){
            let cartList = JSON.parse(localStorage.getItem('catalogProducts')) || [];
            cartList.forEach((item)=>{
                if(item.id == e.currentTarget.id){
                    item.count+=1;
                }
            });
            localStorage.setItem('catalogProducts',JSON.stringify(cartList));
            listContainer.innerHTML="";
            cartListProducts();
            totalAmountPay()
        }

        //decrement functionality
        if(e.target.matches('.decrement')){
            let cartList = JSON.parse(localStorage.getItem('catalogProducts')) || [];
            cartList.forEach((item)=>{
                if(item.id == e.currentTarget.id && item.count != 1){
                    item.count-=1;
                }
            });
            localStorage.setItem('catalogProducts',JSON.stringify(cartList));
            listContainer.innerHTML="";
            cartListProducts();
            totalAmountPay()
        }
    })

    return productDiv;
}


function totalAmountPay(){
    let cartList = JSON.parse(localStorage.getItem('catalogProducts')) || [];
    const amount = document.querySelector('#cartFinalAmount > .cart-payment > .amount > span');
    let sum = cartList.reduce((acc,cur)=>{
        acc+=cur.price * cur.count;
        return acc;
    },0);
    const finalPayment = Math.floor(sum * 87.97);
    amount.textContent=finalPayment;
}

function orderConfirm(){
    let cartList = JSON.parse(localStorage.getItem('catalogProducts')) || [];
    localStorage.removeItem('catalogProducts');
    localStorage.removeItem('count');
    if(cartList.length==0){
        return;
    }
    window.location.href='confirm.html';
}

cartListProducts();
totalAmountPay();