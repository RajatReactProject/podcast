import React, { useEffect } from 'react'
import Header from '../Components/common/Header'
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { setPodcasts } from '../slices/podcastSlice';
import { db } from '../firebase';

function PodcastsPage() {
    const dispatch = useDispatch();
    const podcasts = useSelector((state) =>state.podcasts.podcasts);
    useEffect(() => {
            const unsubscribe = onSnapshot(
              query(collection(db, "podcasts")),
              (querySnapshot) => {
                const podcastsData = [];
                querySnapshot.forEach((doc) =>{
                    podcastsData.push({d:doc.id, ...doc.data()});
                });
                dispatch(setPodcasts(podcastsData));
              },
              (error) => {
                console.log(error);
              }
            );
            return () => {
              unsubscribe();
            }; 
        },[dispatch]);
      

    return (
        <div>
            <Header />
            <div className='input-wrapper'>

                <h1 style={{marginTop: '1rem'}}>Discover Podcast</h1>
                {podcasts.length>0?<p>Podcasts Found</p>:<p>No Podcast Found</p>}
            </div>
        </div>
    )
}

export default PodcastsPage