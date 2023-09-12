const Contacto = require("../models/contacto");

async function createContacto(req,res) {
    const contacto = new Contacto(req.body);
    contacto.fechaContacto = new Date();
    const createContacto = async () => {
        try {
            await contacto.save()
            res.status(200).send({contacto});
        } catch (error) {
            res.status(400).send({msg:"Error al crear el contacto"});
        }
    }
    createContacto();
}

async function getContactos(req,res) {
    const { leido } = req.query;
    let response = null;
    if(leido == undefined){
        response = await Contacto.find().sort({fechaContacto:"asc"});
    }else{
        response = await Contacto.find({leido}).sort({fechaContacto:"asc"});
    }
    if(!response){
        res.status(400).send({msg:"No se ha encontrado ningun contacto"});
    }else{
        res.status(200).send({response});
    }
}

async function updateContacto(req,res) {
    const { id } = req.params;
    const contactoData = req.body;
    const guardarUpdate = async () => {
        try {
            await Contacto.findByIdAndUpdate({_id: id}, contactoData);
            res.status(200).send({msg:"Actualizacion correcta"});
        } catch (error) {
            res.status(400).send({msg:"Error al actualizar el contacto"});
        }
    }
    guardarUpdate();
}

async function deleteContacto(req,res) {
    const { id } = req.params;
    const guardarDelete = async () => {
        try {
            await Contacto.findByIdAndRemove({_id: id});
            res.status(200).send({msg:"Se ha eliminado correctamente"});
        } catch (error) {
            res.status(400).send({msg:"Error al eliminar el contacto"});
        }
    }
    guardarDelete();
}

module.exports = {
    createContacto,
    getContactos,
    updateContacto,
    deleteContacto
};