const User = require("../model/User")

module.exports = {

    async register(req, res) {
        const Userss = new User(req.body)
        console.log(Userss)
        try {
            await Userss.save()
            res.status(201).json({
                status: 'success',
                data: {
                    Userss
                }
            })
        }catch(err){
            res.status(500).json({
                status: "failed now",
                message: err
            })
        }
    }
}