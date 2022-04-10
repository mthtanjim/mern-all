const PhoneBook = require("../model/PhoneBook")


module.exports= {

    async phones(req, res){
        const phones = await PhoneBook.find({})
        try{
            res.status(200).json({
                status: 'success',
                data: {
                    phones
                }
            })
        }catch {
            res.status(500).json({
                status: "failesd",
                message: err
            })
        }
    },

    async addPhone(req, res) {
    const phoneNumber = new PhoneBook(req.body)
    console.log(phoneNumber)
    try {
        await phoneNumber.save()
        res.status(201).json({
            status: 'Success',
            data: {
                phoneNumber
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err
        })
    }
    },

    async updatePhone(req, res){
        const updatedPhone = await PhoneBook.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
          })
        try{
            res.status(200).json({
                status : 'Success',
                data : {
                  updatedPhone
                }
              })
        }catch(err){
            console.log(err)
        }
    }, 

    async deletePhone(req, res){
        await PhoneBook.findByIdAndDelete(req.params.id)
    try{
        console.log(`deleted Successfully ${req.params}`)
        res.status(204).json({
            status: "Success", 
            data: {}
        })
    }catch{
        res.status(500).json({
            status: "faild", 
            message: err
        })
    }
    }

}