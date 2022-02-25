

const ProductForm = document.getElementById('ProductForm');

const {remote} = require('electron'); 

const main = require('../app'); 

const ProductName = document.getElementById('name');
const ProductPrice = document.getElementById('price');
const ProductDes = document.getElementById('description');
const ProductList = document.getElementById('products'); 

let products = []; 
let EditingStatus = false; 
let ProductID = ''; 

ProductForm.addEventListener('submit', async (e) =>{

    e.preventDefault();     

    const NewProduct = {
        name: ProductName.value,
        price: ProductPrice.value,
        description: ProductDes.value
    }
    

   if(!EditingStatus){
     const result =  await main.CreateProduct(NewProduct); 
   }

   else{
        await main.UpdateProduct(ProductID,NewProduct); 
       EditingStatus = false; 
       ProductID = ''; 
   }
  

    ProductForm.reset(); 
    ProductName.focus(); 



    GetProduct(); 
})

async function DeleteProduct(Id){
    const response = confirm('Are you sure you want to delete it?'); 

    if(response){
        await main.DeteleProducts(Id); 
        await GetProduct(); 
    }
    return; 
}

async function EditProduct(Id){

    const product = await main.GetProductById(Id); 
    ProductName.value = product.name; 
    ProductPrice.value = product.price; 
    ProductDes.value = product.description; 
    
    ProductID = product.Id; 
    EditingStatus = true; 
}


function RenderProduct(product){
    ProductList.innerHTML = ''; 
    product.forEach(product => {
        ProductList.innerHTML += 
        `<div id="animation" class = "card card-body my-2 animate__animated animate__fadeInLeft">
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <h3>${product.price}</h3>
            <p>
                <button class= "delete" onclick = "DeleteProduct('${product.Id}')">
                    DELETE
                </button>

                <button class="edit" onclick = "EditProduct('${product.Id}')">
                    EDIT
                </button>
            </p>
        </div>`
    })

}


const GetProduct = async () =>{
    products = await main.GetProducts(); 
    RenderProduct(products); 
}



async function init(){
    await GetProduct()
}

init(); 