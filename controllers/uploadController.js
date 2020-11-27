const {cloudinary} = require('../config/cloudinary');

exports.getFiles = async function (req, res) {
    const {resources} = await cloudinary.search;
};

exports.uploadFiles = async function (req,res) {
  try {
      const fileStr = req.body.data;
      const result = await cloudinary.uploader.upload(req.file.path);
  }  catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
  }
};