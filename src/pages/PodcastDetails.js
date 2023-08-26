import React, { useEffect, useState } from 'react'
import Header from '../Components/common/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { QuerySnapshot, collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import Buttons from '../Components/common/Buttons';
import EpisodeDetails from '../Components/common/Podcasts/EpisodeDetails';

function PodcastDetailsPage() {
    const navigate = useNavigate();
    const [podcast, setPodcast] = useState({});
    const [episodes, setEpisodes] = useState({});
    const { id } = useParams();
    console.log("ID", id);

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);

    const getData = async () => {
        try {
            const docRef = doc(db, "podcasts", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document Data:", docSnap.data());
                setPodcast({ id: id, ...docSnap.data() })
            } else {
                console.log("No Such Podcasts");
                toast.error("No Such Podcasts");
                navigate("/podcasts");
            }
        }
        catch (e) {
            toast.error(e.message);
        }
    };

    useEffect(()=>{
        const unsubscribe = onSnapshot(
            query(collection(db,"podcasts",id,"episodes")),
            (querySnapshot) =>{
                const episodesData = [];
                querySnapshot.forEach((doc) =>{
                    episodesData.push({id:doc.id, ...doc.data()});
                });
                setEpisodes(episodesData);
                console.log(episodes);
            },
            
        );
        return () => {
            unsubscribe();
        }
    },[id]);



    return (
        <div>
            <Header />
            <div className='input-wrapper' style={{marginTop:"0rem"}}>
                {podcast.id &&
                    <div>
                        <div style = {{display:'flex' , justifyContent:"space-between", alignItems:"center"}}>
                            <h2 className='podcast-title-heading'>{podcast.title}</h2>
                            {podcast.createdBy==auth.currentUser.uid &&(<Buttons width = {"300px"} text={"Create Episode"} onClick={()=>{navigate(`/podcast/${id}/create-an-episode`)}}/>)}
                        </div>
                        
                        <div className='banner-wrapper'><img className='podcast-title-heading' src = {podcast.bannerImage} /></div>
                        <p className='podcast-description'>{podcast.description}</p>
                        <h2 className='podcast-title-heading'>Episodes</h2>
                        {episodes.length>0 ? <>{episodes.map((episode,index) =>{
                            return <EpisodeDetails key = {index} index = {index+1} title={episode.title} description={episode.description} audioFile={episode.audiofile} onClick={(file) => console.log("Playing"+file)}/>
                        })}</>:<p>No Episodes</p>}
                        
                    </div>}
            </div>
        </div>
    )
}

export default PodcastDetailsPage;