var db = require('../persistence');
var jwt = require('../jwt');

module.exports = function(express){

    var router = express.Router();

    //TODO: Note/User validations

    //Middleware to validate token
    router.use((req,res,next) => {

        if(req.url == '/authenticate' || req.url == '/setup')
            return next();

        let token = req.body.token || req.headers.authorization || req.headers['x-access-token'];

        jwt.validateToken(token)
            .then((result) => {
                
                if(!result.success) 
                    res.status(403).send(result);

                req.decoded = result.decoded;
                next();
            })
            .catch((error) => res.json({ Error : error })) 
    });

    router.route('/')
        .get((req,res) => res.end('Welcome to the coolest api'));

    router.route('/authenticate')
        .post((req,res) => {

            let user = { name : req.body.name, password : req.body.password }

            db.Authenticate(user)
                .then((token) => res.json(token))
                .catch((error) => res.json({ Error : error })) 
        });

    router.route('/notes')
        .get((req,res) => {
            db.GetAllNotes()
                .then((notes) => res.json(notes))
                .catch((error) => res.json({ Error : error })) 
        })
        .post((req,res) => {
            db.CreateNote(req.body.text)
                .then((note) => res.json(note))
                .catch((error) => res.json({ Error : error }))
        });

    router.route('/notes/:id')
        .get((req,res) => {
            db.GetNote(req.params.id)
                .then((note) => res.json(note))
                .catch((error) => res.json({ Error : error }))
        })
        .put((req,res) => {

            let newNote = { id : req.params.id, text : req.body.text }

            db.UpdateNote(newNote)
                .then((note) => res.json(note))
                .catch((error) => res.json({ Error : error }))
        })
        .delete((req,res) => {
            db.DeleteNote(req.params.id)
                .then((message) => res.json(message))
                .catch((error) => res.json({ Error : error }))
        });

    router.route('/setup')
        .get((req,res) => {
            db.CreateUser()
                .then((message) => res.json(message))
                .catch((error) => res.json({ Error : error }))
        });

    return router;
}