const express = require('express');
const consign = require('consign');
const bodyparser = require('body-parser');

let app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


consign().include('routes').include('utils').into(app);

// let routesIndex = require('./routes/index');
// let routesUsers = require('./routes/user');
        
// app.use(routesIndex);
// app.use('/users',routesUsers);
        

app.listen(3000, 'localhost', function(){
    console.log( 'servidor rodando');
})

