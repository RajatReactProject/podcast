import React, { useEffect, useState } from 'react'
import Header from '../Components/common/Header'
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { setPodcasts } from '../slices/podcastSlice';
import { db } from '../firebase';
import PodcastCard from '../Components/common/Podcasts/PodcastsCard';
import InputComponent from '../Components/common/Input';

function PodcastsPage() {
  const[search,setSearch] = useState("");
    const dispatch = useDispatch();
    const podcasts = useSelector((state) =>state.podcasts.podcasts);
    useEffect(() => {
            const unsubscribe = onSnapshot(
              query(collection(db, "podcasts")),
              (querySnapshot) => {
                const podcastsData = [];
                querySnapshot.forEach((doc) =>{
                    podcastsData.push({id:doc.id, ...doc.data()});
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
        console.log(podcasts);
        var filteredPodcasts = podcasts.filter((item) =>item.title.trim().toLowerCase().includes(search.trim().toLowerCase()));
      

    return (
        <div>
            <Header />
            <div className='input-wrapper'>

                <h1 style={{marginTop: '1rem'}}>Discover Podcast</h1>
                <InputComponent state={search} setState={setSearch} placeholder="Search By Title" type="text" />
            
                {filteredPodcasts.length> 0 ? (
                <div className='podcasts-flex'>
                  {filteredPodcasts.map((item)=>{
                    console.log("Item",item.id);
                    return <div>
                        <PodcastCard key = {item.id} id={item.id} title= {item.title} displayImage={item.displayImage}/>
                        
                    </div>;
                })}
                </div>
            ):<p>{search?"Podcasts Not Found" : "Podcasts Not Available"}</p>}
            </div>
        </div>
    )
}

export default PodcastsPage