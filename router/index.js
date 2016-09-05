var db = require('../persistence');

module.exports = function(express){

    var router = express.Router();

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


    return router;
}