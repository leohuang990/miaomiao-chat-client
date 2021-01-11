import React from 'react';
import {FaArrowAltCircleLeft} from 'react-icons/fa'


function Background({back, setBackground, language}) {
    const bg_photo = ['Aurora', 'Bridge', 'City', 'Forest', 'Prairie', 'Road', 'Sakura', 'Sea'];
    function tr(str){
        if(str==='Aurora') return 'オーロラ'
        if(str==='Bridge') return 'レインボーブリッジ'
        if(str==='City') return 'シティ'
        if(str==='Forest') return '森林'
        if(str==='Prairie') return '草原'
        if(str==='Road') return 'ロード'
        if(str==='Sakura') return '桜'
        return '海'
    }
    return (
        <div style={{width: '100%', height: '100%', overflow: 'scroll'}}>
            <button style={{background: 'transparent', fontSize:'32px', marginLeft: '10px'}} className='chat-btn' onClick={back}><FaArrowAltCircleLeft/></button>
            <div style={{height: '90%', width: '80%', marginTop: '2%', marginLeft: '10%'}}>
                {bg_photo.map(photo=>(<div key={photo} style={{width: '100%', marginBottom: '20px'}}>
                    <button className='bg-btn' onClick={()=>{setBackground(photo)}} 
                    id={photo}></button>
                    <h5 style={{margin:"auto", textAlign: 'center'}}>{language==='English'?photo:tr(photo)}</h5>
                </div>))}
            </div>
        </div>
    );
}

export default Background;