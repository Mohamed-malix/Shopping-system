

let productName= document.getElementById('productName');

let productPrice= document.getElementById('productPrice');

let productCat= document.getElementById('productCat');

let productDesc= document.getElementById('productDesc');

let button= document.getElementById('addBtn');

let alertName= document.querySelector('.productNameAlert')




let  products;
let currentIndex;

if(localStorage.getItem('productData')!=null){

    products= JSON.parse(localStorage.getItem('productData'));
    display();

}
else{
    products=[];
}


function addItem(){

    if(button.innerHTML =='Update Product'){
        updateProduct();
    }else{
        add();
    }
}


function add(){

 if(checkInput()){
    let productInfo={
        name:productName.value,
        price:productPrice.value,
        cat:productCat.value,
        desc:productDesc.value,
    }

    products.push(productInfo);
    console.log(products); 
    localStorage.setItem('productData',JSON.stringify(products));

    clearForm()
    display()

  }
  else{
    alert('Enter valid input');
  }

}



function clearForm(){
    productName.value='';
    productPrice.value='';
    productCat.value='';
    productDesc.value='';
}


function display(){
    let data='';

    for(let i=0; i<products.length;i++){
        data+=`
        <tr>
                <td>${i}</td>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].cat}</td>
                <td>${products[i].desc}</td>
                <td><button class="btn btn-outline-warning" onclick="returnInput(${i})">Update</button></td>
                <td><button class="btn btn-outline-danger" onclick="deleteItem(${i})">Delete</button></td>
            </tr>
        `
    }

    
    document.getElementById('bodyTable').innerHTML =data;
}



function deleteItem(index){
    products.splice(index,1);
    localStorage.setItem('productData',JSON.stringify(products));
    display();
}


function returnInput(Index){
    currentIndex= Index;
    productName.value= products[currentIndex].name;
    productPrice.value= products[currentIndex].price;
    productCat.value= products[currentIndex].cat;
    productDesc.value= products[currentIndex].desc;
    button.innerHTML= 'Update Product';

}


function updateProduct(){
    products[currentIndex].name= productName.value;
    products[currentIndex].price= productPrice.value;
    products[currentIndex].cat= productCat.value;
    products[currentIndex].desc= productDesc.value;
    button.innerHTML= 'Add Product';

    localStorage.setItem('productData',JSON.stringify(products));
    display();
    clearForm();
}



function searchProduct(term){

    let data='';
    for(let i=0; i<products.length;i++){

        if(products[i].name.toLowerCase().includes(term.toLowerCase()) || products[i].price.includes(term)){
            console.log(term,'second');
            data+=`
           <tr> 
            <td>${i}<td>
            <td>${products[i].name}<td>
            <td>${products[i].price}<td>
            <td>${products[i].cat}<td>
            <td>${products[i].desc}<td>
            <td><button class="btn btn-outline-warning" onclick="returnInput(${i})">Update</button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteItem(${i})">Delete</button></td>
           <tr> `
        }
    }
   document.getElementById('bodyTable').innerHTML= data;

}







function checkInput(){

    let regx= /^[A-Z][a-z]{3,14}$/;

if(regx.test(productName.value)){
    productName.classList.add('is-valid');
    productName.classList.remove('is-invalid');
    alertName.classList.add('d-none');
    alertName.classList.remove('d-block');

    return true;
}
else{
    productName.classList.remove('is-valid');
    productName.classList.add('is-invalid');
    alertName.classList.remove('d-none');
    alertName.classList.add('d-block');

    return false;
}
}


productName.addEventListener('blur', checkInput());