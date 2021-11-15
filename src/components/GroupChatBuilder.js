import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { selectMe } from '../features/users';

export default function GroupChatBuilder(params) {

    const chat = params.chat;
    const members = params.members;
    const me = useSelector(selectMe);

    useEffect(() => {
    })

    return (
        <>
{
            chat.messages.length > 0 ?
            <div className="text-center">
            <span className="text-xs text-primary">{'Today' }</span>
        </div>: ''
        }

{
    chat.messages.map((message)=> {
        const member = members.find((user)=> user.id === message.from);
        return (
            member.id === me.id ? 

(
<div className="row align-items-start text-right float-right my-2" key={message.id} id={message.id}>
                             <div className="col pe-1">
                                 <h6 className="mb-n1 text-sm text-end"><span className="text-xxs text-gray ps-2">{message.time}</span> You</h6> 
                                <div className="my-2">
                                <Message key={message.id} id={message.id} me={true} message={message}/>
                                </div>
                             </div>
                             <div className="col-auto">
                                 <img src={me.avatar} alt={'You'}
                                     className="avatar avatar-sm  rounded-circle" />
                             </div>
                             
                             </div>
):
(  <div className="row align-items-start right my-2" key={message.id} id={message.id}>
<div className="col-auto">
<img src={member.avatar} alt={member.fullName}
    className="avatar avatar-sm  rounded-circle" />
</div>
<div className="col ps-1">
<h6 className="mb-n1 text-sm text-start">{ member.fullName} <span className="text-xxs text-gray ps-2">{message.time}</span></h6> 
<div className="my-2">
<Message key={message.id} id={message.id}  message={message}/>
</div>
</div>
</div>) 
        )
    })
}

        </>
    )


}


function Message(params){
    const message = params.message;
    return (
        <div className={`my-1 ${params.me ? 'text-end' : ''}`} key={params.id} id={params.id}>
     <div className={`message-bubble py-1 ${params.me ? 'me' : ''}`}>
         <div className="card-body px-3 py-2">
             <p className="mb-0 text-sm text-normal card-text">{message.text}</p>
         </div>
     </div>
        </div>

    )
 }