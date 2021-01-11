import {FaUserCircle} from 'react-icons/fa'
import { v4 as uuid_v4 } from "uuid";
import Language from './Language';


function ChatPanel({user, handleSend, openOtherCard, language}) {
    user = user.lastUser; 
    if(!user){
        return (
        <h2 style={{position:'relative', top: '45%', width: '100%',  textAlign: 'center'}}>{Language==='English'?'Click to start':'クリックして開始'}</h2>
        )
    }
    

    const username = user[0];
    
    return (
        <div id='chatP' className='chat-panel' style={{height: '100%'}}>
            <h3 style={{width: '100%', height: '10%', paddingTop: '15px', paddingLeft: '25px', textAlign: 'left'}}>
                {username}
                <button onClick={()=>{openOtherCard(username)}} className='chat-btn' id='more'><FaUserCircle/></button>
            </h3>
            
            <div id='chatW' style={{width: '100%', height: '70%', borderTop: 'white 1px solid',borderBottom: 'white 1px solid', 
            listStyleType: 'none', paddingTop: '10px', overflow: 'scroll'}} >
                {user.map(msg=>msg.me?<li key={uuid_v4()} className='my_msg'>{msg.msg}</li>: 
                msg.msg?<li className='their_msg' key={uuid_v4()}>{msg.msg}</li>:'')}
                
            </div>
            <div style={{width: '100%', height: '20%'}}> 
                <textarea />
                <button className='send-btn' onClick={handleSend}>send</button>
            </div>
        </div>
    )
}

export default ChatPanel;