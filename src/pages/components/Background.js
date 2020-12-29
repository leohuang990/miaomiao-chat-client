import React from 'react';
import {FaArrowAltCircleLeft} from 'react-icons/fa'


function Background({back, setBackground}) {
    const bg_photo = ['Aurora', 'Bridge', 'City', 'Forest', 'Prairie', 'Road', 'Sakura', 'Sea'];

    return (
        <div style={{width: '100%', height: '100%', overflow: 'scroll'}}>
            <button style={{background: 'transparent', fontSize:'32px', marginLeft: '10px'}} className='chat-btn' onClick={back}><FaArrowAltCircleLeft/></button>
            <div style={{height: '90%', width: '80%', marginTop: '2%', marginLeft: '10%'}}>
                {bg_photo.map(photo=>(<div key={photo} style={{width: '100%', marginBottom: '20px'}}>
                    <button className='bg-btn' onClick={()=>{setBackground(photo)}} 
                    id={photo}></button>
                    <h5 style={{margin:"auto", textAlign: 'center'}}>{photo}</h5>
                </div>))}
            </div>
        </div>
    );
}

export default Background;