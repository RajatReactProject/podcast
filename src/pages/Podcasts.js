import React, { useEffect } from 'react'
import Header from '../Components/common/Header'
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { setPodcasts } from '../slices/podcastSlice';
import { db } from '../firebase';

function PodcastsPage() {
    
      

    return (
        <div>
            <Header />
            <div className='input-wrapper'>

                <h1 style={{marginTop: '1rem'}}>Discover Podcast</h1>
                
            </div>
        </div>
    )
}

export default PodcastsPage