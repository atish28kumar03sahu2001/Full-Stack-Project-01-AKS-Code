// backend/controller/index.js
import { Users } from "../models/index.js";

export const createUser = async (req, res) => {
    try {
        const {username, usermail, userphone, userdate, usergender, usertype, userdetail } = req.body;
        const userimage = req.file.buffer;

        const newUser = new Users({username, usermail, userphone, userdate, usergender, usertype, userdetail, userimage});
        
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        
        const usersWithBase64Images = users.map(user => ({
            ...user._doc,
            userimage: user.userimage ? user.userimage.toString('base64') : null
        }));

        res.status(200).json(usersWithBase64Images);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await Users.findByIdAndDelete(id);

        if(user) {
            res.status(200).json({ message: "User Deleted Successfully" });
        } else {
            res.status(404).json({ message: "User Not Found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
}
export const patchUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {username, usermail, userphone, userdate, usergender, usertype, userdetail} = req.body;
        const userimage = req.file ? req.file.buffer : null;

        const user = await Users.findById(id);
        if(!user) {
            return res.status(404).json({ message: "User Not Found!" });
        }
        user.username = username || user.username;
        user.usermail = usermail || user.usermail;
        user.userphone = userphone || user.userphone;
        user.userdate = userdate || user.userdate;
        user.usergender = usergender || user.usergender;
        user.usertype = usertype || user.usertype;
        user.userdetail = userdetail || user.userdetail;
        if(userimage) {
            user.userimage = userimage;
        }
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error("Error Updating User:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}