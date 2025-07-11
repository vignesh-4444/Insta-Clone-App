import React, { useEffect, useState } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className='d-flex justify-content-center'>
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div className='my-3' key={post.id} >
              <div className='d-flex'>
                <img className=" dp rounded-circle"src={post.user.profilePic} alt={post.user.username} />
                <h5>{post.user.username}</h5>
              </div>
              <img className='image' src={post.imageUrl} alt="image" />
            <div className="d-flex align-items-center gap-3">
              <span className="d-flex align-items-center gap-0">
                <i className="bi bi-heart m-0 p-0"></i>
                <b className="m-0 p-0">{post.likesCount}</b>
              </span>
              <i className="bi bi-chat"></i>
              <i className="bi bi-send"></i>
            </div>

              <p>{post.caption}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading posts...</div>
      )}
    </div>
  );
}

export default Posts;
