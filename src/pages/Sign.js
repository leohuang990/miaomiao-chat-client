import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './css/sign.css'
import { Button, Form, FormGroup, Input, Modal, ModalHeader } from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import {cover_sign_language} from '../actions'
import Particles from 'react-particles-js';
import { Alert } from 'reactstrap';
import { Redirect } from "react-router";
import axios from 'axios';
import jwt from 'jsonwebtoken';
const secret = 'hhp';

function Sign() {
    const language = useSelector(state=>state.cover_sign_language);
    const [state, setState] = useState('login');
    const [popup, setPopup] = useState(false);
    const [msg, setMsg] = useState('');
    let id = '';
    function verify_token(){
        var token = localStorage.getItem('jwt_token');
        if(!token) return false
        try {
            id = jwt.verify(token, secret).id;
        } catch (error) {
            return false
        }
        return true
    }
    const [redirect,setRedirect] = useState(verify_token());
    const dispatch = useDispatch();
    
    

    function Japn(msg){
        switch(msg){
            case 'Please fill out all fields':
                return 'すべてのフィールドに入力してください'
            case 'Please use valid email address':
                return '有効なメールアドレスを使ってください'
            case 'Your password must be 8 characters or more':
                return 'パスワードは8文字以上である必要があります'
            case 'Two passwords mismatch with each other':
                return '二つのパスワードは一致していません'
            case 'This email has already been registered':
                return 'このメールはすでに登録されています'
            case 'User does not exist':
                return 'ユーザーは存在しません'
            case 'Wrong password':
                return 'パスワードが間違っています'
            
            default:
                
        }
    }

    async function register(){
        const result = await axios({
            method: 'post',
            url: 'https://miaomiao-server.herokuapp.com/api/users',
            data: {
                confirm: document.getElementById('confirm').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                name: document.getElementById('name').value
              }
        });
        const {msg, token} = result.data;
        if(msg){
            setMsg(language==='English'?msg:Japn(msg))
        } else {
            localStorage.setItem('jwt_token', token)
            // setRedirect(true)
            window.location.href = '/homepage'
        }
        
    }
    async function login(){
        const result = await axios({
            method: 'post',
            url: 'https://miaomiao-server.herokuapp.com/api/auth',
            data: {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            }
        });
        const {msg, token} = result.data;
        if(msg){
            setMsg(language==='English'?msg:Japn(msg))
        } else {
            localStorage.setItem('jwt_token', token)
            window.location.href = '/homepage'
            // setRedirect(true)
        }
    }

    return (
        <div className="bg" style={{height: '100vh', overflow: 'hidden' }}>
           
           <Particles
                params={{
                    "particles": {
                        "number": {
                            "value": 160,
                            "density": {
                                "enable": false
                            }
                        },
                        "color":{
                            "value": ["#BD10E0","#B8E986","#50E3C2","#FFD300","#E86363"]
                        },
                        "size": {
                            "value": 8,
                            "random": true,
                            "anim": {
                                "speed": 5,
                                "size_min": 1
                            }
                        },
                        "opacity": {
                            "value": 1
                        },
                        "line_linked": {
                            "enable": false
                        },
                        "move": {
                            "random": true,
                            "speed": 1,
                            "direction": "none",
                            "out_mode": "out"
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "bubble"
                            },
                            "onclick": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        },
                        "modes": {
                            "bubble": {
                                "distance": 250,
                                "duration": 2,
                                "size": 0,
                                "opacity": 0
                            },
                            "repulse": {
                                "distance": 400,
                                "duration": 4
                            }
                        }
                    }
                }} />
            
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: 'hidden',
              
            }}
          >
              
              <Form className='form' autoComplete={'off'} >
                <Alert color="info"  style={{position: 'absolute', margin: 'auto',  textAlign: 'center', bottom: '2px', left: '5px', background: 'transparent', border: 'none'}}>
                    You can have a peek at <a href='/demo'>demo</a> before signing up
                </Alert>
                <div className='option'>
                    <button className='login' onClick={(e)=>{e.preventDefault();setState('login')}} style={{color: state==='login'? 'rgb(24, 164, 230)': 'white'}}>{language==='English'? 'login': 'ログイン'}</button>
                    <button className='signup' onClick={(e)=>{e.preventDefault();setState('signup')}} style={{color: state==='signup'? 'rgb(24, 164, 230)': 'white'}}>{language==='English'? 'sign up': 'サインアップ'}</button>
                </div>
                {state==='login'? 
                    <FormGroup className='content'>
                        <Input type="email" name="email" id="email" style={{marginTop: '35px'}} placeholder={language==='English'? "email address": '電子メールアドレス'} />
                        <Input type="password" name="password" style={{marginTop: '35px'}} id="password" placeholder={language==='English'? "password": 'パスワード'} />
                        <Button outline color="success" id='submit' onClick={login}>{language==='English'? 'login': 'ログイン'}</Button>
                    </FormGroup> :
                    <FormGroup className='content'>
                        <Input type="email" name="email" id="email" placeholder={language==='English'? "email address (can't change)": '電子メールアドレス (変えられません)'} />
                        <Input type="name" name="name" id="name" placeholder={language==='English'? "username (can't change)": '名前 (変えられません)'} />
                        <Input type="password" name="password" id="password" placeholder={language==='English'? "password": 'パスワード'} />
                        <Input type="password" name="confirm" id="confirm" placeholder={language==='English'? "confrim password": 'パスワード確認'} />
                        <Button id='submit'outline color="success" onClick={register}>{language==='English'? 'register': '登録'}</Button>
                    </FormGroup>            
                }
                {redirect? <Redirect to={'/homepage'}></Redirect>: ''}
                <Link to={'/'}><Button outline color="info" className='back'>{language==='English'? 'back': '戻る'}</Button></Link><Button outline color="secondary" className='language' onClick={()=>{setPopup(true)}}>{language==='English'? 'language': '言語'}</Button> 
              </Form>
              {msg? 
                    <Alert className='msg' id='msg' color="danger">
                        {msg}
                    </Alert>: ''}
                
        </div>
        <Modal isOpen={popup}>
            <ModalHeader toggle={()=>{setPopup(!popup); }}>{language==="English"? 'Please choose your language': '言語を選んでください'}</ModalHeader>
            <Input type="select" name="backdrop" id="backdrop" onChange={(e)=>{dispatch(cover_sign_language(e.target.value)); setPopup(!popup);}}>
                <option value={language}>{language==="English"? 'Options...': '選択肢...'}</option>
                <option value="English">English</option>
                <option value="Japanese">日本語</option>
            </Input>
            
        </Modal>
        
    </div>
    );
}

export default Sign;