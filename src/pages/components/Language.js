import React from 'react';
import {FaArrowAltCircleLeft} from 'react-icons/fa'


function Language({back, language, setLanguage}) {
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
                <button style={{background: 'transparent', fontSize:'32px', marginLeft: '10px', position: 'absolute', zIndex:'10'}} className='chat-btn' onClick={()=>{ clearInterval(interval);back() }}><FaArrowAltCircleLeft/></button>
                <div style={{width: '100%', height: '100%'}}>
                    <button style={{left: japan_x, top: japan_y, zIndex: '2'}} onClick={()=>{ setLanguage('Japanese'); clearInterval(interval); }} id='japn-ball' className='ball'></button>
                    <button style={{left: usa_x, top: usa_y, zIndex: '2'}} onClick={()=>{setLanguage('English');clearInterval(interval);}} id='usa-ball' className='ball'></button>
                    <h4 style={{position: 'relative', top: '36%', width: '100%', textAlign: 'center'}}>Choose your language</h4>
                </div>
            </div>)
}

export default Language;