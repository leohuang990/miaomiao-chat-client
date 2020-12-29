import React from 'react';
import {FaArrowAltCircleLeft, FaEdit} from 'react-icons/fa'

function Card({back}) {
    return (
        <div onMouseMove={(e)=>{
            let x = (window.innerWidth/2+180-e.pageX)/10;
            let y = (window.innerHeight/2-e.pageY)/10;
            document.getElementById('card').style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
        }} 
        onMouseLeave={(e)=>{
            
            document.getElementById('card').style.transform = `rotateY(${0}deg) rotateX(${0}deg)`
        }}
        style={{display: 'flex', flexDirection: 'column', height: '100%', perspective: '1000px'}}>
            <div id='card' style={{margin: 'auto', height: '90%', width: '80%',border: 'white 1px solid'}}>
                <button style={{background: 'transparent', fontSize:'32px', marginLeft: '10px'}} className='chat-btn' onClick={back}><FaArrowAltCircleLeft/></button>
                <button style={{background: 'transparent', fontSize:'32px', marginRight: '10px', float: 'right'}} className='chat-btn' onClick={()=>{ alert('a')}}><FaEdit/></button>
                <div style={{margin: 'auto', width: '100px', height: '100px', background: 'yellow', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '50%'}}></div>
                <h5 style={{margin: 'auto', textAlign: 'center', marginTop: '25px'}}>user name</h5>
                <h5 style={{margin: 'auto', textAlign: 'center', marginTop: '25px'}}>email address</h5>
                <p style={{margin: 'auto', textAlign: 'center', paddingTop: '50px'}}>
                    I am who I am. It is what it is.
                </p>
            </div>
        </div>
    );
}

export default Card;