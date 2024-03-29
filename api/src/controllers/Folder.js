const { Folder, Todo } = require('../db');

const postFolder = async (req, res, next) => {
    try{
        let { name } = req.body;
        console.log(name);
        let existingFolder = await Folder.findOne({
            where: {
                name,
            }
        });
        if(!existingFolder){
            let createdFolder = await Folder.create({name});
            return res.status(200).send(`Folder ${`"${name}"`} created successfully.`);
        };
        res.status(409).send('There already exists a folder with that name');
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

const deleteFolder = async (req, res, next) => {
    try{
        let { id } = req.body;
        let folder = await Folder.findOne({
            where: {
                id
            }
        });
        let name = folder.name;
        await Todo.destroy({
            where: {
                folderId: id,
            }
        });
        await Folder.destroy({
            where:{
                id
            }
        });
        res.status(200).send(`Folder ${`"${name}"`} deleted successfully.`)
    }catch(err){
        next(err);
    }
}

const editFolder = (req, res, next) => {
        let { newName, id } = req.body;
        let objectUpdate = {
            name: newName
        };
        Folder.update(
            objectUpdate,
            {
                where: {
                    id
                }
            }
        ).then(() => {
            res.status(200).send('Folder name successfully updated to "' + newName + '"')
        }).catch((err) => next(err));
}

module.exports = {
    postFolder,
    getFolders,
    deleteFolder,
    editFolder,
}