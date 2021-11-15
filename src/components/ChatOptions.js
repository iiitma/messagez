import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch } from 'react-redux';
import {clearConversation, changeChatNotification } from '../features/chats';
import ChatList from '../components/ChatList'

export default function ChatOptions(params) {
    const members = params.members;
    const chat = params.chat;
    const dispatch = useDispatch();

    const notifications = useSelector((state) => state.chats.value.find((chatItem) => chatItem.id === chat.id).notifications);
      const switchNotification = () => {
        dispatch(changeChatNotification({id: chat.id}))
      };
      useEffect(() => {

      }, [])

      const close =() =>{
        document.getElementById('chat-options').classList.remove('show');
        params.toggleAction()
      }

      const goToChat =(id) => {
        params.clickAction(id);
      }


   return chat.type === 'group' ? 
   (
    <div id="chat-options" className={`chat-options border-start border flex-column`}>
        <header className="card rounded-0 shadow-none chat-options-header sticky-top">
            <div className="card-body px-4">
                <div className="row align-items-center ">
                    <h6 className="col mb-0">
                        Group Info
                    </h6>
                    <div className="col-auto">
                        <span onClick={close}><svg xmlns="http://www.w3.org/2000/svg"
                                className="icon-tabler icon-tabler-x active" viewBox="0 0 24 24">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg></span>
                    </div>
                </div>
            </div>
        </header>
        <div className="chat-options-body px-4 mb-auto">
            <div className="chat-options-description py-3">
                <h6 className="text-uppercase text-xxs text-gray">Description</h6>
                <p className="text-sm pt-2">{chat.groupDescription}</p>
            </div>
            <hr />
            <div className="notification d-flex align-items-center">
                <h6 className="col small mb-0">Notifications</h6>
                <div className="form-check form-switch col-auto">
                    <input className="form-check-input" type="checkbox" onChange={switchNotification} checked={notifications} />
                </div>
            </div>
            <hr />
            <div className="members">
                <div className="d-flex align-items-center">
                    <h6 className="text-uppercase text-xxs text-gray mb-0">Members</h6>
                    <span className="ms-auto"><i className="fa fa-chevron-down text-normal text-sm"></i></span>
                </div>
                <div className="py-2">
                    {
                        members.map((member, i)=>{
                            return  i===0 ?
                            <MemberCard member={member} key={member.id} />:
                             <MemberCard member={member} key={member.id} clickAction={()=>{goToChat(member.id)}} style={{cursor: "pointer"}} />
                        })
                    }
                </div>
            </div>

        </div>

        <div className="chat-options-footer px-4">
            <button className="btn btn-danger btn-link w-100 text-capitalize">
                Clear Conversation
            </button>
        </div>

    </div>
   ) :
   (
       <>
    <div id="chat-options" className={`chat-options border-start border flex-column`}>
        <header className="card rounded-0 shadow-none chat-options-header sticky-top">
            <div className="card-body px-4">
                <div className="row align-items-center ">
                    <h6 className="col mb-0">
                        Contact Info
                    </h6>
                    <div className="col-auto">
                        <span onClick={close}><svg xmlns="http://www.w3.org/2000/svg"
                                className="icon-tabler icon-tabler-x active" viewBox="0 0 24 24">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg></span>
                    </div>
                </div>
            </div>
        </header>
        <div className="chat-options-body px-4 mb-auto">
            <div className="chat-options-image">
                <img src={members[1].avatar} alt="" className="w-100 rounded-3" />
            </div>
            <div className="pt-3 d-flex">
               <div className="col">
               <h6 className="mb-0 lh-1">{members[1].fullName}</h6>
                {
                members[1].isOnline ?
                <small className="text-success text-xs">Online</small> :
                <small className="text-secondary text-xs">Offline</small>
                }
               </div>
<div className="col-auto px-0">
                    <span className="pe-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-phone"
                            viewBox="0 0 24 24">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                        </svg>
                    </span>
                    <span className="pe-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-message-dots"
                            viewBox="0 0 24 24">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                            <line x1="12" y1="11" x2="12" y2="11.01" />
                            <line x1="8" y1="11" x2="8" y2="11.01" />
                            <line x1="16" y1="11" x2="16" y2="11.01" />
                        </svg>
                    </span>
                </div>

            </div>


            <hr />
            <div className="notification d-flex align-items-center py-2">
                <h6 className="col small mb-0">Notifications</h6>
                <div className="form-check form-switch col-auto">
                    <input className="form-check-input" type="checkbox"  onChange={switchNotification} checked={notifications} />
                </div>
            </div>
            <hr />
        </div>

        <div className="chat-options-footer px-4">
            <button className="btn btn-danger btn-link w-100 text-capitalize" onClick={()=> dispatch(clearConversation({id: chat.id}))}>
                Clear Conversation
            </button>
        </div>

    </div>
    </>
   )
   

}



function MemberCard(params){
   return (
    <div className="card rounded-0 shadow-none chat my-2" onClick={params.clickAction} style={params.style}>
        <div className="card-body p-1">
            <div className="row align-items-center ">
                <div className="col-auto chat-avatar">
                    <img src={params.member.avatar} alt={params.member.fullName}
                        className="avatar avatar-sm  rounded-circle" />
                </div>
                <div className="col ps-1 overflow-hidden">
                    <h6 className="mb-n1 text-xs">{params.member.fullName}</h6>
                    {
                    params.member.isOnline ?
                    <span className="text-xs mb-0 text-success">Online</span> :
                    <span className="text-xs mb-0 text-secondary">Offline</span>
                    }
                </div>
                <div className="col-auto px-0">
                    <span className="pe-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-phone"
                            viewBox="0 0 24 24">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                        </svg>
                    </span>
                    <span className="pe-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-message-dots"
                            viewBox="0 0 24 24">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                            <line x1="12" y1="11" x2="12" y2="11.01" />
                            <line x1="8" y1="11" x2="8" y2="11.01" />
                            <line x1="16" y1="11" x2="16" y2="11.01" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    </div>
   )
}