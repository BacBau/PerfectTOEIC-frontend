import React, {useState} from "react";
import {useQuill} from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import {Button, Container} from "@mui/material";
import {Input, Select} from "antd";
import dataService from "../../../Network/dataService";
import {initializeApp, getApp} from "firebase/app";
import {getStorage, ref, uploadBytes} from "firebase/storage";

function HtmlEditor(props) {
    const firebaseConfig = {
        apiKey: "AIzaSyDL6c_mvMpdgLBges-OqrPlNNsmutrKM6Q",
        authDomain: "toeic-778af.firebaseapp.com",
        projectId: "toeic-778af",
        storageBucket: "toeic-778af.appspot.com",
        messagingSenderId: "353008574873",
        appId: "1:353008574873:web:15d81b8066c2b00b757308",
        measurementId: "G-5MDLF4HY7D"
    };

    const app = initializeApp(firebaseConfig);

    const firebaseApp = getApp();

    const storage = getStorage(firebaseApp, "gs://toeic-778af.appspot.com");

    const {quill, quillRef} = useQuill();

    const [value, setValue] = useState();

    const [title, setTitle] = useState(props.objectPost !== undefined ? props.objectPost.title : "");

    const [description, setDescription] = useState(props.objectPost !== undefined ? props.objectPost.description : "");

    const [selectedImage, setSelectedImage] = useState(props.objectPost !== undefined ? props.objectPost.previewImageUrl : "");

    const [typeSearch, setTypeSearch] = useState(props.objectPost !== undefined ? props.objectPost.type : (initialType) => {
        initialType = window.location.pathname;
        switch (initialType) {
            case '/vocabulary/introduce':
                return "BLOG";
            case '/tips/listening':
                return "LISTENING_TIP";
            case '/tips/reading':
                return "READING_TIP";
            default:
                return "BLOG";
        }
    });

    React.useEffect(() => {
        if (quill) {
            if (props.objectPost !== undefined) {
                const html = props.objectPost.html;
                const delta = quill.clipboard.convert(html);
                quill.setContents(delta);
                setValue(quillRef.current.firstChild.innerHTML);
            }
            quill.on('text-change', () => {
                console.log(quillRef.current.firstChild.innerHTML);
                setValue(quillRef.current.firstChild.innerHTML)
            });
        }
    }, [quill]);
    const handleDescription = (event) => {
        setDescription(event);
    }

    const handleTitle = (event) => {
        setTitle(event);
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handleImage = async (event) => {
        let base64
        convertBase64(event).then((value) => {
            base64 = value;
        }).catch((error) => {
            console.log(error)
        })
        const storageRef = ref(storage, event.name);
        const metadata = {
            contentType: 'image/jpeg',
        };
        await uploadBytes(storageRef, event, metadata).then((snapshot) => {
            console.log('Uploaded image');
        });
        setSelectedImage("https://firebasestorage.googleapis.com/v0/b/toeic-778af.appspot.com/o/" + event.name + "?alt=media")
    }

    console.log(props.objectPost);

    const onSubmit = async () => {
        let pathname = window.location.pathname;
        let type;
        if (props.isSearch) {
            type = typeSearch
        } else {
            switch (pathname) {
                case '/vocabulary/introduce':
                    type = 'BLOG';
                    break;
                case '/tips/listening':
                    type = 'LISTENING_TIP';
                    break;
                case '/tips/reading':
                    type = 'READING_TIP';
                    break;
            }
        }
        try {
            let result
            if (props.objectPost !== undefined) {
                result = await dataService.putContent({
                    id: props.objectPost.id,
                    html: value,
                    content: "",
                    type: type,
                    title: (title !== undefined || true) ? title : props.objectPost.title,
                    previewImageUrl: (selectedImage !== undefined || true) ? selectedImage : props.objectPost.previewImageUrl,
                    description: (description !== undefined || true) ? description : props.objectPost.description
                });
            } else {
                result = await dataService.postContent({
                    html: value,
                    content: "",
                    type: type,
                    title: title,
                    previewImageUrl: selectedImage,
                    description: description
                });
            }
            console.log(result)
            alert("Success!")
            window.location.reload();
        } catch (error) {
            alert(error)
        }

    }

    const handleTypeSearch = (event) => {
        setTypeSearch(event.target.value);
    }

    console.log(value)
    console.log(title)
    console.log(description)
    console.log(selectedImage)
    console.log(typeSearch)

    return (
        <>
            <Container fixed>
                <div style={{marginBottom: '2rem'}}>
                    TITLE: <Input value={title} onChange={event => handleTitle(event.target.value)}></Input>
                </div>
                <div style={{marginBottom: '2rem'}}>
                    Description: <Input value={description}
                                        onChange={event => handleDescription(event.target.value)}></Input>
                </div>
                <div style={{marginBottom: '2rem'}}>
                    TYPE:
                    <select style={{marginLeft: "1rem"}} value={typeSearch} onChange={handleTypeSearch}>
                        <option value="BLOG">Vocabulary</option>
                        <option value="LISTENING_TIP">Listening Tips</option>
                        <option value="READING_TIP">Reading Tips</option>
                    </select>
                </div>
                <div style={{marginBottom: '2rem'}}>
                    {(selectedImage) ? (
                            <div className="handleimage">
                                <img
                                    alt="not found"
                                    width={"250px"}
                                    src={selectedImage.toString()}
                                />
                                <br/>
                                <Button style={{fontWeight: 'Bold'}} onClick={() => setSelectedImage(null)}>x</Button>
                            </div>
                        ) :
                        (<>
                            Image: <input
                            type="file"
                            name="myImage"
                            onChange={(event) => {
                                handleImage(event.target.files[0]);
                            }}
                        />
                        </>)}
                </div>
            </Container>
            <Container fixed>
                <div ref={quillRef}/>
                <Button onClick={onSubmit} style={{width: '100%'}}>DONE</Button>
            </Container>
        </>
    );
}

export default HtmlEditor;