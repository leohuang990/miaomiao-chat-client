import {FaUserCircle, FaLanguage, FaKey,FaImage,} from 'react-icons/fa'
import React from 'react';
import { Button} from 'reactstrap';


function Setting({language, goTo}) {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
            <Button onClick={()=>{goTo('Card') }} className='setting-btn'><FaUserCircle size={'28px'}/> <span style={{marginLeft: '20px'}}>{language==='English'?'My Card':'私のカード'}</span></Button>
            <Button onClick={()=>{goTo('Language')}} className='setting-btn'><FaLanguage size={'28px'} /><span style={{marginLeft: '20px'}}>{language==='English'?'Language':'言語'}</span></Button>
            <Button onClick={()=>{goTo('Password') }} className='setting-btn'><FaKey size={'28px'}/> <span style={{marginLeft: '20px'}}>{language==='English'?'Password':'パスワード'}</span></Button>
            <Button onClick={()=>{goTo('Background') }} className='setting-btn'><FaImage size={'28px'}/> <span style={{marginLeft: '20px'}}>{language==='English'?'Background':'背景'}</span></Button>
        </div>
    );
}

export default Setting;