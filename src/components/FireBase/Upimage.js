
import { useState, useEffect } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
import axios from "axios";
function UploadImage() {
    const[imageUpload, setImageUpload] = useState(null)
    const imageListRef = ref(storage, "images/")
    const [imageList, setImageList] = useState([])

    const [user, setUser] = useState([]);
    const uploadImage = () => {
        if (imageUpload == null) return;
        const urls = `images/${imageUpload.name + v4()}`;
        const imageRef = ref(storage, urls);
        uploadBytes(imageRef, imageUpload).then(() => {
            getDownloadURL(imageRef).then((url) => {
                axios.put(`http://localhost:8080/api/users/${user.id}/uploadImage`, {
                    userId: user.id,
                    image: url
                }).then(() => {
                    alert("Image Uploaded");
                }).catch((error) => {
                    console.error("Error uploading image URL:", error);
                    alert("Error uploading image URL");
                });
                alert("Image Uploaded");
            });
        })
    }
    useEffect(() => {
        const userdata = localStorage.getItem("user");
        console.log(JSON.parse(userdata));
        setUser(JSON.parse(userdata))
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => (
                        [...prev, url]
                    ))
                })
            })
        })
    }, [])
   return (
    <div className="App">
      <input type="file" onChange={(e) => {setImageUpload((e.target.files[0]))}}/>
        <button onClick={uploadImage}> Upload Image</button>

        <div>
            {imageList.map((url, index) => {
                    return <img src={url}/>
            })}
        </div>
    </div>

  );
}

export default UploadImage;
