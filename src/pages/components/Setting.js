import {FaUserCircle, FaLanguage, FaKey,FaImage,} from 'react-icons/fa'
import React from 'react';
import { Button} from 'reactstrap';


function Setting({goTo}) {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Button onClick={()=>{goTo('Card') }} className='setting-btn'><FaUserCircle size={'28px'}/> <span style={{marginLeft: '20px'}}>My Card</span></Button>
            <Button onClick={()=>{goTo('Language')}} className='setting-btn'><FaLanguage size={'28px'} /><span style={{marginLeft: '20px'}}>Language</span></Button>
            <Button onClick={()=>{goTo('Password') }} className='setting-btn'><FaKey size={'28px'}/> <span style={{marginLeft: '20px'}}>Password</span></Button>
            <Button onClick={()=>{goTo('Background') }} className='setting-btn'><FaImage size={'28px'}/> <span style={{marginLeft: '20px'}}>Background</span></Button>
        </div>
    );
}

export default Setting;