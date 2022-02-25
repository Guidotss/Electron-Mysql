const Mysql= require('promise-mysql'); 

const connection = Mysql.createConnection({
    hots: 'localhost',
    user:'root',
    password: '',
    database:'electrondb'
})

function getConnection(){
    
    return connection; 
}

module.exports = {getConnection}; 

