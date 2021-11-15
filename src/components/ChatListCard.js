import React from 'react'
import { useSelector } from 'react-redux';
import { selectMe , selectFriends} from '../features/users';



export default function ChatListCard(params) {
        const chat = params.chat;
        // const user = params.user;
        const me = useSelector(selectMe);
        const friends = useSelector(selectFriends);

        const members = friends.filter((user) => chat.members.includes(user.id));


        const userName = (id)=>{

    
          return id === me.id ? 'You' : members.find((member) => member.id === id).fullName
        }


  return (
      <div className={`card rounded-0 shadow-none chat ${params.active ? 'active' : ''}`} onClick={params.clickAction}>
        <div className="card-body px-4 py-3">
          {

            chat.type === 'group' ?
            <div className="row align-items-center ">
            <div className="col-auto chat-avatar">
            <img
      src={chat.groupAvatar}
      alt={chat.groupName}
      className="avatar  rounded-circle"
    />
            </div>
            <div className="col ps-1 overflow-hidden chat-details-1">
            <h6 className="chat-name mb-n1">{chat.groupName}</h6>
              {
                chat.lastMessage ?
                <span className="text-truncate text-xs mb-0 text-gray">{userName(chat.lastMessage.from)}: {chat.lastMessage.text}</span> : ''}
            </div>
            <div className="col-auto chat-details-2">
            <h6 className="text-xs ms-auto text-uppercase text-gray">{chat.lastMessage.time || ''}</h6>
          {  chat.unread(me.id) > 0 ?
            <span className="badge bg-danger rounded-circle unread-badge ms-4">{chat.unread(me.id)}</span> :
            ''
          }
            </div>
            </div> : 
                <div className="row align-items-center ">
                <div className="col-auto chat-avatar">
                <img
          src={members[0].avatar}
          alt={members[0].name}
          className="avatar  rounded-circle"
        />
        {members[0].isOnline ? <i className="active-badge border border-3 border-white fa fa-circle mb-0 position-absolute rounded-circle text-success"></i> : ''}
        {chat.unread(me.id) > 0 ? <span className="badge bg-danger rounded-circle unread-badge position-absolute start-5">{chat.unread(me.id)}</span> : ''}
                </div>
                <div className="col ps-1 overflow-hidden chat-details-1">
                <h6 className="chat-name mb-n1">{members[0].fullName}</h6>
                <span className="text-truncate text-xs mb-0 text-gray">{chat.lastMessage}</span>
                </div>
                <div className="col-auto chat-details-2">
                <h6 className="text-xs ms-auto text-uppercase text-gray">{chat.messages[chat.messages.length-1]?.time || ''}</h6>
              {  chat.unread(me.id) > 0 ?
                <span className="badge bg-danger rounded-circle unread-badge ms-4">{chat.unread(me.id)}</span> :
                chat.read(members[0].id) ?
                 <span className="text-primary  text-xs ms-4"><i className="fal fa-check-double"></i></span> :
                 chat.read(members[0].id) !== null ?
                 <span className="text-gray  text-xs ms-4"><i className="fal fa-check-double"></i></span> : ''
              }
                </div>
                </div>

    
      }
        </div>
      </div>
         


  )
}


