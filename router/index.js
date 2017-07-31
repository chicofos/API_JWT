var db = require('../persistence');
var jwt    = require('jsonwebtoken');
var config = require('../config.js');

module.exports = function(express){

    var router = express.Router();

    // router.use((req,res,next) => {

    //     if(req.url == '/authenticate' || req.url == '/setup')
    //         return next();

    //     var token = req.body.token || req.headers.authorization || req.headers['x-access-token'];

    //     if(token){
    //         jwt.verify(token, config.secret, (err,decoded) => {
    //             if(err){
    //                return res.json({success : false, message : err.message });
    //             }else{
    //                 req.decoded = decoded;
    //                 next();
    //             }
    //         });
    //     }else{
    //        return res.status(403).send({ 
    //             success: false, 
    //             message: 'No token provided.' 
    //         }); 
    //     }
    // });

    router.route('/')
        .get((req,res) => {
            res.end('Welcome to the coolest api');
        });

    router.route('/authenticate')
        .post((req,res) => {
            db.Authenticate(req, (err, response) => {
                res.setHeader('Content-Type', 'text/javascript');
                err ? res.json({error : err}) : res.json(response);
            })
        });

    router.route('/notes')
        .get((req,res) => {
            db.GetAllNotes((err, notes) => {
                if(err)
                    res.json({error : err});

                res.json(notes);
            });
        })
        .post((req,res) => {

            db.CreateNote(req, (err) => {
                if(err)
                    res.json({error : err});

                res.json({ message : 'Note created successfully' });
            })
        });

    router.route('/notes/:id')
        .get((req,res)=>{
            db.GetNote(req.params.id, (err, note) => {
                if(err)
                    res.json({error : err });
                
                res.json(note);
            });
        })
        .put((req,res) => {
            db.UpdateNote(req, (err) => {
                err ? res.json({ error : err }) : res.json({ message: "Note updated" }); 
            });
        })
        .delete( (req,res) => {
            db.DeleteNote(req, (err) => {
                err ? res.json({ error : err }) : res.json({ message: "Note deleted" });
            });
        });

        router.route('/setup')
            .get((req,res) => {
                db.CreateUser((err) => {
                    err ? res.json({error : err}) : res.json({message : 'User created successfully'});
                })
            });

    return router;
}