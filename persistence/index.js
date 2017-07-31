
var Note = require('../models/note');
var User = require('../models/user');
var config = require('../config');
var jwt    = require('jsonwebtoken');

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


exports.CreateUser = (callback) => {

    var usr = new User({
        name: 'Guest',
        password : 'testing',
        admin : true
    });

    usr.save((err) => {
        err ? callback(err) : callback(null);
    })
}

exports.Authenticate = (req, callback) => {
    console.log(req.body);
    User.findOne({
        name : req.body.name
    }, (err,user) => {
        if(err) callback(err);

        if(!user){
            callback(null, {success : false , message : "User Authentication failed, user not found"});
        }else if(user){
            if(user.password != req.body.password){
                callback(null, {success : false , message : "User Authentication failed, wrong password"});
            }else{
                var token = jwt.sign(user, config.secret, {
                    expiresIn : 300
                });
                callback(null, {
                    success : true, 
                    message : 'Login successfull', 
                    token : token
                });
            }
        }
    })
}