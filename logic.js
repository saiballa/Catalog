let globalData;
let productsLayout = document.getElementById('products');
let productsConatiner =  document.getElementById('productListDisplay');

async function fetchData(){
    let loader = document.getElementById('loader');
   try {
     let response = await fetch('https://dummyjson.com/products');
     let data = await response.json();

     let list = await fetch('https://dummyjson.com/products/category-list');
     let category = await list.json();

    createCards(data.products);
    globalData=data;
    categoryList(category);
    createDropdown(category);
   } catch (error) {
        console.log(error);
   }
   finally{
    loader.style.display='none';
    productsLayout.style.display='block';
   }
}

fetchData();
showCartNumber();

function createCards(data){
    let productsConatiner =  document.getElementById('productListDisplay');
    productsConatiner.innerHTML="";
    data.forEach((item)=>{
        let card = cardTemplate(item);
        productsConatiner.appendChild(card);
    });
    let cards = document.querySelectorAll('#productListDisplay .card');
    
     const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          const card = entry.target;

          setTimeout(()=>{
            

          const cardImageContainer = card.querySelector('.img-container');
          const cardImage = card.querySelector('.img-container > img');
          const cardTitle = card.querySelector('.card-details > .card-title');
          const cardBrand = card.querySelector('.card-details > .card-brand');
          const cardPrice = card.querySelector('.card-details > .card-price');
          const cardRating = card.querySelector('.card-details > .card-rating');
          
          cardImage.src=cardImage.dataset.src;
          cardBrand.textContent=cardBrand.dataset.textContent;
          cardPrice.textContent=cardPrice.dataset.textContent;
          cardRating.textContent=cardRating.dataset.textContent;
          cardTitle.textContent=cardTitle.dataset.textContent;

            cardImageContainer.classList.remove('img-con-loader');
            cardBrand.classList.remove('loading');
            cardPrice.classList.remove('loading');
            cardRating.classList.remove('loading');
            cardTitle.classList.remove('loading');

          observer.unobserve(card);  
          
          },300);
        }
      });
    });

    cards.forEach(card => observer.observe(card));
}

function categoryList(list){
    let sideBar = document.querySelector('#productCategory > ul');
    let li = document.createElement('li');
    li.textContent = "Categories";
    li.style.textDecoration="underline";
    sideBar.appendChild(li);
    list.forEach((item)=>{
        let eachCategory = listItem(item);
        sideBar.appendChild(eachCategory);
    })
}

function listItem(item){
    let li = document.createElement('li');
    li.textContent = item;
    li.addEventListener('click',function(e){
        fetchCategoryData(this.textContent);
    });

    return li;
}

function viewDetails(category){
    console.log(category);
}

function cardTemplate(details){
    const {title,price,brand,thumbnail,id,rating} = details;

   let card = document.createElement('div');
   let imgContainer = document.createElement('div');
   let cardDetails = document.createElement('div');

   //img
   let img = document.createElement('img');
    //img.setAttribute('src',thumbnail);
     img.dataset.src=thumbnail;
   img.setAttribute('alt','image');
   imgContainer.classList.add('img-container','img-con-loader');
   imgContainer.appendChild(img);

   //card details
   let Brand = document.createElement('p');
   let Title = document.createElement('p');
   let Price = document.createElement('p');
   let ratings = document.createElement('p');
   Brand.classList.add('card-brand','loading');
   Brand.dataset.textContent = brand || '';

   Title.classList.add('card-title','loading');
   Title.dataset.textContent=title;

   ratings.classList.add('card-rating','loading');
   ratings.dataset.textContent=rating;

   Price.classList.add('card-price','loading');
   Price.dataset.textContent = `₹ ${Math.floor(price * 87.97)}`;

   cardDetails.classList.add('card-details');
   cardDetails.setAttribute('id','cardDetails')
   cardDetails.appendChild(Brand);
   cardDetails.appendChild(Title);
   cardDetails.appendChild(Price);
   cardDetails.appendChild(ratings);

   //button to navigate
   let button = document.createElement('button');
   button.textContent = "Details";
   button.classList.add('details');
   button.addEventListener('click',function(){
       window.location.href=`product.html?product_id=${id}`;
   })

    cardDetails.appendChild(button);
    card.classList.add('card');
    card.appendChild(imgContainer);
    card.appendChild(cardDetails);

   return card;
}


async function fetchCategoryData(category){
   try {
     let response = await fetch(`https://dummyjson.com/products/category/${category}`);
     let data = await response.json();
       createCards(data.products);
        globalData=data;
   } catch (error) {
        console.log(error);
   }
}

function searchProduct(){
   const {products} = globalData;
    let value = document.getElementById('searchField').value.toLowerCase();
    let filterData = products.filter((item) => item.title.toLowerCase().includes(value));
    if(!filterData.length > 0){
        productsConatiner.innerHTML="<h3>product not found</h3>";
    }else{
        createCards(filterData);
    }
    document.getElementById('searchField').value="";
}

function defaultData(){
    createCards(globalData.products);
}
function rating(){
    let topRating = globalData.products.filter(item => item.rating >= 3.5);
    createCards(topRating);
}
function ascending(){
    let lowPrice = globalData.products.toSorted((a,b) => a.price - b.price);
    createCards(lowPrice);
}
function descending(){
    let highPrice = globalData.products.toSorted((a,b) => b.price - a.price);
    createCards(highPrice);
}


function categoryOptionsList(list){
    let value = document.getElementById('myselect').value;
    fetchCategoryData(value);
   
}
function createDropdown(list){
    let selectDiv = document.getElementById('myselect');
     list.forEach((item)=>{
        let option = document.createElement('option');
        option.setAttribute('value',item);
        option.textContent=item;
        selectDiv.appendChild(option);
   })
}

function showCartNumber(){
    let count =JSON.parse(localStorage.getItem('count')) || 0;
    let counter = document.querySelector('#headerNavi > a > span');
    counter.textContent=count;
}



