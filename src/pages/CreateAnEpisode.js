import React, { useState } from 'react'
import Header from '../Components/common/Header'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import InputComponent from '../Components/common/Input';
import Buttons from '../Components/common/Buttons';
import FileInput from '../Components/common/Input/FileInput';
import { toast } from 'react-toastify';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

function CreateAnEpisodePage() {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [audiofile, setAudiofile] = useState();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const audioFileHandle = (file) => {
        setAudiofile(file);

    }
    const handleSubmit = async () => {
        setLoading(true);
        if(title,description,audiofile,id){
            try{
                const audioRef = ref(
                    storage,
                    `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
                );
                await uploadBytes(audioRef,audiofile);

                const audioURL = await getDownloadURL(audioRef);
                const episodeData = {
                    title:title,
                    description:description,
                    audiofile:audioURL,
                };
                await addDoc(
                    collection(db,"podcasts",id,"episodes"),
                    episodeData
                );
                toast.success("Success");
                setLoading(false);
                navigate(`podcast/${id}`);
                setTitle("")
                setDescription("")
            }
            catch(e){
                toast.error(e.message);
                setLoading(false);
            }
        }
        else{
            toast.error("Files not present");
            setLoading(false);
        }
    }
    return (
        <div>
            <Header />
            <div className='input-wrapper'>
            <InputComponent state={title} setState={setTitle} placeholder="Title" required={true} type="text" />
            <InputComponent state={description} setState={setDescription} placeholder="Description" required={true} type="text" />
            <FileInput accept={"audio/*"} id="audio-file-input" fileHandleFnc={audioFileHandle} text={"Select Audio"} />
            <Buttons text={loading ? "Loading...":"create Episod"} disabled = {loading} onClick={handleSubmit} />
            
            
            </div>
        </div>
    )
}

export default CreateAnEpisodePage