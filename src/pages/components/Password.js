import {FaArrowAltCircleLeft} from 'react-icons/fa'
import React from 'react';
import { Input, Button} from 'reactstrap';

function Password({back, language, setPassword}) {
    return (
        <div style={{width: '100%', height: '100%', overflow: 'scroll'}}>
            <button style={{background: 'transparent', fontSize:'32px', marginLeft: '10px'}} className='chat-btn' onClick={back}><FaArrowAltCircleLeft/></button>
            <h6 id='msg_display' style={{position: 'absolute',color: 'red', margin: 'auto', width: '55%',  padding: '0 40px'}}></h6>
            <Input id='pa' style={{marginTop: '55px'}} type="password" name="password" className="setting-password search" placeholder={language==='English'? "old password": '以前のパスワード'} />
            <Input id='pb' type="password" name="password" className="setting-password search" placeholder={language==='English'? "new password": '新たなパスワード'} />
            <Input id='pc' type="password" name="password" className="setting-password search"  placeholder={language==='English'? "confirm password": 'パスワード確認'} />
            <Button onClick={()=>{setPassword();}}　id='ps-submit' outline color='success'>submit</Button>
        </div>
    );
}


export default Password;