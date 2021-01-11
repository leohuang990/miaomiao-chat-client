import React ,{useState, useEffect}from 'react';
import './css/homepage.css'
import { FaInfo,FaCog, FaComment, FaUserFriends, FaUserCircle, FaSignOutAlt, FaPlus, FaSearch, FaCheck, FaTimes} from 'react-icons/fa';
import {Link} from 'react-router-dom'
import { CSSTransition } from 'react-transition-group';
import {useSelector, useDispatch} from 'react-redux';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button, Modal,  ModalFooter, ModalHeader, Label, Form} from 'reactstrap';
import {cover_sign_language} from '../actions'
import axios from 'axios'
import io from 'socket.io-client'
import defaultImg from './others/default.jpg'


import jwt from 'jsonwebtoken';
import Card from './components/Card'
import Setting from './components/Setting'
import Language from './components/Language'
import ChatPanel from './components/ChatPanel'
import Background from './components/Background'
import Password from './components/Password'
import Info from './components/Info'


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
function Homepage() {
    const [mounted, setMounted] = useState(false);
    
    if(!mounted){
        setMounted(true)
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
            url: 'https://miaomiao-server.herokuapp.com/api/users',
        }).then(dough=>{
            // icon unhandled
            setAllUsers(dough.data);
            
            let obj = dough.data.filter(user=>user._id===id)[0];
            const {friends, background, language, requestReceived,  description
                , requestSent, name, email, icon} = obj;
            setFriends(friends); setRequestReceived(requestReceived); setDescription(description);
            setRequestSent(requestSent); setName(name); setEmail(email);setLastUser({lastUser:null})
            setBackground(background); dispatch(cover_sign_language(language));setIcon(icon)
            setSearchRes(dough.data);setRequestState(requestReceived.length===0)
            
            socket = io('https://miaomiao-server.herokuapp.com/');
            socket.emit('join', name);
            socket.on('receiveRequest', (name)=>{
                setRequestReceived([...requestReceived, name])
                
            });
            
            socket.on('receiveResponse', (from, isFriend)=>{
                const index = requestSent.findIndex(user=>user===from);
                setRequestSent(requestSent.splice(index, 1));
                if(isFriend){
                    friends.push([from])
                    setFriends([...friends])
                } 
            })
            socket.on('receiveChat', (user, msg)=>{
                if(!lastUser.lastUser){
                    friends.filter(us=>us[0]===user)[0].push({me:false, msg});
                    setFriends([...friends])
                    return
                }
                if(right === 'Chat' && lastUser.lastUser[0] === user){
                    // setLastUser([...lastUser.lastUser, {me:false, msg}]);
                    lastUser.lastUser.push({me:false, msg})
                    setRight('Blank')
                    setFriends([...friends])
                } else {
                    friends.filter(us=>us[0]===user)[0].push({me:false, msg});
                    setFriends([...friends])
                }
            })
            socket.on('receiveUnfriend', from=>{
                // const name = lastUser.lastUser[0]
                setFriends([...friends.filter(user=>user[0]!==from)]);
                // if(!lastUser.lastUser){
                //     return
                // }
                // if(name===from){
                //     setLastUser({lastUser: null})
                //     setRight('Chat')
                // }
                setLastUser({lastUser: null})
                setRight('Blank')
            })
        });
    }
    const [width, setWidth] = useState(window.innerWidth>=800);
    const [mobile_state, setMobileState] = useState('chat');
    const dispatch = useDispatch();
    const language = useSelector(state=>state.cover_sign_language);
    const [logoutWindow, setLogoutWindow] = useState(false);
    const [friendWindow, setFriendWindow] = useState(false);
    const [requestState, setRequestState] = useState(false);
    const [icon, setIcon] = useState(0)
    const [sayGoodBye, setSayGoodBye] = useState([])
    
    // wait for api 
    const [background, setBackground] = useState('Universe');
    const [friends, setFriends] = useState([]);
    const [lastUser, setLastUser] = useState({lastUser: null});
    const [requestReceived, setRequestReceived] = useState([]);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [requestSent, setRequestSent] = useState([]);
    const [UC, setUC] = useState(false)
    const [otherCard, setOtherCard] = useState(false);
    const [unfriend, setUnfriend] = useState(false)
   
    window.addEventListener("resize", function () {
        if(window.innerWidth>=800&&!width){
            setWidth(true);
        } else if(window.innerWidth<800&&width){
            setWidth(false);
        }
    })
    

    const [searchRes, setSearchRes] = useState(allUsers);
    const [chatList, setChatList] = useState(renderChatList(null));
    const [right, setRight] = useState('Chat');
    
    useEffect(()=>{
        setRequestState(requestReceived===0);
        
    }, [requestReceived])
    useEffect(()=>{
        setChatList(renderChatList(null))
    }, [friends])
    
    useEffect(()=>{
        if(right==='Chat'&&document.getElementById('chatW')){
            document.getElementById('chatW').scrollTop = document.getElementById('chatW').scrollHeight
            
        }
        if(right === 'Blank'){
            setRight('Chat')
        }
    }, [right])
    
    function renderChatList(str){
        
        if(str) {
            const regex = new RegExp(`^${str}`, 'gi');
            const temp = friends.filter(user=>user[0].match(regex))
            if(temp.length === 0) return(<h5 style={{width: '100%', textAlign: "center", color: 'lightgray', marginTop: '10px'}}>{language==='English'?'No results': '結果がありません'}</h5>)
            return (temp.map(user=> (<div id={user[0]} key={user[0]} className='chat-list-item' onClick={()=>{
                    setLastUser({lastUser: user}); setRight('Chat');
                }}>
                    <div id={user[0] + "'s photo" } className='photo' style={{backgroundImage: `url('${allUsers.find(t=>t.name===user[0])?allUsers.find(t=>t.name===user[0]).icon?'https://miaomiao-server.herokuapp.com/image/'+allUsers.find(t=>t.name===user[0]).icon:defaultImg:defaultImg}')`}}></div>
                    <div style={{marginLeft: '10px', marginTop: '5px'}}>
                        <h4　style={{textAlign:'left'}}>{user[0]}</h4>
                        {user.length===1?'':
                            <h6 style={{cursor: 'context-menu'}} id={'lastword_'+ user[0]}>{user[user.length-1].msg.length>22?user[user.length-1].msg.substring(0,20)+'...': user[user.length-1].msg}</h6>
                        }
                    </div>
                </div>)
            ))
        }
        return (friends.map(user=>{
            return (<div id={user[0]} key={user[0]} className='chat-list-item' onClick={()=>{
                setLastUser({lastUser: user});
                setRight('Blank');
                lastUser.lastUser = user;

                }}>
                <div id={user[0] + "'s photo" } className='photo' style={{backgroundImage: `url('${allUsers.find(t=>t.name===user[0])?allUsers.find(t=>t.name===user[0]).icon?'https://miaomiao-server.herokuapp.com/image/'+allUsers.find(t=>t.name===user[0]).icon:defaultImg:defaultImg}')`}}></div>
                <div style={{marginLeft: '10px', marginTop: '5px'}}>
                    <h4 style={{width: '100%', textAlign:'left'}}>{user[0]} </h4>
                    {user.length===1?'':
                    <h6 style={{cursor: 'context-menu'}} id={'lastword_'+ user[0]}>{user[user.length-1].msg.length>22?user[user.length-1].msg.substring(0,20)+'...': user[user.length-1].msg}</h6>
                    }
                </div>
            </div>)
        }))
    }
  

    function requestAnswered(user, isFriend){
        const index = requestReceived.findIndex(name=>user===name);
        requestReceived.splice(index, 1);
        setRequestReceived(requestReceived)
        setRequestState(requestReceived.length === 0)
        socket.emit('requestAnswered', name, user, isFriend)
        if(isFriend){
            friends.push([user])
            setFriends([...friends])
        } 
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
        dispatch(cover_sign_language(str));
    }

    const handleSend = ()=>{
        const from = name;
        const to = lastUser.lastUser[0];
        const msg = document.getElementsByTagName('textarea')[0].value;
        document.getElementsByTagName('textarea')[0].value = '';
        // render this window
        friends.filter(user=>user[0]===to)[0].push({me:true, msg})
        setFriends([...friends])
        setRight('Blank')
        socket.emit('sendChat', from, to ,msg)
        
    }

    const openOtherCard = (name)=>{
        const temp = allUsers.filter(user=>user.name === name)[0]
        setOtherCard(temp)
        setRight('OtherCard')
    }

    const setPassword=()=>{
        const pa = document.getElementById('pa').value
        const pb = document.getElementById('pb').value
        const pc = document.getElementById('pc').value
        const cb = (msg)=>{
            if(msg){
                document.getElementById('msg_display').innerHTML = msg;
                return
            } else {
                setRight('Setting')
            }
        }
        socket.emit('changePs', name, pa, pb, pc, cb)
    }
    return (
        
        <div className='homepage' style={background?{backgroundImage: `url(${hashBg(background)})`}: {background: 'lightgray'}}>
            <div className='shadow'></div>
            
            {width?
                (<div className='chat-window'> 
                    <nav className='navbar'>
                        <button onClick={switch_to_chat} className='chat-btn' id='chat'><FaComment size={28} style={{color: right==='Chat' ||right==='OtherCard'? 'rgb(91, 226, 79)': ''}}/></button>
                        <button onClick={switch_to_setting} className='chat-btn' id='setting'><FaCog size={28} style={{color: right!=='Chat'&&right!=='OtherCard'&&right!=='Info'? 'rgb(91, 226, 79)': ''}}/></button>
                        <button onClick={()=>{setRight('Info')}} className='chat-btn' id='instruction' style={{color: right==='Info'? 'rgb(91, 226, 79)': ''}}><FaInfo size={28} /></button>
                        <button onClick={()=>{if(right==='Language'){setRight('Setting')}setLogoutWindow(!logoutWindow); }} className='chat-btn' id='logout'><FaSignOutAlt size={28} /></button>
                    </nav>
                    
                    <div className='main-interface'>
                        <div className='middle'>
                            <div className='mid-header'>
                                <InputGroup className='search-container'>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText><FaSearch size={16}/></InputGroupText>
                                    </InputGroupAddon>
                                    <Input className='search' placeholder={language==='English'?"Search": '検索'} onChange={(e)=>{setChatList(renderChatList(e.target.value))}}/>
                                </InputGroup>
                                <button onClick={()=>{if(right==='Language'){setRight('Setting')}setFriendWindow(!friendWindow)}} className='chat-btn' id='w-add'><FaPlus size={28} /></button>

                            </div>
                            <div style={{height: '88%', overflow: 'scroll', overflowX: 'hidden'}}>
                                <div style={{borderBottom: 'white 1px solid', maxHeight: '110px', overflowY: 'scroll'}}>
                                    <h5 style={{textAlign: 'center', padding: '5px 0'}}>{language==='English'?'Friend Request':'友達リクエスト'}</h5>
                                    {requestState?
                                        (<h6 style={{width: '100%', textAlign: "center", color: '#aaa', marginTop: '10px'}}>{language==='English'?'No results': '結果がありません'}</h6>):
                                        (requestReceived.map(user=>(
                                            <div key={'request'+user}style={{ paddingLeft: '30px',  borderTop: 'white 1px solid', height: '42px'}}>
                                                <span style={{fontSize: '20px', position: 'relative'}}>{user} </span>
                                                <button onClick={()=>{requestAnswered(user, false)}} className='no'  color='info' style={{color: 'red',  background: 'transparent', float: 'right', marginLeft: '10px', border: 'none'}}><FaTimes size={'20px'}/></button >
                                                <button onClick={()=>{requestAnswered(user, true)}} className='yes'  color="info" style={{color: 'green', background: 'transparent', float: 'right', border: 'none'}}><FaCheck size={'20px'}/></button > 
                                            </div>))
                                        )
                                    }
                                    <br></br>
                                </div>
                                
                                {chatList}
                            </div>
                        </div>
                        <div className='right'>
                            {right === 'Chat'?<ChatPanel user={lastUser} handleSend={handleSend} openOtherCard={openOtherCard} language={language}/>:
                                right==='OtherCard'?<Card icon={otherCard.icon} description={otherCard.description} email={otherCard.email} name={otherCard.name} back={()=>setRight('Chat')} unfriend={setUnfriend}/>:
                                right === 'Blank'? '':
                                right === 'Info'?<Info language={language}/>:
                                right === 'Setting'? <Setting language={language} goTo={goTo}/>:
                                right === 'Language'? <Language back={back} language={language} setLanguage={(str)=>{setLanguage(str); socket.emit('changeLanguage', name, str);setRight('Setting')}}/>:
                                right === 'Card'? <Card back={back} setCard={()=>setUC(true)} icon={icon} description={description} email={email} name={name}/>:
                                right === 'Background'? <Background back={back} language={language}　setBackground={(str)=>{setBackground(str);socket.emit('changeBackground', name, str)}}/>:
                                <Password back={back} language={language} setPassword={setPassword}/>
                            }
                        </div>
                    </div>
                </div>): 









                // mobile screen
                <div className='chat-mobile'>
                    <h5 style={{margin: 'auto'}}>The mobile frontend is down for update, please use laptop instead</h5>
                    {/* <div className='m-header'>
                        <button className='chat-btn' id='m-add'><FaPlus size={28} /></button>
                    </div>
                    <div className='m-content'>
                        {mobile_state==='chat'?
                            <div className='part'>1</div>:
                            mobile_state==='friends'?
                            <div className='part'>2</div>:
                            <div className='part'>3</div>
                        }
                        <CSSTransition
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
                        </CSSTransition>
                    </div>
                    <div className='m-navbar'>
                        <button onClick={()=>{setMobileState('chat')}} className='chat-btn' id='chat'><FaComment size={28} style={{color: active==='chat'? 'rgb(91, 226, 79)': ''}}/></button>
                        <button onClick={()=>{setMobileState('friends')}} className='chat-btn' id='friends'><FaUserFriends size={28} style={{color: active==='friends'? 'rgb(91, 226, 79)': ''}}/></button>
                        <button onClick={()=>{setMobileState('file')}} className='chat-btn' id='profile'><FaUserCircle size={28} style={{'color':'white'}}/></button>
                    </div> */}
                </div>
            }
            
            <Modal isOpen={unfriend} toggle={()=>{setUnfriend(!unfriend)}} style={{position: 'relative', top: '100px'}}>
                <ModalHeader style={{textAlign: 'center'}} >{language==='English'?'Are you sure you want to unfriend this user?':'このユーザーを友達から削除しますか？'}</ModalHeader>
                
                <ModalFooter>
                    <Button color="success" outline onClick={()=>{
                        setUnfriend(!unfriend);sayGoodBye.push(lastUser.lastUser[0]); setFriends([...friends.filter(user=>user[0]!==lastUser.lastUser[0])]);socket.emit('unfriend', name, lastUser.lastUser[0]);setLastUser({lastUser: null});setRight('Chat');
                    }} >{language==='English'?'Confirm':'削除'}</Button>
                    <Button color="danger" outline onClick={()=>{setUnfriend(!unfriend)}} >{language==='English'?'Cancel':'キャンセル'}</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={logoutWindow} toggle={()=>{setLogoutWindow(!logoutWindow)}} style={{position: 'relative', top: '100px'}}>
                <ModalHeader style={{textAlign: 'center'}} >{language==='English'?'You want to log out now?':'今すぐログアウトしますか？'}</ModalHeader>
                
                <ModalFooter>
                    <Link to='/'><Button color="primary" onClick={()=>{setLogoutWindow(!logoutWindow); localStorage.removeItem('jwt_token')}}>{language==='English'?'Confirm':'はい'}</Button></Link>
                    <Button color="secondary" onClick={()=>{setLogoutWindow(!logoutWindow)}}>{language==='English'?'Cancel':'いいえ'}</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={friendWindow} toggle={()=>{setFriendWindow(!friendWindow)}} style={{position: 'relative', top: '100px', width: '300px'}}>
                <ModalHeader style={{textAlign: 'center'}} >{language==='English'?'Search user by name':'名前で検索します'}</ModalHeader>
                <Input type='text' style={{width: '90%', marginLeft: '10px', marginTop: '5px'}} onChange={(e)=>{
                    const regex = new RegExp(`^${e.target.value}`, 'gi');
                    setSearchRes(allUsers.filter(user=>user.name.match(regex)));
                }}></Input>
                <p style={{paddingLeft: '5px'}}>{language==='English'? 'Notice: Your friends and users you have received from or sent request will not be displayed here'
                :'すでに友達である人とリクエストを送信したあるいは相手から受け取った人はこちらに表示されません'}</p>
                <div style={{height: '200px', overflow: 'scroll'}}>
                    {searchRes.map(user=>user.name).filter(user=>!friends.map(user=>user[0]).includes(user)&&!requestSent.includes(user)&&user!==name&&!requestReceived.includes(user)&&!sayGoodBye.includes(user)).map(user=><div key={'add_'+user} style={{height: '50px', paddingTop: '5px'}}>
                        <span style={{fontSize: '20px', marginLeft: '10px', marginTop: '3px'}}>{user}</span>
                        <Button onClick={()=>{setRequestSent([...requestSent, user]);socket.emit('sendRequest', user);}} outline color='info' style={{float: 'right', marginRight: '5px'}}>{language==='English'?'send':'送信'}</Button>
                    </div>)}
                </div>
                
            </Modal>
            <Modal isOpen={UC} toggle={()=>{setUC(!UC)}} style={{position: 'relative', top: '100px', width: language==='English'?'318px':'270px'}}>
                <ModalHeader style={{textAlign: 'center'}} >{language==='English'?'Customize your user card':'ユーザーカードDIY'}
                <Button id='card_change' style={{color: 'green', background: 'transparent', position: 'relative', top: '-5px', right: '-12px', border: '0'}} onClick={(e)=>{
                        if(!document.getElementById('c_image').value){
                            const description = document.getElementById('c_des').value;
                            socket.emit('card', email, description, false)
                            setDescription(description);
                            setRight('Setting');setUC(false)
                            return
                        }
                        
                        function temp(){
                            var formData = new FormData();
                            var imagefile = document.querySelector('#c_image');
                            formData.append("img", imagefile.files[0]);
                            axios.post('https://miaomiao-server.herokuapp.com/card', formData, {
                                headers: {
                                'Content-Type': 'multipart/form-data'
                                }
                            }).then(a=>'')
                        }
                        if(icon){
                            axios.delete("https://miaomiao-server.herokuapp.com/images/"+icon).then(a=>temp())
                        } else {
                            temp()
                        }
                        

                        e.preventDefault();
                        let img = document.getElementById('c_image').value.split('\\');
                        img = img[img.length-1]
                        let description = document.getElementById('c_des').value;


                        socket.emit('card', email, description, img)
                        setDescription(description);setIcon(img);
                        setRight('Setting');setUC(false)
                    }}><FaCheck size='28px'/></Button>
                </ModalHeader>
                <Form  autoComplete={'off'}>
                    <Label className='left10'>{language==='English'?'User Image':'イメージ'}</Label>
                    <Input className='left10 bot20' type='file' name='img' id='c_image'/>
                    <Label className='left10'>{language==='English'?'User Name':'名前'}</Label>
                    <Input className='left10 bot20' type='text' name='name' style={{width: '60%'}} value={name} disabled/>
                    <Label className='left10'>{language==='English'?'Email Address':'電子メールアドレス'}</Label>
                    <Input className='left10 bot20' type='text' name='email' style={{width: '60%'}} value={email} disabled/>
                    <Label className='left10'>{language==='English'?'Description':'自己紹介'}</Label>
                    <Input className='left10 bot20' type='text' name='description' id='c_des' style={{width: '80%'}} defaultValue={description}/>
                </Form>
                
            </Modal>
        </div>
    );
}

export default Homepage;