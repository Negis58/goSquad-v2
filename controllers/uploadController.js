const cloudinary = require('../config/cloudinary');
const User = require('../models/User');

exports.uploadFiles = async function (req,res, next) {
  try {
      const file = req.file;
      console.log(req.file);
      if (!file) {
          const error = new Error('Пожалуйста, загрузите файл');
          error.httpStatusCode = 400;
          return next(error)
      }
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result.secure_url);
      const user = await User.findByIdAndUpdate(req.user.userId, {avatar: result.secure_url});
      console.log(user);

  }  catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
  }
};
