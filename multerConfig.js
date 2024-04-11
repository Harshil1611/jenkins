const multer = require('multer')


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'public/StudentImage')
    },
    filename: function (req,file,cb){
        const dateCreated = Date.now()
        cb(null,dateCreated +"-"+ file.originalname)
    }
})

const upload = multer({
    storage:storage,
    limits: { fileSize: 1024 * 1000 }
})

module.exports = upload