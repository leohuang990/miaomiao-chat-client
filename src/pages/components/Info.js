import React from 'react';

function Info({language}) {
    return (
        <div style={{padding: '20px 40px', overflow: 'scroll', height: '100%'}}>
            <h4>{language==='English'?'Welcome to Miao Miao Chat App':'ミャオミャオチャットアプリへようこそ'} <img src='favicon.jpg' style={{width: '60px', height: '60px'}} alt=''></img></h4>
            <br></br>
            <p>{language==='English'?'Tips:':'チップ：'}</p>
            <p>{language==='English'?'1. Please use the navbar on the left to navigate. ':'1.左側のナビゲーションバーを使用してナビゲートしてください。'}</p>
            <p>{language==='English'?'2. To add friends, please click the plus button on the top. If you still cannot find the user, please refresh the page and search again. '
            :'2.友達を追加するには、上部のプラスボタンをクリックしてください。それでもユーザーが見つからない場合は、ページをリフレッシュしてもう一度検索してください。'}
            </p>
            <p>{language==='English'?'3. In chat panel, the botton at top-right corner is used to view the user card, while that in user card is used to unfriend this user.'
            :'3.チャットパネルでは、右上隅のボタンを使用してユーザーカードを表示し、ユーザーカードの右上のボタンを押したらこのユーザーを友達から削除します。'}
            </p>
            <p>{language==='English'?'4. For aesthetic purpose, all scrollbars are hidden, but you still can scroll the window to view more contents.'
            :'4.見栄えを良くするために、すべてのスクロールバーは非表示になっていますが、ウィンドウをスクロールしさらに多くのコンテンツをみることができます。'}
            </p>
            <p>{language==='English'?' 5. Since this is a real-time chat app, if you send messages or receive messages from your friends, the chat window will update immediately and automatically scroll to bottom. '
            :'5.これはリアルタイムチャットアプリなので、友達からメッセージを送信したり受信したりすると、チャットウィンドウがすぐに更新され、自動的に一番下までスクロールします。'}
            </p>
            <p>{language==='English'?'6. For the setting page, you are able to edit your card, and change language, password, and background and your preference settings will be saved in database.'
            :'6.設定ページでは、カードを編集したり、言語、パスワード、背景を変更したりできます。設定はデータベースに保存されます。'}
            </p>
            <p>{language==='English'?'7. After successful login, the login state will remain active for one hour. After one hour, please login again. To manually logout, please click the exit button on the narbar.'
            :'7.ログインに成功すると、ログイン状態は1時間内有効です。 1時間後、再度ログインしてください。手動でログアウトするには、ナルバーの終了ボタンをクリックしてください。'}
            </p>
            <p>Acknowledgement:</p>
            <p>The idea of this chat app is strongly motivated by Mr. Trump's efforts to block WeChat in America. To people who have been using WeChat for so many years, it would be a real disaster
            and this project eventually takes me a whole winter break.</p>
            <p>Most functionalities as well as icon was inspired by WeChat of Tencent and those wonderful background images come from a similarly wonderful website Pexels.</p>
            <p>If you have any question or advice, please feel free to contact me. My email address: haopenghuang0@gmail.com</p>

        </div>
    );
}

export default Info;