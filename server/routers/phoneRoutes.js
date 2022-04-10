const router = require('express').Router()

const {phones, addPhone, updatePhone, deletePhone} = require('../controller/phoneController')

router.get('/get-phones', phones)
router.post('/add-phone', addPhone )
router.patch('/update-phone/:id', updatePhone)
router.delete('/delete/:id', deletePhone)



module.exports = router

