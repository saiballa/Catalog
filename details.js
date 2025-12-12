let productDislay = document.getElementById('productDisplay');
let productNotFound = document.getElementById('productNotFound');

async function fetchProduct() {
    let loader = document.getElementById('loader');
    productDislay.style.display='none';
    try {
        let params = new URLSearchParams(location.search);
        let id = params.get('product_id');
        
        let response = await fetch(`https://dummyjson.com/products/${id}`);
        if(response.status === 404){
            productDislay.style.display='none';
            productNotFound.style.display='block';
            return;
        }
        let data = await response.json();
        setDetails(data);
    }catch(err) {
        console.log(err.message);
    }
    finally{
        loader.style.display='none';
    }
}

function setDetails(details){
    productDislay.style.display='block';
    const {brand,description,images,price,rating,tags,title,thumbnail,dimensions,availabilityStatus,discountPercentage,returnPolicy,shippingInformation,reviews,stock,warrantyInformation} = details;
    
    let poster =  document.querySelector('#poster > img');
    let brandTag = document.getElementById('productBrand');
    let titleTag = document.getElementById('productTitle');
    let descriptionTag = document.getElementById('productDescription');
    let moreImages = document.getElementById('viewMoreImages');
    let priceTag = document.getElementById('productPrice');
    let ratingTag = document.getElementById('productRatings');
    let cusinies = document.getElementById('productTag');
    let warranty = document.getElementById('warranty');
    let productDimensions = document.getElementById('dimensions');
    let available = document.querySelector('#productMoreDetails > h3 > span');
    let stockNo = document.getElementById('stockNo');
    let returnMethod = document.getElementById('returnPol');
    let shipping = document.getElementById('shipping');

    poster.src=thumbnail;
    brandTag.textContent = brand;
    titleTag.textContent=title;
    descriptionTag.textContent=description;
    cusinies.textContent=`${tags.join(' ')}`;
    priceTag.textContent=`Rs. ${price}`;
    ratingTag.textContent=rating;

    images.forEach((item,index)=>{
        let imgCon = document.createElement('div');
        let img = document.createElement('img');
        img.setAttribute('src',item);
        img.setAttribute('alt','image');
        imgCon.classList.add('img-container');
        imgCon.setAttribute('id',index);

        imgCon.addEventListener('click',function(){
            let index = imgCon.getAttribute('id');
            poster.src=images[index];
        })
        imgCon.appendChild(img);
        moreImages.appendChild(imgCon);
    });

    productDimensions.textContent=`width: ${dimensions.width}, height: ${dimensions.height}, depth: ${dimensions.depth}`;
    available.textContent=availabilityStatus;
    stockNo.textContent=stock;
    returnMethod.textContent=returnPolicy;
    shipping.textContent=shippingInformation;
    warranty.textContent=warrantyInformation;   
}


fetchProduct();