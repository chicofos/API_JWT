var Note = require('../models/note');
var User = require('../models/user');
var config = require('../config');
var jwt    = require('jsonwebtoken');

exports.GetAllNotes = () => {
    return new Promise ((resolve, reject) => {
        Note.find().exec()
            .then((notes) => resolve(notes))
            .catch((error) => reject(error))
    })
}

exports.GetNote = (id) => {
    return new Promise ((resolve, reject) => {
        Note.findById(id).exec()
            .then((note) => resolve(note))
            .catch((error) => reject(error))
    })
}

exports.CreateNote = (body) => {

    let note = new Note();
    note.text = body;
    note.date = new Date();

    return new Promise ((resolve, reject) => { 
        note.save.exec()
            .then((note) => resolve(note))
            .catch((error) => reject(error))
    })
}

exports.UpdateNote = (newNote) => {
    return new Promise ((resolve, reject) => { 
        Note.findById(newNote.id).exec()
            .then((note) => {
                note.text =  newNote.text
                note.date = new Date()
        
                return note.save()
            })
            .then((note) => resolve(note))
            .catch((error) => reject(error))
    })
}

exports.DeleteNote = (id) => {
    return new Promise((resolve, reject) => {
        Note.remove({ _id : id }).exec()
            .then(() => resolve({ message : "Note deleted" }))
            .catch((error) => reject(error))
    })
}

exports.CreateUser = (callback) => {

    let user = new User({
        name: config.user,
        password : config.pwd,
        admin : true
    });

    return new Promise((resolve, reject) => {
        user.save.exec()
            .then((note) => resolve(note))
            .catch((error) => reject(error))
    })
}

exports.Authenticate = (user) => {
    return new Promise((resolve, reject) => {
        User.findOne({ name : user.name }).exec()
            .then((userFound) => {

                if(!userFound) 
                    resolve({ success : false , message : "User Authentication failed, user not found" })

                if(user.password != userFound.password) 
                    resolve({ success : false, message : 'User Authentication failed, wrong password' })

                let token = jwt.sign(userFound, config.secret, { expiresIn : 300 })
                resolve({ success : true, message : 'Login successfull', token : token })
            })
            .catch((error) => reject(error))
    })
}