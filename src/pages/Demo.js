import React ,{useState, useEffect}from 'react';
import './css/homepage.css'
import { FaUserSlash,FaEdit,FaArrowAltCircleLeft,FaCog, FaComment, FaUserFriends, FaUserCircle, FaSignOutAlt, FaPlus, FaSearch, FaCheck, FaTimes, FaLanguage, FaKey, FaImage, FaCircle, FaAcquisitionsIncorporated } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import { CSSTransition } from 'react-transition-group';
import {useSelector, useDispatch} from 'react-redux';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Button, Modal,  ModalFooter, ModalHeader} from 'reactstrap';
import {cover_sign_language} from '../actions'
import axios from 'axios'

function Demo() {
    const [active, setActive] = useState('chat');
    const [width, setWidth] = useState(window.innerWidth);
    const [mobile_state, setMobileState] = useState('chat');
    const [lastUser, setLastUser] = useState(null);
    const dispatch = useDispatch();
    const language = useSelector(state=>state.cover_sign_language);
    const bg_photo = ['Aurora', 'Bridge', 'City', 'Forest', 'Prairie', 'Road', 'Sakura', 'Sea'];
    const [logoutWindow, setLogoutWindow] = useState(false);
    const [friendWindow, setFriendWindow] = useState(false);
    // wait for api 
    const requestReceived = ['Jack', 'Bob'];
    const history = [
        ['Alice', {me: false, msg: 'hello'}, {me: true, msg: 'world'}],
        ['Bard', {me: false, msg: 'hello2'}, {me: true, msg: 'world2'}]
    ];
    const friends = ['Alice', 'Bard'];
    const allUsers = ['Alice', 'Bard', 'Candy', 'David', 'Emily'];
    const [background, setBackground] = useState('Sakura');
    const requestSent = [];
    
    const [res, setRes] = useState(allUsers);
    const [chatList, setChatList] = useState(renderChatList(null));
    const [chatPanel, setChatPanel] = useState(renderChatPanel(lastUser));
    const [requestEle, setRequestEle] = useState(renderRequest());
    window.addEventListener("resize", function () {
        setWidth(window.innerWidth);
    })
    function renderChatList(str){
        
        if(str) {
            const regex = new RegExp(`^${str}`, 'gi');
            const temp = history.filter(user=>user[0].match(regex))
            if(temp.length === 0) return(<h5 style={{width: '100%', textAlign: "center", color: 'lightgray', marginTop: '10px'}}>No results</h5>)
            return (temp.map(user=> (<div id={user[0]} key={user[0]} className='chat-list-item' onClick={()=>{
                    setLastUser(user);setChatPanel(renderChatPanel(user));  setActive('chat')
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
        return (history.map(user=>{
            return (<div id={user[0]} key={user[0]} className='chat-list-item' onClick={()=>{
                 setActive('chat');setLastUser(user);setChatPanel(renderChatPanel(user)); 
                
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
    function renderChatPanel(user){
        if(!user){
            return (
                <h2 style={{position:'relative', top: '45%', width: '100%',  textAlign: 'center'}}>Click to start</h2>
            )
        }
        const username = user[0];
        const hist_array = user;
        return (
            <div className='chat-panel' style={{height: '100%'}}>
                <h3 style={{width: '100%', height: '10%', paddingTop: '15px', paddingLeft: '25px'}}>
                    {username}
                    <button className='chat-btn' id='more'><FaUserCircle/></button>
                </h3>
                
                <div style={{width: '100%', height: '70%', borderTop: 'white 1px solid',borderBottom: 'white 1px solid', listStyleType: 'none', paddingTop: '10px', overflow: 'scroll'}}>
                    {hist_array.map(msg=>msg.me?<li key={'li_' + msg.me + msg.msg+username} className='my_msg'>{msg.msg}</li>: msg.msg?<li className='their_msg'>{msg.msg}</li>:'')}
                    
                </div>
                <div style={{width: '100%', height: '20%'}}> 
                    <textarea />
                    <button className='send-btn'>send</button>
                </div>
            </div>
        )
    }
    

    
    function renderSetting(){
        return (
            
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Button onClick={()=>{setChatPanel(renderFile()); }} className='setting-btn'><FaUserCircle size={'28px'}/> <span style={{marginLeft: '20px'}}>My Card</span></Button>
                <Button onClick={()=>{setChatPanel(renderLanguage()); }} className='setting-btn'><FaLanguage size={'28px'} /><span style={{marginLeft: '20px'}}>Language</span></Button>
                <Button onClick={()=>{setChatPanel(renderPassword()); }} className='setting-btn'><FaKey size={'28px'}/> <span style={{marginLeft: '20px'}}>Password</span></Button>
                <Button onClick={()=>{setChatPanel(renderBackground()); }} className='setting-btn'><FaImage size={'28px'}/> <span style={{marginLeft: '20px'}}>Background</span></Button>
            </div>
        )
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
        setActive('chat');
        setChatPanel(renderChatPanel(lastUser));

    }
    function hashBg(photo){
        switch(photo){
            case'Aurora':
                return 'https://images.pexels.com/photos/375732/pexels-photo-375732.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            case'Bridge':
                return 'https://images.pexels.com/photos/2341830/pexels-photo-2341830.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            case'City':
                return 'https://images.pexels.com/photos/37646/new-york-skyline-new-york-city-city-37646.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            case'Forest':
                return 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            case'Prairie':
                return 'https://images.pexels.com/photos/464321/pexels-photo-464321.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            case'Road':
                return 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            case'Sakura':
                return 'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            case'Sea':
                return 'https://images.pexels.com/photos/164041/pexels-photo-164041.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            default: 
        }
    }
    function renderBackground(){
        return(
        <div style={{width: '100%', height: '100%', overflow: 'scroll'}}>
            <button style={{background: 'transparent', fontSize:'32px', marginLeft: '10px'}} className='chat-btn' onClick={()=>{ setChatPanel(renderSetting())}}><FaArrowAltCircleLeft/></button>
            <div style={{height: '90%', width: '80%', marginTop: '2%', marginLeft: '10%'}}>
                {bg_photo.map(photo=>(<div key={photo} style={{width: '100%', marginBottom: '20px'}}>
                    <button className='bg-btn' onClick={()=>{setBackground(photo)}} 
                    id={photo}></button>
                    <h5 style={{margin:"auto", textAlign: 'center'}}>{photo}</h5>
                </div>))}
            </div>
        </div>
        )
    }
    function renderFile(){
        return(
            <div onMouseMove={(e)=>{
                let x = (window.innerWidth/2+180-e.pageX)/10;
                let y = (window.innerHeight/2-e.pageY)/10;
                document.getElementById('card').style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
            }} 
            onMouseLeave={(e)=>{
                
                document.getElementById('card').style.transform = `rotateY(${0}deg) rotateX(${0}deg)`
            }}
            style={{display: 'flex', flexDirection: 'column', height: '100%', perspective: '1000px'}}>
                <div id='card' style={{margin: 'auto', height: '90%', width: '80%',border: 'white 1px solid'}}>
                    <button style={{background: 'transparent', fontSize:'32px', marginLeft: '10px'}} className='chat-btn' onClick={()=>{ setChatPanel(renderSetting())}}><FaArrowAltCircleLeft/></button>
                    <button style={{background: 'transparent', fontSize:'32px', marginRight: '10px', float: 'right'}} className='chat-btn' onClick={()=>{ alert('a')}}><FaEdit/></button>
                    <div style={{margin: 'auto', width: '100px', height: '100px', background: 'yellow', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '50%'}}></div>
                    <h5 style={{margin: 'auto', textAlign: 'center', marginTop: '25px'}}>user name</h5>
                    <h5 style={{margin: 'auto', textAlign: 'center', marginTop: '25px'}}>email address</h5>
                    <p style={{margin: 'auto', textAlign: 'center', paddingTop: '50px'}}>
                        I am who I am. It is what it is.
                    </p>
                </div>
            </div>)
    }
    function renderPassword(){
        return(
            <div style={{width: '100%', height: '100%', overflow: 'scroll'}}>
                <button style={{background: 'transparent', fontSize:'32px', marginLeft: '10px'}} className='chat-btn' onClick={()=>{ setChatPanel(renderSetting())}}><FaArrowAltCircleLeft/></button>
                <Input style={{marginTop: '70px'}} type="password" name="password" className="setting-password search" placeholder={language==='English'? "old password": 'パスワード'} />
                <Input type="password" name="password" className="setting-password search" placeholder={language==='English'? "new password": 'パスワード'} />
                <Input type="password" name="password" className="setting-password search"  placeholder={language==='English'? "confirm password": 'パスワード'} />
                <Button id='ps-submit' outline color='success'>submit</Button>
            </div>
        )
    }
    function renderLanguage(){
        let usa_x = Math.floor(Math.random()*38)*10 - 60;
        let usa_y = Math.floor(Math.random()*52)*10;
        
        let japan_x = Math.floor(Math.random()*38)*10;
        let japan_y = Math.floor(Math.random()*52)*10;

        // 0-> right up 1-> right down 2-> left up 3-> left down 
        let usa_direction = Math.floor(Math.random()*4);
        let japan_direction = Math.floor(Math.random()*4);
        while(usa_direction===japan_direction){
            japan_direction = Math.floor(Math.random()*4);
        }

        function update(){
            const japan = document.getElementById('japn-ball');
            const usa = document.getElementById('usa-ball');
            if(!japan){
                clearInterval(interval);
                return
            }
            let x = japan_x;
            let y = japan_y;
            switch(japan_direction){
                case 0:
                    x+=10; y-=10;
                    if(x>380&&y<0){
                        japan_direction = 3;
                        japan_x -= 10;
                        japan_y+=10;
                    } else if(x>380){
                        japan_direction = 2;
                        japan_x -= 10;
                        japan_y=y
                    } else if(y<0){
                        japan_direction = 1;
                        japan_y+=10;
                        japan_x = x
                    } else {
                        japan_x = x;
                        japan_y = y;
                    }
                    break
                case 1:
                    x+=10; y+=10;
                    if(x>380&&y>520){
                        japan_direction = 2;
                        japan_x-=10;
                        japan_y-=10;
                    } else if(x>380){
                        japan_direction = 3;
                        japan_x-=10;
                        japan_y=y
                    } else if(y>520){
                        japan_direction = 0;
                        japan_y-=10;
                        japan_x = x
                    } else {
                        japan_x = x;
                        japan_y = y;
                    }
                    break
                case 2:
                    x-=10; y-=10;
                    if(x<0&&y<0){
                        japan_direction = 1;
                        japan_x+=10;
                        japan_y+=10;
                    } else if(x<0){
                        japan_direction = 0;
                        japan_x+=10;
                        japan_y=y
                        
                    } else if(y<0){
                        japan_direction = 3;
                        japan_y+=10;
                        japan_x = x
                    } else {
                        japan_x = x;
                        japan_y = y;
                    }
                    break
                default:
                    x-=10; y+=10;
                    if(x<0&&y>520){
                        japan_direction = 0;
                        japan_x+=10;
                        japan_y-=10;
                    } else if(x<0){
                        japan_direction = 1;
                        japan_x+=10;
                        japan_y=y
                    } else if(y>520){
                        japan_direction = 2;
                        japan_y-=10;
                        japan_x = x

                    } else {
                        japan_x = x;
                        japan_y = y;
                    }
            }
            x = usa_x;
            y = usa_y;
            switch(usa_direction){
                case 0:
                    x+=10; y-=10;
                    if(x>320&&y<0){
                        usa_direction = 3;
                        usa_x -= 10;
                        usa_y+=10;
                    } else if(x>320){
                        usa_direction = 2;
                        usa_x -= 10;
                        usa_y=y
                    } else if(y<0){
                        usa_direction = 1;
                        usa_y+=10;
                        usa_x = x
                    } else {
                        usa_x = x;
                        usa_y = y;
                    }
                    break
                case 1:
                    x+=10; y+=10;
                    if(x>320&&y>520){
                        usa_direction = 2;
                        usa_x-=10;
                        usa_y-=10;
                    } else if(x>320){
                        usa_direction = 3;
                        usa_x-=10;
                        usa_y=y
                    } else if(y>520){
                        usa_direction = 0;
                        usa_y-=10;
                        usa_x = x
                    } else {
                        usa_x = x;
                        usa_y = y;
                    }
                    break
                case 2:
                    x-=10; y-=10;
                    if(x<-60&&y<0){
                        usa_direction = 1;
                        usa_x+=10;
                        usa_y+=10;
                    } else if(x<-60){
                        usa_direction = 0;
                        usa_x+=10;
                        usa_y=y
                        
                    } else if(y<0){
                        usa_direction = 3;
                        usa_y+=10;
                        usa_x = x
                    } else {
                        usa_x = x;
                        usa_y = y;
                    }
                    break
                default:
                    x-=10; y+=10;
                    if(x<-60&&y>520){
                        usa_direction = 0;
                        usa_x+=10;
                        usa_y-=10;
                    } else if(x<-60){
                        usa_direction = 1;
                        usa_x+=10;
                        usa_y=y
                    } else if(y>520){
                        usa_direction = 2;
                        usa_y-=10;
                        usa_x = x

                    } else {
                        usa_x = x;
                        usa_y = y;
                    }
            }
            japan.style.left = japan_x + 'px';
            japan.style.top = japan_y + 'px';
            usa.style.left = usa_x + 'px';
            usa.style.top = usa_y + 'px';
        }
        const interval = setInterval(update, 100);
        return(
            <div style={{width: '100%', height: '100%', overflow: 'scroll'}}>
                <button style={{background: 'transparent', fontSize:'32px', marginLeft: '10px', position: 'absolute', zIndex:'10'}} className='chat-btn' onClick={()=>{ clearInterval(interval);setChatPanel(renderSetting()); }}><FaArrowAltCircleLeft/></button>
                <div style={{width: '100%', height: '100%'}}>
                    <button style={{left: japan_x, top: japan_y, zIndex: '2'}} onClick={()=>{ dispatch(cover_sign_language('Japanese'));setChatPanel(renderSetting()); clearInterval(interval); }} id='japn-ball' className='ball'></button>
                    <button style={{left: usa_x, top: usa_y, zIndex: '2'}} onClick={()=>{dispatch(cover_sign_language('English'));setChatPanel(renderSetting()); clearInterval(interval);}} id='usa-ball' className='ball'></button>
                    <h4 style={{position: 'relative', top: '36%', width: '100%', textAlign: 'center'}}>Choose your language</h4>
                </div>
            </div>)
    }
    function switch_to_setting(){
        setActive('setting');
        
        setChatPanel(renderSetting())
    }




    return (
        <div className='homepage' style={{backgroundImage: `url(${hashBg(background)})`}}>
            <div className='shadow'></div>
            
            {width>=800?
                (<div className='chat-window'> 
                    <nav className='navbar'>
                        <button onClick={switch_to_chat} className='chat-btn' id='chat'><FaComment size={28} style={{color: active==='chat'? 'rgb(91, 226, 79)': ''}}/></button>
                        <button onClick={switch_to_setting} className='chat-btn' id='setting'><FaCog size={28} style={{color: active==='setting'? 'rgb(91, 226, 79)': ''}}/></button>
                        <button onClick={()=>{setLogoutWindow(!logoutWindow)}} className='chat-btn' id='logout'><FaSignOutAlt size={28} /></button>
                    </nav>
                    
                    <div className='main-interface'>
                        <div className='middle'>
                            <div className='mid-header'>
                                <InputGroup className='search-container'>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText><FaSearch size={16}/></InputGroupText>
                                    </InputGroupAddon>
                                    <Input className='search' placeholder="Search" onChange={(e)=>{e.preventDefault();e.stopPropagation();e.nativeEvent.stopImmediatePropagation();setChatList(renderChatList(e.target.value))}}/>
                                </InputGroup>
                                <button onClick={()=>{setFriendWindow(!friendWindow)}} className='chat-btn' id='w-add'><FaPlus size={28} /></button>

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
                            
                            {chatPanel}
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
                <ModalHeader style={{textAlign: 'center'}} >You want to leave now?</ModalHeader>
                
                <ModalFooter>
                    <Link to='/sign'><Button color="primary" onClick={()=>{setLogoutWindow(!logoutWindow)}}>Confirm</Button></Link>
                    <Button color="secondary" onClick={()=>{setLogoutWindow(!logoutWindow)}}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={friendWindow} toggle={()=>{setFriendWindow(!friendWindow)}} style={{position: 'relative', top: '100px', width: '300px'}}>
                <ModalHeader style={{textAlign: 'center'}} >Search user by name</ModalHeader>
                <Input type='text' style={{width: '90%', marginLeft: '10px', marginTop: '5px'}} onChange={(e)=>{
                    const regex = new RegExp(`^${e.target.value}`, 'gi');
                    setRes(allUsers.filter(user=>user.match(regex)));
                }}></Input>
                <p style={{paddingLeft: '5px'}}>Notice: Your friends and users you have sent request will not be displayed here</p>
                <div style={{height: '200px', overflow: 'scroll'}}>
                    {res.filter(user=>!friends.includes(user)&&!requestSent.includes(user)).map(user=><div key={'add_'+user} style={{height: '50px', paddingTop: '5px'}}>
                        <span style={{fontSize: '20px', marginLeft: '10px', marginTop: '3px'}}>{user}</span>
                        <Button outline color='info' style={{float: 'right', marginRight: '5px'}}>send</Button>
                    </div>)}
                </div>
                
            </Modal>
        </div>
    );
}

export default Demo;