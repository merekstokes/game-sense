import {db} from '../db.js';
import jwt  from 'jsonwebtoken';

export const getPosts = (req,res) => {
    const q = "SELECT * FROM posts";
    db.query(q, (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const getPost = (req,res) => {
    //SELECT ALL POSTS WHERE THE P.UID = U.ID
    const q = "SELECT p.id, `username`, `title`, `description`, p.image, `date` FROM test.users u JOIN test.posts p ON u.id = p.uid WHERE p.id = ? "

    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json(data[0])
    })
}

export const addPost = (req,res) => {
    //see if logged in 
    const token = req.cookies.access_token
    if(!token){
        return res.status(401).json("Not authenticated")
    }

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err){
            return res.status(403).json("Token is not valid")
        }

        const q = "INSERT INTO posts(`title`, `description`, `image`, `date`, `uid`) VALUES (?)"

        const values = [req.body.title, req.body.description, req.body.image, req.body.date, userInfo.id]

        console.log("values= ", values)

        db.query(q, [values], (err, data) => {
            if(err){
                return res.status(500).json(err)
            } else {
                return res.json("Post has been created")
            }
        })
    }) 
}

export const deletePost = (req,res) => {
    //see if logged in
    const token = req.cookies.access_token
    if(!token){
        return res.status(401).json("Not authenticated")
    }

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err){
            return res.status(403).json("Token is not valid")
        }

        const postId = req.params.id
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"

        db.query(q, [postId, userInfo.id], (err, data) => {
            if(err){
                return res.status(403).json("You can only delete your own posts")
            } else {
                return res.json("Post has been deleted")
            }
        })
    })
}

export const updatePost = (req,res) => {
    //see if logged in 
    console.log("getting to controller")
    const token = req.cookies.access_token
    if(!token){
        return res.status(401).json("Not authenticated")
    }

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err){
            return res.status(403).json("Token is not valid")
        }

    const postId = req.params.id
    const q = "UPDATE test.posts SET `title`=?, `description`=?, `image`=? WHERE `id` = ? AND `uid` = ?"

    const values = [req.body.title, req.body.description, req.body.image]
    console.log("values= ", values)
    console.log("postId= ", postId)
    console.log("userInfo.id= ", userInfo.id)

    //NEED TO MAKE SURE THE USER THAT IS LOGGED IN IS THE ONLY USER THAT CAN EDIT

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
        if(err){
            console.log("stopped at updatePost in post.js")
            console.log(err)
            return res.status(500).json(err)
        } else {
            console.log("successfully updated")
            return res.json("Post has been updated")
        }
        })
    }) 
}