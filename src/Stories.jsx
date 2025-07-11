import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Stories() {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/story')
      .then(response => response.json())
      .then(data => setStories(data))
      .catch(error => console.error('Error fetching stories:', error));
  }, []);

  const maxId = stories.length > 0 ? Math.max(...stories.map(s => s.id)) : 0;

  const handleStoryClick = (storyId) => {
    const targetPath = `/story/${storyId}/${maxId}`;
    if (window.location.pathname === targetPath) {
      navigate('/', { replace: true });
      setTimeout(() => navigate(targetPath), 0);
    } else {
      navigate(targetPath);
    }
  };

  return (
    <div className='story d-flex'>
      {stories.length > 0 ? (
        stories.map((story) => (
          <div
            key={story.id}
            className='mx-2 d-flex flex-column align-items-center'
            onClick={() => handleStoryClick(story.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className='gradient-border'>
              <img
                src={story.user.profilePic}
                alt="dp"
                className='story-dp rounded-circle'
              />
            </div>
            <p className='text-truncate' style={{ width: '50px' }}>
              {story.user.username}
            </p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Stories;
