import React, { useState } from 'react'
import InputComponent from '../common/Input'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Buttons from '../common/Buttons';
import FileInput from '../common/Input/FileInput';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

function CreatePodcastForm() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [displayImage, setDisplayImage] = useState();
    const [bannerImage, setBannerImage] = useState();
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async () => {
        if (title && desc && displayImage && bannerImage) {
            setLoading(true);
            try {
                const bannerImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`);
                const uploaded = await uploadBytes(bannerImageRef, bannerImage);
                const bannerImageUrl = await getDownloadURL(bannerImageRef);
                
                const displayImageRef = ref(storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(displayImageRef, displayImage);
                const displayImageUrl = await getDownloadURL(displayImageRef);

                const podcastData = {
                    title:title,
                    description:desc,
                    bannerImage: bannerImageUrl,
                    displayImage:displayImageUrl,
                    createdBy: auth.currentUser.uid,
                }
                const docRef = await addDoc(collection(db,"podcasts"),podcastData);
                setTitle("");
                setDesc("");
                setBannerImage(null);
                setDisplayImage(null);
                toast.success("Podcast Created");
                setLoading(false);
                
            }
            catch (e) {
                console.log(e);
                toast.error(e.message);
                setLoading(false);
            }

        }
        else {
            toast.error("Please fill all the fields");
            setLoading(false);
        }
    }
    const displayImageHandle = (file) => {
        setDisplayImage(file);
    }
    const bannerImageHandle = (file) => {
        setBannerImage(file);
    }
    return (
        <div className='input-wrapper'>
            <InputComponent state={title} setState={setTitle} placeholder="Title" required={true} type="text" />
            <InputComponent state={desc} setState={setDesc} placeholder="Description" required={true} type="text" />
            <FileInput accept={"image/*"} id={"display-image-input"} fileHandleFnc={displayImageHandle} text="Upload Display Image" />
            <FileInput accept={"image/*"} id={"banner-image-input"} fileHandleFnc={bannerImageHandle} text="Upload Banner Image" />

            <Buttons text={loading ? "Loading.." : "Create Podcast"} onClick={handleSubmit} />



        </div>
    )
}

export default CreatePodcastForm