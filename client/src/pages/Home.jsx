import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser';
import "../styles/App.css"

const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                 const res = await axios.get("/posts")
                 setPosts(res.data)
            } catch(err) {
                console.log(err)
            }
        };
        fetchData();
    })

    const getText = (html) => {
        return(parse(html))
      }

    return (
        <div className='home'>
            <div className="homeInner">
                <div className='posts'>
                    {posts.map(post => {
                        return(
                            <div className="post" key={post.id}>
                                <div className="postNav">
                                    <Link to={`/posts/${post.id}`}>
                                        <h2 className='title'>{post.title}</h2>
                                    </Link>
                                    <div>Posted by: {post.uid}</div>
                                </div>
                                <div className="postBody">
                                    <div className="postImageContainer">
                                        {}
                                        <img src={`../uploads/${post.image}`} className='postImage' alt=''/>
                                    </div>
                                    <div className="descriptionBlock">
                                        <div className="description">{getText(post.description)}</div>
                                        <div className="readMoreButtonContainer">
                                            <Link to={`/posts/${post.id}`} className="readMoreButton">Read More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home;