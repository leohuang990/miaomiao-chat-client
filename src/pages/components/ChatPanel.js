import {FaUserCircle} from 'react-icons/fa'
import React from 'react';

function ChatPanel({user}) {
    if(!user){
        return (
            <h2 style={{position:'relative', top: '45%', width: '100%',  textAlign: 'center'}}>Click to start</h2>
        )
    }
    const username = user[0];
    const hist_array = user;
    return (
        <div className='chat-panel' style={{height: '100%'}}>
            <h3 style={{width: '100%', height: '10%', paddingTop: '15px', paddingLeft: '25px'}}>
                {username}
                <button className='chat-btn' id='more'><FaUserCircle/></button>
            </h3>
            
            <div style={{width: '100%', height: '70%', borderTop: 'white 1px solid',borderBottom: 'white 1px solid', listStyleType: 'none', paddingTop: '10px', overflow: 'scroll'}}>
                {hist_array.map(msg=>msg.me?<li key={'li_' + msg.me + msg.msg+username} className='my_msg'>{msg.msg}</li>: msg.msg?<li className='their_msg'>{msg.msg}</li>:'')}
                
            </div>
            <div style={{width: '100%', height: '20%'}}> 
                <textarea />
                <button className='send-btn'>send</button>
            </div>
        </div>
    )
}

export default ChatPanel;