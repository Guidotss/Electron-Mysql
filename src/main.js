const {CreateWindow} = require('./app.js'); 
const{app} = require('electron'); 

require('./database'); 
require('electron-reload')(__dirname); 

app.allowRenderProcessReuse = false; 

app.whenReady().then(CreateWindow); 

