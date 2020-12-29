import React ,{useState, useEffect}from 'react';
import './css/homepage.css'
import { FaCog, FaComment, FaUserFriends, FaUserCircle, FaSignOutAlt, FaPlus, FaSearch, FaCheck, FaTimes,  FaCircle, FaAcquisitionsIncorporated } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import { CSSTransition } from 'react-transition-group';
import {useSelector, useDispatch} from 'react-redux';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button, Modal,  ModalFooter, ModalHeader} from 'reactstrap';
import {cover_sign_language} from '../actions'
import axios from 'axios'
import io from 'socket.io-client'

import jwt from 'jsonwebtoken';
import Card from './components/Card'
import Setting from './components/Setting'
import Language from './components/Language'
import ChatPanel from './components/ChatPanel'
import Background from './components/Background'
import Password from './components/Password'


import road from './homepage-bg/road.jpg'
import sakura from './homepage-bg/sakura.jpg'
import sea from './homepage-bg/sea.jpg'
import city from './homepage-bg/city.jpg'
import forest from './homepage-bg/forest.jpg'
import prairie from './homepage-bg/prairie.jpg'
import bridge from './homepage-bg/bridge.jpg'
import aurora from './homepage-bg/aurora.jpg'
import universe from './others/universe.jpg'

let  socket;
let mounted = false
function Homepage() {
    if(!mounted){
        mounted = true
        let id;
        var token = localStorage.getItem('jwt_token');
        if(!token) {
            window.location.href = '/'
        }
        try {
            id = jwt.verify(token, 'hhp').id;
        } catch (error) {
            window.location.href = '/'
        }
        

        axios({
            method: 'get',
            url: '/api/users',
        }).then(dough=>{
            // icon unhandled
            setAllUsers(dough.data);
            let obj = dough.data.filter(user=>user._id===id)[0];
            const {friends, preference, requestReceived, chatReceived, description
                , icon, requestSent, name, email} = obj;
            const language = preference.split('@')[0];
            const background = preference.split('@')[1];
            setFriends(friends); setRequestReceived(requestReceived); setDescription(description);
            setRequestSent(requestSent); setName(name); setEmail(email);
            setBackground(background); dispatch(cover_sign_language(language));
            setSearchRes(dough.data);setRequestEle(renderRequest())
            setChatList(renderChatList())
            
            socket = io();
            socket.emit('join', name);
            socket.on('receiveRequest', (name)=>{
                // setRequestReceived([...requestReceived, name])
                console.log('I hate you')
            });
            socket.on('requestFailed', (opponent)=>{
                console.log('failed')
                updateDbRequest(name, opponent);
            })
        });
    }
    const [active, setActive] = useState('chat');
    const [width, setWidth] = useState(window.innerWidth);
    const [mobile_state, setMobileState] = useState('chat');
    const [lastUser, setLastUser] = useState(null);
    const dispatch = useDispatch();
    const language = useSelector(state=>state.cover_sign_language);
    const [logoutWindow, setLogoutWindow] = useState(false);
    const [friendWindow, setFriendWindow] = useState(false);

   
    
    // wait for api 
    const [background, setBackground] = useState('Universe');
    const [friends, setFriends] = useState([]);
    const [requestReceived, setRequestReceived] = useState([]);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [requestSent, setRequestSent] = useState([]);
   


    const [searchRes, setSearchRes] = useState(allUsers);
    const [chatList, setChatList] = useState(renderChatList(null));
    const [right, setRight] = useState('Chat');
    const [requestEle, setRequestEle] = useState(renderRequest());
    window.addEventListener("resize", function () {
        setWidth(window.innerWidth);
    })
    function renderChatList(str){
        
        if(str) {
            const regex = new RegExp(`^${str}`, 'gi');
            const temp = friends.filter(user=>user[0].match(regex))
            if(temp.length === 0) return(<h5 style={{width: '100%', textAlign: "center", color: 'lightgray', marginTop: '10px'}}>No results</h5>)
            return (temp.map(user=> (<div id={user[0]} key={user[0]} className='chat-list-item' onClick={()=>{
                    setLastUser(user); setActive('chat')
                }}>
                    <div id={user[0] + "'s photo" } className='photo'></div>
                    {/* <span></span> */}
                    <div style={{marginLeft: '10px', marginTop: '5px'}}>
                        <h4>{user[0]}</h4>
                        <h6>{user[user.length-1].msg.length>22?user[user.length-1].msg.substring(0,20)+'...': user[user.length-1].msg}</h6>
                    </div>
                </div>)
            ))
        }
        return (friends.map(user=>{
            return (<div id={user[0]} key={user[0]} className='chat-list-item' onClick={()=>{
                 setActive('chat');setLastUser(user);
                
                }}>
                <div id={user[0] + "'s photo" } className='photo'></div>
                {/* <span></span> */}
                <div style={{marginLeft: '10px', marginTop: '2px'}}>
                    <h4 style={{width: '100%'}}>{user[0]} </h4>
                    <h6 style={{cursor: 'context-menu'}}>{user[user.length-1].msg.length>22?user[user.length-1].msg.substring(0,20)+'...': user[user.length-1].msg}</h6>
                </div>
            </div>)
        }))
    }
    
    

    
    
    function requestAnswered(user, isFriend){
        const index = requestReceived.findIndex(name=>user===name);
        requestReceived.splice(index, 1);
        setRequestEle(renderRequest())
        if(isFriend){
            console.log(requestReceived.length)
        } 
    }
    function renderRequest(){

        if(!requestReceived.length){
            return(<h6 style={{width: '100%', textAlign: "center", color: '#aaa', marginTop: '10px'}}>No results</h6>)
        }
        return (requestReceived.map(user=>(
            <div key={'request'+user}style={{ paddingLeft: '30px',  borderTop: 'white 1px solid', height: '42px'}}>
                <span style={{fontSize: '20px', position: 'relative'}}>{user} </span>
                <button onClick={()=>{requestAnswered(user, false)}} className='no'  color='info' style={{color: 'red',  background: 'transparent', float: 'right', marginLeft: '10px', border: 'none'}}><FaTimes size={'20px'}/></button >
                <button onClick={()=>{requestAnswered(user, true)}} className='yes'  color="info" style={{color: 'green', background: 'transparent', float: 'right', border: 'none'}}><FaCheck size={'20px'}/></button > 
            </div>))
        )
    }
    function switch_to_chat(){
        setRight('Chat');
    }
    function hashBg(photo){
        switch(photo){
            case'Universe':
                return universe
            case'Aurora':
                return aurora
            case'Bridge':
                return bridge
            case'City':
                return city
            case'Forest':
                return forest
            case'Prairie':
                return prairie
            case'Road':
                return road
            case'Sakura':
                return sakura
            case'Sea':
                return sea
            default: 
        }
    }
    
    function switch_to_setting(){
        setRight('Setting');
        
    }

    const goTo = (str)=>{
        setRight(str)
    }

    const back = ()=>{
        setRight('Setting')
    }

    const setLanguage= (str)=>{
        dispatch(cover_sign_language(str))
    }

    function updateDbRequest(myName, hisName){
        axios.post('/api/users/add', {
            params: {
              myName, hisName
            }
          }).then(()=>{
              setRequestSent([...requestSent, hisName])
          })
    }

    return (
        <div className='homepage' style={background?{backgroundImage: `url(${hashBg(background)})`}: {background: 'lightgray'}}>
            <div className='shadow'></div>
            
            {width>=800?
                (<div className='chat-window'> 
                    <nav className='navbar'>
                        <button onClick={switch_to_chat} className='chat-btn' id='chat'><FaComment size={28} style={{color: right==='Chat'? 'rgb(91, 226, 79)': ''}}/></button>
                        <button onClick={switch_to_setting} className='chat-btn' id='setting'><FaCog size={28} style={{color: right!=='Chat'? 'rgb(91, 226, 79)': ''}}/></button>
                        <button onClick={()=>{setRight('Setting');setLogoutWindow(!logoutWindow); }} className='chat-btn' id='logout'><FaSignOutAlt size={28} /></button>
                    </nav>
                    
                    <div className='main-interface'>
                        <div className='middle'>
                            <div className='mid-header'>
                                <InputGroup className='search-container'>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText><FaSearch size={16}/></InputGroupText>
                                    </InputGroupAddon>
                                    <Input className='search' placeholder="Search" onChange={(e)=>{setChatList(renderChatList(e.target.value))}}/>
                                </InputGroup>
                                <button onClick={()=>{setRight('Setting');setFriendWindow(!friendWindow);}} className='chat-btn' id='w-add'><FaPlus size={28} /></button>

                            </div>
                            <div style={{height: '88%', overflow: 'scroll', overflowX: 'hidden'}}>
                                <div style={{borderBottom: 'white 1px solid'}}>
                                    <h5 style={{textAlign: 'center'}}>Friend Request</h5>
                                    {requestEle}
                                    <br></br>
                                </div>
                                
                                {chatList}
                            </div>
                        </div>
                        <div className='right'>
                            {right === 'Chat'?<ChatPanel user={lastUser} />:
                                right === 'Setting'? <Setting goTo={goTo}/>:
                                right === 'Language'? <Language back={back} language={language} setLanguage={setLanguage}/>:
                                right === 'Card'? <Card back={back}/>:
                                right === 'Background'? <Background back={back} setBackground={setBackground}/>:
                                <Password back={back}/>
                            }
                        </div>
                    </div>
                </div>): 









                // mobile screen
                <div className='chat-mobile'>
                    <div className='m-header'>
                        <button className='chat-btn' id='m-add'><FaPlus size={28} /></button>
                    </div>
                    <div className='m-content'>
                        {mobile_state==='chat'?
                            <div className='part'>1</div>:
                            mobile_state==='friends'?
                            <div className='part'>2</div>:
                            <div className='part'>3</div>
                        }
                        {/* <CSSTransition
                            in={mobile_state === 'chat'}
                            timeout={500}
                            classNames="menu-primary"
                            unmountOnExit>
                                <div className='part'>1</div>
                        </CSSTransition>
                        <CSSTransition
                            in={mobile_state === 'friends'}
                            timeout={500}
                            classNames="menu-secondary"
                            unmountOnExit>
                                <div className='part'>2</div>
                        </CSSTransition> */}
                    </div>
                    <div className='m-navbar'>
                        <button onClick={()=>{setMobileState('chat')}} className='chat-btn' id='chat'><FaComment size={28} style={{color: active==='chat'? 'rgb(91, 226, 79)': ''}}/></button>
                        <button onClick={()=>{setMobileState('friends')}} className='chat-btn' id='friends'><FaUserFriends size={28} style={{color: active==='friends'? 'rgb(91, 226, 79)': ''}}/></button>
                        <button onClick={()=>{setMobileState('file')}} className='chat-btn' id='profile'><FaUserCircle size={28} style={{'color':'white'}}/></button>
                    </div>
                </div>
            }
            
            <Modal isOpen={logoutWindow} toggle={()=>{setLogoutWindow(!logoutWindow)}} style={{position: 'relative', top: '100px'}}>
                <ModalHeader style={{textAlign: 'center'}} >You want to log out now?</ModalHeader>
                
                <ModalFooter>
                    <Button color="primary" onClick={()=>{setLogoutWindow(!logoutWindow)}}>Confirm</Button>
                    <Button color="secondary" onClick={()=>{setLogoutWindow(!logoutWindow)}}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={friendWindow} toggle={()=>{setFriendWindow(!friendWindow)}} style={{position: 'relative', top: '100px', width: '300px'}}>
                <ModalHeader style={{textAlign: 'center'}} >Search user by name</ModalHeader>
                <Input type='text' style={{width: '90%', marginLeft: '10px', marginTop: '5px'}} onChange={(e)=>{
                    console.log(allUsers)
                    const regex = new RegExp(`^${e.target.value}`, 'gi');
                    setSearchRes(allUsers.filter(user=>user.name.match(regex)));
                }}></Input>
                <p style={{paddingLeft: '5px'}}>Notice: Your friends and users you have sent request will not be displayed here</p>
                <div style={{height: '200px', overflow: 'scroll'}}>
                    {searchRes.map(user=>user.name).filter(user=>!friends.includes(user)&&!requestSent.includes(user)&&user!==name).map(user=><div key={'add_'+user} style={{height: '50px', paddingTop: '5px'}}>
                        <span style={{fontSize: '20px', marginLeft: '10px', marginTop: '3px'}}>{user}</span>
                        <Button onClick={()=>{console.log(socket.emit('sendRequest', user));}} outline color='info' style={{float: 'right', marginRight: '5px'}}>send</Button>
                    </div>)}
                </div>
                
            </Modal>
        </div>
    );
}

export default Homepage;