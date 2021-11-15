import React, {useState, useEffect} from 'react'
import ChatBuilder from './ChatBuilder';
import ChatOptions from './ChatOptions';
import {useSelector, useDispatch } from 'react-redux';
import {readChat, sendMessage } from '../features/chats';
import { selectMe, selectFriends } from '../features/users';
import Message from '../models/Message';
import GroupChatBuilder from './GroupChatBuilder';

export default function Conversation(params) {

  const dispatch = useDispatch();
  const user = params.user;
  const chat = params.chat;
  const me = useSelector(selectMe);
  const friends = useSelector(selectFriends);
  const members = [me, ...friends.filter((user) => chat.members.includes(user.id))];

  const [optionsOpen, setOptionsOpen] = useState(false);
  const optionsToggle = () => {
        setOptionsOpen((current) => !current, );
      };
  const [chatText, setChatText] = useState('');

  const sendChat = (event)=> {
    if(chatText.trim().length > 0){
    const text = chatText;
    let newMessageFromMe = new Message (text, me.id);
    // console.log(newMessageFromMe)
    dispatch(sendMessage({id: chat.id, message: newMessageFromMe }));
    setChatText('');
    event.preventDefault();
  }
  }


  const clickActionFromParent = (id)=>{
    return params.clickAction(id);
  }



    useEffect(() => {
      // console.log("component updated");
      document.getElementById('chat-input-input').focus();
      dispatch(readChat({id: chat.id, myId: me.id}))

     

    }, [chat.id, dispatch, me.id]);

    useEffect(() => {
      if(optionsOpen){
        document.getElementById('chat-options').classList.add('show');
      } else {
        document.getElementById('chat-options').classList.remove('show');
      }
    })




    
    return (

        <>
      <div id="conversation" className="col conversation">
  
  
        <header className="card rounded-0 shadow-none conversation-header sticky-top border border-bottom">
          <div className="card-body px-lg-4 px-2 py-lg-2 pt-3">
          <div className="row align-items-center ">
              <div className="col-auto chat-avatar">
        {
          chat.type === 'group' ?
          <img
          src={chat.groupAvatar}
          alt={chat.groupName}
          className="avatar  rounded-circle"
        /> :
        <img
        src={members[1].avatar}
        alt={members[1].fullName}
        className="avatar  rounded-circle"
      />
        }
              </div>
              <div className="col ps-1 overflow-hidden">
              <h6 className="chat-name mb-n1 text-nowrap text-truncate">{ chat.type === 'group' ? chat.groupName : members[0].fullName}</h6>
              {
              
              chat.type === 'group' ?
              <span className="text-truncate text-xs mb-0 text-gray">{members.length} members { members.filter((user)=> user.isOnline).length > 0 ? `, ${ members.filter((user)=> user.isOnline).length} online` : ''}</span>
              :
              members[1].isOnline ? 
              <span className="text-truncate text-xs mb-0 text-gray"> Online</span> : ''
              
              }
              </div>
              <div className="col-auto conversation-menu btn-group">
              <span className="px-2 conversation-menu-option"><svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-search"  viewBox="0 0 24 24">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                </svg></span>
              <span onClick={optionsToggle} className="px-2 conversation-menu-option"><svg xmlns="http://www.w3.org/2000/svg" className={`icon-tabler icon-tabler-layout-sidebar-right ${optionsOpen ? 'active' : '' }`}  viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <rect x="4" y="4" width="16" height="16" rx="2" />
  <line x1="15" y1="4" x2="15" y2="20" />
</svg></span>
              <span className="px-2 conversation-menu-option"><svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-dots-vertical"  viewBox="0 0 24 24">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="19" r="1" />
                <circle cx="12" cy="5" r="1" />
                </svg></span>
              </div>
              </div>
          </div>
        </header>
  
        <div className=" conversation-body px-lg-4 px-2 py-4">
   


                {chat.type=== 'group'? 
                <GroupChatBuilder members={members} chat={chat} /> :
                <ChatBuilder user={user} chat={chat} />
                
              }
        </div>
  
                <div className="card rounded-0 shadow-none conversation-footer">
                <div className="card-body px-lg-4 px-2 py-3">
                  <form onSubmit={event => sendChat(event)}>
                <div className="input-group input-group-lg mb-3">
                <span className="input-group-text">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-paperclip" viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
</svg>
                </span>
    <input id="chat-input-input" type="text" className="form-control px-2" autoFocus={true} value={chatText} onChange={event => setChatText(event.target.value)} placeholder="Your Messages.." aria-label="Chat Text" aria-describedby="button-addon1"/>
    <span className="input-group-text">
    <svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-microphone" viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <rect x="9" y="2" width="6" height="11" rx="3" />
  <path d="M5 10a7 7 0 0 0 14 0" />
  <line x1="8" y1="21" x2="16" y2="21" />
  <line x1="12" y1="17" x2="12" y2="21" />
</svg>
    </span>
    <span className="input-group-text">
    <svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-mood-suprised" viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="12" cy="12" r="9" />
  <line x1="9" y1="9" x2="9.01" y2="9" />
  <line x1="15" y1="9" x2="15.01" y2="9" />
  <circle cx="12" cy="15" r="2" />
</svg>
    </span>
    <span className="input-group-text " type="submit" onClick={event => sendChat(event)} >
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send send" viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="10" y1="14" x2="21" y2="3" />
  <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
</svg>
    </span>

  </div>
  </form>
                </div>
                </div>
      </div>

{/* ..  */}

               {chat.id !==null ? <ChatOptions id={chat.id} members={members} chat={chat}  show={optionsOpen} toggleAction={optionsToggle}  clickAction={(id) => clickActionFromParent(id)} /> : ''}

      </>
    )
  }
