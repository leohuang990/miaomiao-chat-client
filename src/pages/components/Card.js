import React from 'react';
import {FaArrowAltCircleLeft, FaEdit, FaUserSlash} from 'react-icons/fa'
import defaultImg from '../others/default.jpg'


function Card({back, setCard, icon, description, name, email, unfriend}) {
    const url = 'https://miaomiao-server.herokuapp.com/image/' + icon;
    return (
        <div onMouseMove={(e)=>{
            let x = (window.innerWidth/2+180-e.pageX)/10*(-1);
            let y = (window.innerHeight/2-e.pageY)/10;
            document.getElementById('card').style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
        }} 
        onMouseLeave={(e)=>{
            
            document.getElementById('card').style.transform = `rotateY(${0.1}deg) rotateX(${0}deg)`
        }}
        style={{display: 'flex', flexDirection: 'column', height: '100%', perspective: '1000px'}}>
            <div id='card' style={{margin: 'auto', height: '90%', width: '80%',border: 'white 1px solid'}}>
                <button style={{background: 'transparent', fontSize:'32px', marginLeft: '10px'}} className='chat-btn' onClick={back}><FaArrowAltCircleLeft/></button>
                {setCard?(<div>
                    <button style={{background: 'transparent', fontSize:'32px', marginRight: '10px', float: 'right', position: 'relative', top:'-45px'}} className='chat-btn' onClick={()=>{ setCard()}}><FaEdit/></button>
                </div>):
                    <button style={{background: 'transparent', fontSize:'32px', marginRight: '10px', float: 'right', position: 'relative'}} className='chat-btn' onClick={()=>{unfriend(true)}}><FaUserSlash/></button>
                }
                
                <div style={{margin: 'auto', width: '100px', height: '100px', backgroundImage: icon?`url(${url})`:`url(${defaultImg})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '50%'}}></div>
                <h5 style={{margin: 'auto', textAlign: 'center', marginTop: '25px'}}>{name}</h5>
                <h5 style={{margin: 'auto', textAlign: 'center', marginTop: '25px'}}>{email}</h5>
                <p style={{margin: 'auto', textAlign: 'center', paddingTop: '50px'}}>
                    {description}
                </p>
            </div>
        </div>
    );
}

export default Card;