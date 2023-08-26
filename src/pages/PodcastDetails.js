import React, { useEffect, useState } from 'react'
import Header from '../Components/common/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import Buttons from '../Components/common/Buttons';

function PodcastDetailsPage() {
    const navigate = useNavigate();
    const [podcast, setPodcast] = useState({});
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



    return (
        <div>
            <Header />
            <div className='input-wrapper' style={{marginTop:"0rem"}}>
                {podcast.id &&
                    <div>
                        <div style = {{display:'flex' , justifyContent:"space-between", alignItems:"center"}}>
                            <h2 className='podcast-title-heading'>{podcast.title}</h2>
                            {podcast.createdBy==auth.currentUser.uid &&(<Buttons width = {"300px"} text={"Create Episode"} onClick={()=>{navigate(`/podcast/${id}/create-episode`)}}/>)}
                        </div>
                        
                        <div className='banner-wrapper'><img className='podcast-title-heading' src = {podcast.bannerImage} /></div>
                        <p className='podcast-description'>{podcast.description}</p>
                        <h2 className='podcast-title-heading'>Episodes</h2>
                        
                    </div>}
            </div>
        </div>
    )
}

export default PodcastDetailsPage;