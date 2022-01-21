var productName = document.getElementById('productname');
var productPrice = document.getElementById('productprice');
var productCategory = document.getElementById('productcategory');
var productDescription = document.getElementById('productdescription');
var inputs = document.getElementsByClassName('form-control');
var searchInput = document.getElementById('searchInput');
var currentIndex=0;
var productContainer;
if (localStorage.getItem('productllist')!=null) {
    productContainer = JSON.parse(localStorage.getItem('productllist'));
    displayProduct(productContainer);
}
else
{
    productContainer=[];
}
function addProduct() {
    if (document.getElementById('mainBtn').innerHTML == 'Add Product') {
            var product = {
                name: productName.value,
                price: productPrice.value,
                category: productCategory.value,
                description: productDescription.value
            };
            productContainer.push(product);
            localStorage.setItem('productllist', JSON.stringify(productContainer));
            displayProduct(productContainer);
            clearForm();
        }
    else
    {
        updateProduct();
        document.getElementById('mainBtn').innerHTML = 'submit';
    }
}
function displayProduct(productParameter) {
    var row = ``;
    for (var i = 0; i < productParameter.length; i++) {
        row += `<tr>
        <td>${i + 1}</td>
        <td>${productParameter[i].name}</td>
        <td>${productParameter[i].price}</td>
        <td>${productParameter[i].category}</td>
        <td>${productParameter[i].description}</td>
        <td><button class='btn btn-danger' onclick='deleteProduct(${i})'>delete</button></td>
        <td><button class='btn btn-warning' onclick='getProduct(${i})'>update</button></td>
        </tr>`;
    }
    document.getElementById(`addedRow`).innerHTML = row;
}
function clearForm() {
    for (i  = 0; i < inputs.length; i++) {
       inputs[i].value=``;
    }
}
function deleteProduct(index) {
    productContainer.splice(index,1);
    localStorage.setItem('productllist', JSON.stringify(productContainer));
    displayProduct(productContainer);
}
function serachProduct(searchInput) {
    var row = ``;
    for (i  = 0; i < productContainer.length; i++) {
       if (productContainer[i].name.toLowerCase().includes((searchInput.toLowerCase())) == true) {
        row += `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].description}</td>
        <td><button class='btn btn-danger' onclick='deleteProduct(${i})'>delete</button></td>
        </tr>`;
       }
       document.getElementById(`addedRow`).innerHTML = row;
        
    }
}
function getProduct(index) {
    currentIndex = index;
    var product=  productContainer[index];
    productName.value = product.name;
    productPrice.value = product.price;
    productCategory.value = product.category;
    productDescription.value = product.description;
    document.getElementById('mainBtn').innerHTML = 'Update Product';
}
function updateProduct() {
    var product= 
    {name:productName.value, 
        price:productPrice.value, 
        category:productCategory.value, 
        description:productDescription.value
    }
        productContainer[currentIndex].name= product.name;
        productContainer[currentIndex].price= product.price;
        productContainer[currentIndex].category= product.category;
        productContainer[currentIndex].description= product.description;
        localStorage.setItem('productllist', JSON.stringify(productContainer));
}
// function validateProductName() {
//     var regx = /^[A-Z] [a-z] {3,8}$ /
//     if (regx.test(productName.value)== true) {
//         return true;
//     }
//     else
//     {
//         return false;
//     }
// }
