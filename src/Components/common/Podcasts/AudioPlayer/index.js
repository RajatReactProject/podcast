import React, { useEffect, useRef, useState } from 'react';
import "./styles.css";
import {FaPlay,FaPause, FaVolumeUp,FaVolumeDown} from "react-icons/fa";

function AudioPlayer({ audioSrc, image }) {
    const audioRef = useRef();
    const [duration, setDuration] = useState("");
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMute, setIsMute] = useState(false);
    const [volume, setVolume] = useState(1);
    const handleVolume = (e) => {
        setDuration(e.target.value);
    }
    const handleDuration = (e) => {
        setDuration(e.target.value);
    }

    const togglePlay = () =>{
        if(isPlaying){setIsPlaying(false);}
        else{
            setIsPlaying(true);
        }
    }
    const toggleMute = () =>{
        if(isMute){setIsMute(false);}
        else{
            setIsMute(true);
        }
    }

    useEffect(() =>{
        if(isPlaying){
            audioRef.current.play();
        }
        else{
            audioRef.current.pause(); 
        }

    },[isPlaying]);

    useEffect(() =>{
        if(!isMute){
            audioRef.current.volume=1;
        }
        else{
            audioRef.current.volume=0;
        }

    },[isMute])


    return (
        <div className='custom-audio-player'>
            <img src={image} className='display-image-player' />
            <audio ref={audioRef} src={audioSrc} />
            <p onClick={togglePlay}>{isPlaying ?<FaPlay />:<FaPause />}</p>
            <div className='duration-flex'>
                <p>0:0</p>
                <input type='range' onChange={handleDuration} className='duration-range' />
                <p>-21:0</p>
                <p onClick={toggleMute}>{isMute ?<FaVolumeDown />:<FaVolumeUp />}</p>
                <input type='range' onChange={handleVolume} className='volume-range' />
            </div>

        </div>
    )
}

export default AudioPlayer;