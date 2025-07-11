import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function ViewStory() {
  const { id, tot } = useParams();
  const [story, setStory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (Number(id) <= 0 || Number(id) > Number(tot)) {
      console.error('Invalid ID, redirecting to home');
      navigate('/');
    }
  }, [id, tot, navigate]);

  useEffect(() => {
    fetch(`http://localhost:5000/story/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Story not found');
        }
        return response.json();
      })
      .then(data => setStory(data))
      .catch(error => {
        console.error('Error fetching story:', error);
        navigate('/');
      });
  }, [id, navigate]);

  return (
    <div>
      {story ? (
        <div className="d-flex justify-content-center align-items-center">
          {/* Left Arrow */}
          {Number(id) > 1 && (
            <Link to={`/story/${Number(id) - 1}/${tot}`}>
              <i className="bi bi-arrow-left-circle-fill fs-1 mx-3"></i>
            </Link>
          )}

          {/* Story Image */}
          <img className="vh-100" src={story.imageUrl} alt="story" />

          {/* Right Arrow */}
          {Number(id) < Number(tot) && (
            <Link to={`/story/${Number(id) + 1}/${tot}`}>
              <i className="bi bi-arrow-right-circle-fill fs-1 mx-3"></i>
            </Link>
          )}
        </div>
      ) : (
        <p>Loading story...</p>
      )}
    </div>
  );
}

export default ViewStory;
