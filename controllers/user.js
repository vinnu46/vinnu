const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const postUserSignUp = async (req, res) => {
    try {
        userData = {
            username: req.body.username,
            name: req.body.name,
            password: req.body.password,
            contactNum: req.body.contactNum,
            address: req.body.address
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).error(err.message)
    }
    
    if (await User.findOne({ where: { username: userData.username }})) {
        console.log('username already present')
        res.json({error: "username already used"})
    }else{
        try {
            const salt = await bcrypt.genSalt();
            userData.password = await bcrypt.hash(req.body.password, salt);
            User.create(userData).then(result => { res.json(result) });
        } catch {
            res.status(500).send();
        }
    }
};


const postUserSignIn = async (req, res) => {
    const user = User.findOne({
        where: {
            username: req.body.username
        }
    }).then(result => {
        if (user == null) return res.send("User not found");
        try {
            if (bcrypt.compare(req.body.password, result.password)) {
                const accessToken = jwt.sign(result.username, process.env.ACCESS_SECRETE_TOKEN);
                res.json({ "accessToken": accessToken });
            }
            else res.send("wrong password");
        } catch {
            res.status(500).send();
        }
    });
};

module.exports = {
    postUserSignUp,
    postUserSignIn
}