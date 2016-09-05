
var Note = require('../models/note');

exports.GetAllNotes = (callback) => {
    Note.find((err,notes) => {
        err ? callback(err) : callback(null, notes);
    });
};

exports.GetNote = (id, callback) => {
    Note.findById(id, (err, note) => {
        err ? callback(err) : callback(null, note);
    });
};

exports.CreateNote = (req, callback) => {

    var note = new Note();
    note.text = req.body.text;
    note.date = new Date();

    note.save((err) => {
        err ? callback(err) : callback(null);
    });
}

exports.UpdateNote = (req, callback) => {

     Note.findById(req.params.id, (err, note) => {
        
        if(err) 
            callback(err)

        note.text =  req.body.text;
        note.date = new Date();

        note.save((err) => {
            err ? callback(err) : callback(null);

        });

    });
}

exports.DeleteNote = (req, callback) => {

    Note.remove({
        _id : req.params.id
    }, (err, note) => {
        err ? callback(err) : callback(null);
    });
}
