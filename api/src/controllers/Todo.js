const { Todo, Folder } = require('../db');

const postTodo = async (req, res, next) => {
    try{
        let { name, folderId } = req.body;
        await Todo.create({name, folderId});
        let folder = await Folder.findOne({
            where: {
                id: folderId,
            }
        })
        res.status(200).send(`To-do item ${`"${name}"`} created successfully in folder ${`"${folder.name}"`}.`);
    } catch(err){
        next(err);
    }
}

const getTodos = async (_req, res, next) => {
    try{
        let allTodos = await Todo.findAll();
        res.status(200).send(allTodos);
    }catch(err){
        next(err);
    }
}

const putTodo = async (req, res, next) => {
    try{
        let { newName, id, completed } = req.body;
        let objectUpdate = {
            name: newName,
            completed
        };
        await Todo.update(
            objectUpdate,
            {
                where: {
                    id
                }
            }
        ).then(() => {
            res.status(200).send('To-do item successfully updated.')
        })
    }catch(err){
        next(err);
    }
}

const deleteTodo = async (req, res, next) => {
    try{
        let { id } = req.body;
        let item = await Todo.findOne({
            where: {
                id
            }
        });
        let name = item.name;
        await Todo.destroy({
            where: {
                id
            }
        });
        res.status(200).send(`To-do item ${`"${name}"`} deleted successfully.`)
    }catch(err){
        next(err);
    }
}

module.exports = {
    postTodo,
    getTodos,
    putTodo,
    deleteTodo,
}