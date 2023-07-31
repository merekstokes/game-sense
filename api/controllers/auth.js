import {db} from "../db.js";
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
    //Check existing users

    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username, req.body.password], (err,data) => {
        if(err) return res.json(err)
        if(data.length){
            console.log("User already exists!")
            return res.status(409).json("User already exists!")
        } 

        // can hash the password here

        const q = "INSERT INTO users(`username`, `password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.password
        ]

        db.query(q,[values], (err,data) => {
            if(err){
                console.log("New user, but error")
                return res.json(err)
            }
            else{
                console.log("User has been created.")
                return res.status(200).json("User has been created.")
            }
        })
    })
}

export const login = (req, res) => {
    //CHECK IF USER EXISTS
    const q = "SELECT * FROM users WHERE username = ?"

    //FIRST CHECK IF THE USERNAME GIVEN MATCHES ANY USERNAMES IN THE DATABASE
    db.query(q, req.body.username, (err, data) => {
        if (err){
            return res.json(err)
        }
        if(data.length === 0){
            return res.status(404).json("User not found")
            console.log("User not found")
        }

        //If we have the password hashed, checking the password is at 1:21:00
        //CHECK IF THE PASSWORD MATCHES
        if(!data[0].password === req.body.password)
            return res.status(400).json("Wrong username or password")

        const token = jwt.sign({id:data[0].id}, "jwtkey")
        const {password, ...other} = data[0]

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other);
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure:true
    }).status(200).json("User has been logged out")
}