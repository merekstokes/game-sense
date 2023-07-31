import React, {useState, useEffect, useContext} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import parse from 'html-react-parser';
import { AuthContext } from '../context/authContext';
import "../styles/SinglePost.css"

const SinglePost = () => {

    const [post, setPost] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const postId = location.pathname.split("/")[2];
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${postId}`);
                setPost(res.data);
            } catch(err) {
                console.log(err)
            }
        };
        fetchData()
    }, [postId])

    const handleDelete = async ()=>{
      try {
        await axios.delete(`/posts/${postId}`);
        navigate("/")
      } catch (err) {
        console.log(err);
      }
    }

    const getText = (html) => {
      return(html ? parse(html) : html)
    }

    return (
      <div className="singlePost">
        <div className="backToHome"><span onClick={() => navigate(-1)}>{`<`} Back to Home</span></div>
        <div className="SinglePost-post" key={post.id}>
          <div className="SinglePost-postNav">
            <div className="SinglePost-titleAndEditContainer">
              <Link to={`/posts/${post.id}`}>
                  <h1 className='SinglePost-title'>{post.title}</h1>
              </Link>
              {currentUser && currentUser.username === post.username ?
                <div className='SinglePost-editDelete'>
                  <Link to={`/writePost?edit=${post.id}`} className="SinglePost-editPost actionButton" state={post}>Edit</Link>
                  <span className="cancelButton" onClick={handleDelete}>Delete</span>
                </div>
                :
                  ""
                }
            </div>  
            <div>Posted by: {post.username}</div>
          </div>
          <div className="SinglePost-postBody">
              <div className="SinglePost-postImageContainer">
                  <img src={`../uploads/${post.image}`} className='SinglePost-postImage' alt=''/>
              </div>
              <div className="SinglePost-descriptionBlock">
                  <div className="SinglePost-description">{getText(post.description)}</div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default SinglePost;