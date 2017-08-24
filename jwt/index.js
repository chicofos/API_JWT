const jwt = require('jsonwebtoken')
const config = require('../config')

exports.validateToken = (token) => {
    
    return new Promise((resolve, reject) => {
        if(!token) 
            resolve({ success : false, message : 'No token provided.' })
        //TODO: promesify jwt
        jwt.verify(token, config.secret, (err, decoded) => { 
            resolve( err ? { success : false, message : err.message } : { success: true, decoded : decoded });
        });         
    })
}

