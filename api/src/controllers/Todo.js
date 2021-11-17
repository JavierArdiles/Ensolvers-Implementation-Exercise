const { Todo, Folder } = require('../db');

const postTodo = async (req, res, next) => {
    try{
        let { name, folderId } = req.body;
        let todoCreated = await Todo.create({name, folderId});
        let folder = await Folder.findOne({
            where: {
                id: folderId,
            },
        });
        folder.addTodo(todoCreated);
        res.status(200).send('To-do item created successfully');
    } catch(err){
        next(err);
    }
}

module.exports = {
    postTodo,
}