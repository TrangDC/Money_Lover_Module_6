import {useState, useEffect} from "react";
import {storage} from "./firebase";
import {ref, uploadBytes, listAll, getDownloadURL} from "firebase/storage";
import {v4} from 'uuid';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import {useToast} from "@chakra-ui/react";

function UploadImage() {
    const [imageUpload, setImageUpload] = useState(null)
    const imageListRef = ref(storage, "images/")
    const [imageList, setImageList] = useState([])
    const navigate = useNavigate();
    const toast = useToast();
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
                    toast({
                        title: 'Update success!',
                        description: 'You successfully update a image!',
                        status: 'success',
                        duration: 1500,
                        isClosable: true,
                    });
                }).catch((error) => {
                    console.error("Error uploading image URL:", error);
                    toast({
                        title: 'Update Failed',
                        description: 'Error: Error uploading image!',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                });
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

    const [images, setImage] = useState("")

    const users = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        axios.get('http://localhost:8080/api/users/' + users.id)
            .then(res => {
                console.log(res.data);
                setImage(res.data.image);
            })
            .catch(err => console.error(err))
    },)
    return (
        // <div>
        //     <img src={images}/>
        // </div>
        //
        // <div style={{margin: "50px 20px"}}>
        //     <input type="file" onChange={(e) => {setImageUpload((e.target.files[0]))}}/>
        //     <button onClick={uploadImage} type="button" className="btn btn-primary" data-mdb-ripple-init>Upload Image</button>
        // </div>

        <div>
            <Modal.Header closeButton>
                <Modal.Title>Update Avatar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Image  style={{width: '100px', height: '100px',margin: 'auto'}} roundedCircle src={images}/>
                </div>
                <div style={{margin: "50px 20px"}}>
                    <input type="file" onChange={(e) => {
                        setImageUpload((e.target.files[0]))
                    }}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={uploadImage}
                        type="button"
                        className="btn btn-primary"
                        data-mdb-ripple-init>Upload Image</Button>

            </Modal.Footer>
        </div>
    );
}

export default UploadImage;