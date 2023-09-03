import React, { useState, useEffect } from 'react'
import "./Createpost.css"
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Createpost() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const navigate = useNavigate()

  //TOAST Functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  useEffect(() => {
    if (url)
      //save post to mongodb
      fetch("http://localhost:5000/createPost",
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")

          },
          body: JSON.stringify({
            body,
            pic: url
          })
        }
      ).then(res => res.json()).then(data => {
        if (data.error) {
          notifyA(data.error)
        }
        else {
          notifyB("Successfuly Posted")
          navigate("/")
      }
      }).catch(err => console.log(err)) //callback
  }, [url])
  //posting image to cloudinary
  const postDetails = () => {
    console.log(body, image)
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

  const loadfile = (event) => {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src)
    }

  }
  return (
    <div>
      <div className="createPost">
        {/* header  */}
        <div className="post-header">
          <h1>Create New Post</h1>
          <button id='post-btn' onClick={() => { postDetails() }}>Share</button>
        </div>
        {/* image-preview  */}
        <div className="main-div">
          <img id="output" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.QgsAktNpJ5PWjy8RoRBn0QHaHa%26pid%3DApi&f=1&ipt=57266ff7dec7b9f80001ac10b4777fd3f63cbe02990337c416f0bcf27970a2ee&ipo=images" alt="" />
          <input type="file" accept='image/*' onChange={(event) => {

            loadfile(event)
            setImage(event.target.files[0])
          }} />
        </div>
        {/* foter */}
        <div className="details">
          <div className="card-header">
            <div className="card-pic">
              <img src="https://tse3.mm.bing.net/th?id=OIP.HRhauNP6-0u7QagwJu4PCgAAAA&pid=Api&P=0&h=180" alt="" />

            </div><h5>Lavesh</h5>

          </div>
          <textarea value={body} onChange={(e) => {
            setBody(e.target.value)

          }} type="text" placeholder='Write a caption'></textarea>
        </div>
      </div>
    </div>
  )
}
