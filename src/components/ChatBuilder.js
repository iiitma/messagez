import React from 'react';
import { useSelector } from 'react-redux';
import { selectMe } from '../features/users';

export default function ChatBuilder(params) {

    const chat = params.chat;
    const user = params.user;
    const timeGroups = [...new Set(chat.messages.map((message)=> message.time))];
 const me = useSelector(selectMe);

    return (
        <>
        {
            chat.messages.length > 0 ?
            <div className="text-center">
            <span className="text-xs text-primary">{'Today' }</span>
        </div>: ''
        }
        
        {
            timeGroups.map((timeGroup, i) => {
                const toMe = chat.messages.filter((message)=> message.from === user.id && message.time === timeGroup);
                const fromMe = chat.messages.filter((message)=> message.from !== user.id && message.time === timeGroup);
                return (
                    <div key={i}>
                    {
                        toMe.length > 0 ? 
                        <div className="row align-items-start my-2" key={timeGroup+'a'}  id={timeGroup+'a'}>
                        <div className="col-auto">
                               <img src={user.avatar} alt={user.fullName}
                                   className="avatar avatar-sm  rounded-circle" />
                           </div>
                           <div className="col ps-1">
                               <h6 className="mb-n1 text-sm">{user.fullName} <span className="text-xxs text-gray ps-2">{timeGroup}</span></h6> 
                              <div className="my-2">
                              {
                                  toMe.map((message, i)=>{
                                    return (<Message key={message.id+i} id={message.id+i} message={message}/>)
                                })
                       }
                              </div>
                           </div>
                   </div>: ''
                    }
                    {
                      fromMe.length > 0 ? 
                      <div className="row align-items-start text-right float-right my-2" key={timeGroup+'b'} id={timeGroup+'b'}>
                         <div className="col pe-1">
                             <h6 className="mb-n1 text-sm text-end"><span className="text-xxs text-gray ps-2">{timeGroup}</span> You</h6> 
                            <div className="my-2">
                            {
                                fromMe.map((message, i)=>{
                                  return (<Message key={message.id+i} id={message.id+i} me={true} message={message}/>)
                              })
                     }
                            </div>
                         </div>
                         <div className="col-auto">
                             <img src={me.avatar} alt={'You'}
                                 className="avatar avatar-sm  rounded-circle" />
                         </div>
                 </div>: ''  
                    }

                    </div>
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