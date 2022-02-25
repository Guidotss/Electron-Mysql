const {BrowserWindow} = require('electron');
const {getConnection}= require('./database')




async function CreateProduct(product){
    
    const conn = await getConnection(); 
    product.price = parseFloat(product.price); 
    let result = await conn.query('INSERT INTO product SET ?',product);   
    

    product.Id = result.insertId; 

    return product; 
}

async function GetProducts(){
    const conn = await getConnection(); 
    const result = await conn.query('SELECT * FROM product ORDER BY id DESC'); 
    console.log(result);

    return result; 
}

async function DeteleProducts(Id){
    const conn = await getConnection(); 
    const result = await conn.query('DELETE FROM product WHERE id = ?',Id); 

    console.log(result);

    return result; 
}


async function GetProductById(Id){
    const conn = await getConnection(); 
    const result = await conn.query('SELECT * FROM product WHERE id = ?',Id); 

    return result[0]; 
}   

async function UpdateProduct(Id,product){
    const conn = await getConnection(); 
    const result = await conn.query('UPDATE product SET ? WHERE id = ?',[product,Id]); 

    return result; 
}



let window; 


function CreateWindow(){
    window = new BrowserWindow({
        width: 800,
        height:600,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false 
        }
    })

    window.loadFile('src/UI/index.html'); 
}

module.exports = {
    CreateWindow,
    CreateProduct,
    GetProducts,
    DeteleProducts,
    GetProductById,
    UpdateProduct
}