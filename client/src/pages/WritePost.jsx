import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css"
import axios from 'axios';
import moment from 'moment';
import "../styles/WritePost.css"

const WritePost = () => {

    const state = useLocation().state;
    const [description, setDescription] = useState(state ? state.description : "");
    const [title, setTitle] = useState(state ? state.title : "");
    const [image, setImage] = useState(state ? state.image : "");

    const navigate = useNavigate()

    const upload = async () => {
        if(image){
            try {
                const newFormData = new FormData();
                newFormData.append("file", image);
                const res = await axios.post('/upload', newFormData);
                return(res.data)
            } catch (err) {
                console.log('err= ', err)
            }
        } else {
            return("")
        }
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();

        try {
            state
              ? await axios.put(`/posts/${state.id}`, {
                  title: title,
                  description: description,
                  image: imgUrl,
                })
              : await axios.post(`/posts/`, {
                  title: title,
                  description: description,
                  image: imgUrl,
                  date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                });
          } catch (err) {
            console.log("stopped at handle click");
          }
          navigate("/")
    }

    return (
        <div className="WritePost">
            <div className="backToHome"><span onClick={() => navigate(-1)}>{`<`} Back</span></div>
            <div className="WritePost-post">
                {state ? <h1>Edit Post</h1> : <h1>Create New Post</h1>}
                <div className="WritePost-title">
                    <input className="WritePost-titleInput" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="WritePost-editorAndImageContainer">
                    <div className="editorContainer">
                        <ReactQuill 
                            className="editor"
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            placeholder="Type here..."
                        />
                    </div>
                    
                    <div className="WritePost-imageEditorContainer">
                        <div className="WritePost-imageToolbar">
                            <div className="WritePost-uploadImage">
                                <span>{state ? "Change Image: " : "Choose Image: "}</span>
                                <input className="WritePost-chooseFile" type="file" name="" id="file" onChange={(e) => setImage(e.target.files[0])}/>
                            </div>
                        </div>
                        <div className="WritePost-imageContainer">
                            {state ?
                                <img src={`../uploads/${state.image}`} className="WritePost-currentImage" alt="" />
                            :
                                <div className="WritePost-noImageChosen"><span>No Image Chosen</span></div>
                            }
                        </div>
                    </div>
                </div>


                <div className="WritePost-publish">
                    <button className="actionButton saveButton" onClick={handleClick}>{state ? "Save" : "Publish"}</button>
                    <button className="cancelButton" onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default WritePost;