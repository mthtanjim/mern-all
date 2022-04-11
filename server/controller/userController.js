const User = require("../model/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {serverError, resourceError} = require('../util/error')

module.exports = {

    //User login code implement will e leter

    async login(req, res){
        const {email, password} = req.body

        User.findOne({email})
            .then(user => {
                if (!user) {
                    return resourceError(res, "Usar Not Found")
                } 

                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return serverError(res, err)
                    }
                    if (!result) {
                        return resourceError(res, `Password Does\'t Match`)
                    }
                    
                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                    }, 'SECRET', {expiresIn: '2h'})

                    res.status(200).json({
                        message: 'Login Successful',
                        token: `Bearer ${token}`
                    })


                })

            })

    },


    // User Registration route
    async register(req, res) {
        const {name, email, password} = req.body
        
        User.findOne({email})
            .then(user => {
                if(user) {
                    return resourceError(res, 'User Already Exixt')
                }
                bcrypt.hash(password, 11, (err, hash) => {
                    if (err) {
                        return resourceError(res, "Server Error Occure")
                    }
                    let user = new User ({
                        name,email,password: hash
                    })

                    user.save()
                    .then(user => {
                        res.status(201).json({
                            message: 'user Created Successfully',
                            user
                        })
                    })
                    .catch(error => serverError(res, error))



                } ) 


            }) .catch(error => serverError(res, error))







        console.log({password, name})
      
    }
}