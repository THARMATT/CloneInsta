import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function ProfilePic({ handleChangeProfile }) {
  const navigate = useNavigate();
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")

  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)
  const hiddenFileInput = useRef(null)
  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  const postDetails = () => {

    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "instaclone")
    data.append("cloud_name", "nigam-cloud")
    fetch("https://api.cloudinary.com/v1_1/nigam-cloud/image/upload", {
      method: "POST",
      body: data
    }).then(res => res.json())
      .then(data => setUrl(data.url))
      .catch(err => console.log(err))


  }

  const postPic = () => {
    fetch("http://localhost:5000/uploadprofilepic",
      {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")

        },
        body: JSON.stringify({

          pic: url
        })
      }
    ).then(res => res.json()).then(data => {
      handleChangeProfile();
      window.location.reload();
      navigate('/profile')
      
      console.log(data)
    }).catch(err => console.log(err))
  }


  useEffect(() => {
    if (url) {
      postPic();
    }
  }, [url])


  useEffect(() => {
    if (image) {
      postDetails()
    }
  }, [image])
  return (
    <div>
      <div className="ProfilePic darkBg">
        <div className="changePic centered">
          <div>
            <h2>Change Profile Pic</h2>
          </div>

          <div style={{ borderTop: "1px solid #00000030" }}>
            <button className="upload-btn" onClick={handleClick} >Upload Photo</button>
            <input type="file" ref={hiddenFileInput} accept="image/*" style={{ display: "none" }}
              onChange={(e) => { setImage(e.target.files[0]) }} />
          </div>

          <div style={{ borderTop: "1px solid #00000030" }}>
            <button className="remove-btn">Remove Photo</button>
          </div>
          <div style={{ borderTop: "1px solid #00000030" }}>
            <button onClick={handleChangeProfile} className='cancel-pic-btn'>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
