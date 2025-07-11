import React, { useState, useEffect } from 'react'
import axios from 'axios'


function Profile() {

    const [profile, setProfile] = useState(null);

    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/profile')
            .then(data => {setProfile(data.data)})
            .catch(err => console.error("Error fetching profile:", err));

        axios.get('http://localhost:5000/followers')
            .then(data => {setFollowers(data.data)})
            .catch(err => console.error("Error fetching followers:", err));        

        }, []);   
        
        
function handleChange(e) {
    setProfile(prev => ({
        ...prev,
        [e.target.name]: e.target.value

    }))
}

    const handleUpdate =  async ()=> {
        axios.put('http://localhost:5000/profile', profile)
        .then(console.log("Profile updated"))
        .catch(err => console.error("Error updating profile:", err));
        
    }

    const handleUnfollow = async (id) => {
        axios.delete(`http://localhost:5000/followers/${id}`)
            .then(() => {
            setFollowers(prev => prev.filter(follower => follower.id !== id));
            alert("Unfollowed successfully");
            })
            .catch(err => console.error("Error unfollowing user:", err));
        };

    
  return (
    <div className='m-5'>
        {profile ? (
            <div>
                <img src={profile.profilePic} className='profile rounded-circle'/>
                <h5>{profile.username}</h5>

                <input type="text" 
                    value={profile.username}
                    name='username'
                    className='form-control my-4'
                    onChange={handleChange}
                
                />

                <input type="text" 
                    value={profile.profilePic}
                    name='profilePic'
                    className='form-control'
                    onChange={handleChange}
                
                />

                <button className='btn btn-primary my-4' onClick={handleUpdate}>Update Profile</button>

            </div>      
        ): (
            <div>
                Loading profile...
            </div>
        )}

        {followers.length > 0 ? (
            followers.map(follower => (
                <div key={follower.id} className='d-flex my-2' >
                    {follower.username}
                    <button className='border-0 bg-transparent text-primary p-0 ms-auto' onClick={() => {handleUnfollow(follower.id)}}>Unfollow</button>
                    </div>
            ))
        ):(
            <div>
                No followers found.
            </div>

        )}

    </div>
  )
}

export default Profile