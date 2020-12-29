import {FaArrowAltCircleLeft} from 'react-icons/fa'
import React from 'react';
import { Input, Button} from 'reactstrap';

function Password({back, language}) {
    return (
        <div style={{width: '100%', height: '100%', overflow: 'scroll'}}>
            <button style={{background: 'transparent', fontSize:'32px', marginLeft: '10px'}} className='chat-btn' onClick={back}><FaArrowAltCircleLeft/></button>
            <Input style={{marginTop: '70px'}} type="password" name="password" className="setting-password search" placeholder={language==='English'? "old password": 'パスワード'} />
            <Input type="password" name="password" className="setting-password search" placeholder={language==='English'? "new password": 'パスワード'} />
            <Input type="password" name="password" className="setting-password search"  placeholder={language==='English'? "confirm password": 'パスワード'} />
            <Button id='ps-submit' outline color='success'>submit</Button>
        </div>
    );
}

export default Password;