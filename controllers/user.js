const { func } = require("prop-types");
const User = require("../models/user")
const bcrypt = require("bcryptjs");

async function getMe(req,res){
    const { user_id } = req.User;
    const response = await User.findById(user_id);
    if(!response) {
        res.status(400).send({msg:"No se ha encontrado usuario"})
    }else{
        res.status(200).send({response})
    }
}

async function getUsers(req,res){
    const { active } = req.query;
    let response = null;
    if(active == undefined){
        response = await User.find();
    }else{
        response = await User.find({active});
    }
    if (response.length > 0) {
        res.status(200).send({
            response,
            status: 200
        })
    }else {
        res.status(201).send({
            response,
            status: 201
        })
    }
}

async function createUser(req,res){
    const {password} = req.body;
    const user = new User({...req.body, active:false});
    const salt = bcrypt.genSaltSync(10);
    const hasPassword = bcrypt.hashSync(password, salt);
    user.password = hasPassword;
    const saveUser = async () => {
        try{
            await user.save();
            res.status(200).send({msg:"Creado correctamente"});
            } 
        catch(err){
            res.status(400).send({user});
        }
    }
    saveUser();
}

async function updateUser(req,res){
    const { id } = req.params;
    const userData = req.body;
    //Password
    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const hasPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hasPassword;
    } else{
        delete userData.password;
    }
    const findUserById = async () => {
        try {
            await User.findByIdAndUpdate({_id:id},userData)
            res.status(200).send({msg:"Actualizacion correcta"});
        } catch (error) {
            res.status(400).send({msg:"Error al actualizar el usuario"});
        }
    }
    findUserById();
}

async function deleteUser(req,res) {
    const { id } = req.params;
    const deleteUserById = async () => {
        try {
            await User.findByIdAndDelete({_id:id})
            res.status(200).send({msg:"El usuario se elimino correctamente"});
        } catch (error) {
            res.status(400).send({msg:"Error al eliminar el usuario"});
        }
    }
    deleteUserById(); 
}

module.exports = { 
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser
};