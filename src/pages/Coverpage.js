import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/coverpage.css'
import {  Modal, ModalHeader, Input,Button } from 'reactstrap';
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {cover_sign_language} from '../actions'
import {FaNetworkWired, FaDiceD6, FaMobileAlt, FaLaptop} from 'react-icons/fa'


function Coverpage() {
    const language = useSelector(state=>state.cover_sign_language)
    const [popup, setPopup] = useState(false);
    const dispatch = useDispatch();
    return (
        <div className='main'>
            <div className='func'>
                <Button className="language1"onClick={()=>{setPopup(!popup);  document.body.style.overflow = 'hidden'}}>{language==="English"?'language': '言語'}</Button>
                <Link to='/sign'><Button>{language==="English"?'Login/Sign Up': 'ログイン／サインアップ'}</Button></Link>
            </div>
            <div style={{position: 'relative',marginBottom: '50px', justifyContent: 'center',width: '60vw', margin: 'auto', background: 'transparent', paddingTop: '7vh', textAlign: 'center'}}>
                <h1 style={{textAlign: "center", color: '#999'}}><img style={{width: '110px', height: '110px', color: '#111'}} src='./favicon.jpg' alt='a'></img>      Miao Miao Chat App</h1>
                <h5 style={{position: 'relative', top: '10px'}}>{language==='English'?'By words, build connection':'言葉で、人と人を繋ぐ'}</h5>
            </div>
            <div className='ct' style={{marginTop: '50px',display: 'flex', justifyContent: 'space-around',  margin: 'auto', overflow: 'scroll'}}>
                <div className="intro" >
                    <FaNetworkWired style={{position: 'relative', top: '20px', left: '75px'}} size={'84px'}/>
                    <h3 style={{marginTop: '50px'}}>{language==='English'?'Make Friends':'友達を作る'}</h3>
                    <h5 style={{marginTop: '50px'}}>{language==='English'?'Real-time Chat':'リアルタイムチャット'}</h5>
                    <h5 style={{marginTop: '50px'}}>{language==='English'?'Stay Connected':'連絡を取り合おう'}</h5>
                    
                </div>
                <div className="intro" >
                    <FaMobileAlt style={{position: 'relative', left: '25px', top: '20px'}} size='70px'/><FaLaptop style={{position: 'relative', left: '55px', top: '20px'}}  size='70px'/>
                    <h5 style={{marginTop: '100px'}}>{language==='English'?'Both mobile and laptop are supported':'モバイルとラップトップの両方で使えます'}</h5>
                </div>
                <div className="intro" >
                    <FaDiceD6 style={{position: 'relative', top: '20px', left: '75px'}} size={'84px'}/>
                    <h4 style={{marginTop: '50px'}}>{language==='English'?'Change your background':'背景を変える'}</h4>
                    <h5 style={{marginTop: '50px'}}>{language==='English'?'Customize your user card':'ユーザーカードをカスタマイズする'}</h5>
                    <h5 style={{marginTop: '50px'}}>{language==='English'?'Design your own app':'自分のアプリをデザインしよう'}</h5>
                </div>
            </div>
            <Modal isOpen={popup}>
                <ModalHeader toggle={()=>{setPopup(!popup);  document.body.style.overflow = 'unset'}}>{language==="English"? 'Please choose your language': '言語を選んでください'}</ModalHeader>
                <Input type="select" name="backdrop" id="backdrop" onChange={(e)=>{dispatch(cover_sign_language(e.target.value)); setPopup(!popup);document.body.style.overflow = 'unset'}}>
                    <option value={language}>{language==="English"? 'Options...': '選択肢...'}</option>
                    <option value="English">English</option>
                    <option value="Japanese">日本語</option>
                </Input>
            </Modal>
        </div>
    );
}

export default Coverpage;