const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("../utils/jwt")

function register(req,res) {
    const {firstName,lastName,email,password} = req.body;
    if(!email) res.status(400).send({msg:"El email es obligatorio"});
    if(!password) res.status(400).send({msg:"La contrasenia es obligatoria"});

    const user = new User({
        firstName,
        lastName,
        email: email.toLowerCase(),
        role: "user",
        active: true,
    });
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password,salt);
    user.password = hashPassword;
    const saveUser = async () => {
        try{
            await user.save();
            res.status(200).send({
                msg:"Creado correctamente",
                status:200
            });
            } 
        catch(err){
            res.status(400).send({
                msg:"Error al crear usuario",
                status:400
            });
            console.log('Error de servidor', err);
        }
    }
    saveUser();
}

function login (req,res){
    const {email, password} = req.body
    if(!email) res.status(400).send({msg:"El email es obligatorio"})
    if(!password) res.status(400).send({msg:"La contrasenia es obligatoria"})
    const emailLowerCase = email.toLowerCase();
    const response = async () => { 
        try {
            const user = await User.findOne({email:emailLowerCase});
            bcrypt.compare(password, user.password, (bcryptError,check) =>{
                if(bcryptError){
                    res.status(500).send({
                        msg:"Error del servidor",
                        status:500
                    });
                }else if(!check) {
                    res.status(400).send({
                        msg:"Error de servidor al login",
                        status: 400
                    });
                }else if(!user.active){
                    res.status(401).send({
                        msg:"Usuario no autorizado",
                        status: 401
                    });
                }else {
                    res.status(200).send({
                        access:jwt.createAccessToken(user),
                        refresh:jwt.createRefechToken(user),
                        status: 200
                    });
                }
            })
        } catch(err) {
            res.status(500).send({msg:"Error de servidor"});
            console.log('Error de servidor',err);
        }
    }
    response();
}

function refreshAccessToken(req,res) {
    const { token } = req.body;
    if(!token){
        res.status(400).send({msg:"Token requerido"});
    }
    const{ user_id } = jwt.decoded(token);
    const user = User.findOne({ _id: user_id });
    if(user){
        res.status(200).send({
            accessToken: jwt.createAccessToken(user),
        });
    } else {
        res.status(500).send({msg:"Error del servidor"});
    }
}

module.exports = { 
    register,
    login,
    refreshAccessToken
};