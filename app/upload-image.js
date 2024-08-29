// const express = require('express')
// const path = require('path')
// const multer = require('multer')
// const app = express()

// const multerMiddleWareStorage = multer.diskStorage({
//     destination: (req, res, callBack) => {
//         callBack(null, 'uploads/')
//     },
//     filename: (req, file, callBack) => {
//         // const originalname = file.originalname.replace(/\s/g, '_');
//         // callBack(null, Date.now() + path.extname(originalname))
//         const originalname = file.originalname.replace(/\s/g, ''); // Remove spaces
//         const timestamp = Date.now();
//         const extension = path.extname(originalname);
//         callBack(null, `${path.basename(originalname, extension)}${timestamp}${extension}`);

//     }
// });
// const fileFilter = (req, file, callBack) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png','image/gif','application/vnd.android.package-archive'];
//     if (allowedFileTypes.includes(file.mimetype)) {
//         callBack(null, true)
//     } else {
//         callBack(null, false)
//     }
// }
// const upload = multer({
//     storage: multerMiddleWareStorage,
//     limits: {
//         fileSize: 1000000000 // 1000000000 Bytes = 1000 MB 
//     },
//     fileFilter: fileFilter,
// })

// const UploadImage = app.post('/', upload.single('image'), (req, res) => {
//     try {
//         const imageUpload = req.file.path
//         res.json({path:imageUpload})
//     } catch (error) {
//         res.send(error)
//     }
// })
// module.exports = UploadImage
const { cloudinary } = require("../app/urls");

// upload to cloudinary
const uploadToCloudinary = async (path, folder) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(path, {
      folder: folder,
      allowed_formats: [],
      resource_type: "auto",
    });

return uploadResult;
  } catch (error) {
    throw error;
  }
};

// update  on cloudinary
const updateCloudinaryFile = async (path, public_id) => {
  try {
    const updateResult = await cloudinary.uploader.upload(path, {
      public_id: public_id,
      allowed_formats: [],
      resource_type: "auto",
      overwrite: true,
    });

return updateResult;
  } catch (error) {
    throw error;
  }
};

// delete from cloudinary
const deleteCloudinaryFile = async (public_id) => {
  try {
    const deleteResult = await cloudinary.uploader.destroy(public_id, {
      resource_type: "image",
    });
    return deleteResult;
  } catch (error) {
    throw error;
  }
};

// delete all from cloudinary
const deleteAllCloudinaryFiles = async (public_ids) => {
  try {
    const deleteResult = await cloudinary.api.delete_resources(public_ids);

return deleteResult;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadToCloudinary,
  updateCloudinaryFile,
  deleteCloudinaryFile,
  deleteAllCloudinaryFiles,
};