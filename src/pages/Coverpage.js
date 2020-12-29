import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/coverpage.css'
import {  Modal, ModalHeader, Input,Button } from 'reactstrap';
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {cover_sign_language} from '../actions'


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
            <Modal isOpen={popup}>
                <ModalHeader toggle={()=>{setPopup(!popup);  document.body.style.overflow = 'unset'}}>{language==="English"? 'Please choose your language': '言語を選んでください'}</ModalHeader>
                <Input type="select" name="backdrop" id="backdrop" onChange={(e)=>{dispatch(cover_sign_language(e.target.value)); setPopup(!popup);document.body.style.overflow = 'unset'}}>
                    <option value={language}>{language==="English"? 'Options...': '選択肢...'}</option>
                    <option value="English">English</option>
                    <option value="Japanese">日本語</option>
                </Input>
            </Modal>
            <div className="pimg1">
                <div className='ptext'>
                    <span className='border'>
                        View the future
                    </span>
                </div>
            </div>
            <section className='section1'>
                <h2>Section 1</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur culpa quia minus, deserunt autem, molestias corporis similique officiis possimus ab voluptas minima. Doloribus eaque ipsa incidunt illo officiis nemo optio.</p>
            </section>
            <div className="pimg2">
                <div className='ptext'>
                    <span className='border'>
                        View the future
                    </span>
                </div>
            </div>
            <section className='section2'>
                <h2>Section 2</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur culpa quia minus, deserunt autem, molestias corporis similique officiis possimus ab voluptas minima. Doloribus eaque ipsa incidunt illo officiis nemo optio.</p>
            </section>
            <div className="pimg3">
                <div className='ptext'>
                    <span className='border'>
                        View the future
                    </span>
                </div>
            </div>
            <section className='section3'>
                <h2>Section 3</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur culpa quia minus, deserunt autem, molestias corporis similique officiis possimus ab voluptas minima. Doloribus eaque ipsa incidunt illo officiis nemo optio.</p>
            </section>
            <div className="pimg1">
                <div className='ptext'>
                    <span className='border'>
                        View the future
                    </span>
                </div>
            </div>
            
        </div>
    );
}

export default Coverpage;