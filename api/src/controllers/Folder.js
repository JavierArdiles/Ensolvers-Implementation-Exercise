const { Folder } = require('../db');

const postFolder = async (req, res, next) => {
    try{
        let { name } = req.body;
        let createdFolder = await Folder.create({name});
        res.status(200).send('Folder created successfully');
    }catch(err){
        next(err);
    }
}

const getFolders = async (_req, res, next) => {
    try{
        let allFolders = await Folder.findAll();
        res.status(200).send(allFolders);
    }catch(err){
        next(err);
    }
}

module.exports = {
    postFolder,
    getFolders,
}