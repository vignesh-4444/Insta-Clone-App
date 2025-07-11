import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Suggestions() {

   const [profile, setProfile] = useState(null);
   const [suggestions, setSuggestions] = useState([]);

   useEffect(() => {

     fetch('http://localhost:5000/profile')
       .then(response => response.json())
       .then(data => setProfile(data))
       .catch(error => console.error('Error fetching profile:', error));

    fetch('http://localhost:5000/suggestions')
       .then(response => response.json())
       .then(data => setSuggestions(data))
       .catch(error => console.error('Error fetching suggestions:', error));   

   },[]);

   const handleFollow = async (id,username) => {
      axios.post('http://localhost:5000/followers', {"id":id, "username":username })
        .then(() => alert(`You followed ${username}`))
        .catch(err => console.error("Error following user:", err));
   }


  return (
    <div>
        <div className='suggestions w-75 m-4'>
        {profile ?
        <div className='d-flex'>
                <img className=" dp rounded-circle"src={profile.profilePic} alt={profile.username} />
                <h5>{profile.username}</h5>
                <p className='ms-auto text-primary'>Switch</p>
          </div>
          : <small>Loading Profile...</small>}

          <div className='d-flex'>
            <p>Suggested for you</p>
            <b className='ms-auto'>See All</b>
          </div>

                {suggestions.length > 0 ? (
              <div>
                {suggestions.map((suggestion) => (
                  <div className='my-2' key={suggestion.id} >
                     <div className='d-flex'>
                      <img className=" dp rounded-circle"src={suggestion.profilePic} alt={suggestion.username} />
                      <h5>{suggestion.username}</h5>
                      <button className='border-0 bg-transparent text-primary p-0 ms-auto' onClick={()=>{handleFollow(suggestion.id,suggestion.username)}}>Follow</button>
                    </div>
                  </div>
                ))}
        </div>
      ) : (
        <div>Loading ...</div>
      )}

        </div>
    </div>
  )
}

export default Suggestions