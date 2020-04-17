const { check, validationResult } = require('express-validator');

let NeDB = require('nedb');
let db = new NeDB({
    filename: 'users.db',
    autoload: true
})

module.exports = app =>{

    let route = app.route('/users');
    let routeId = app.route('/users/:id');

    route.get((req, res)=>{
 
    db.find({}).sort({name:1}).exec((err,users)=>{
        if(err){
            app.utils.error.send(err, req, res);
        }else{            
            res.json({
                data:users
            
            })
        }
    })
})

    route.get((req, res)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html');
        res.json({
            users:[
                {
                    id:2,
                    name:'Nestor',
                    surname: 'Iglesias'
                }
            ]
           
        })
    });
    route.post([ check('name').isLength({ min: 15 })],(req, res)=>{
       
       

        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        db.insert(req.body,(err,user)=>{
            if( err ){
                app.utils.error.send(err, req, res);

            }else{
                res.status(200).json(user);
            }
        });
    });

    routeId.get((req,res) => {
        db.findOne({_id:req.params.id}).exec( (err,user) => {
            if( err ){
                app.utils.error.send(err, req, res);

            }else{
                res.status(200).json(user);
            }

        })
    })
    
    //UPDATE DE USER
    routeId.put((req,res) => {
        db.update({ _id:req.params.id }, req.body, err => {
            
            if( err ){
                app.utils.error.send(err, req, res);

            }else{
                res.status(200).json(
                    Object.assign(
                        req.params,
                        req.body
                    )
                );
            }

        })
    })


    routeId.delete( ( req, res) => {

        db.remove({_id:req.params.id}, {}, err => {
            if( err ){
                app.utils.error.send({Error: err})
            }else{
                res.json(Object.assign({message: "registro deletado com sucesso"},req.params));
            }
        })
    })
}

