import React, {useState, useEffect} from 'react'
import ChatListCard from './ChatListCard'
import { useSelector } from 'react-redux';
import { chatCount, selectChatList } from '../features/chats';
import { selectFriends, selectFriendsForSearch } from '../features/users';
import Conversation from './Conversation';




export default function ChatList(params) {
  const count = useSelector(chatCount);
  const chatList = useSelector(selectChatList);
  const friends = useSelector(selectFriends)
  const friendsForSearch = useSelector(selectFriendsForSearch);

  const [activeChat, setActiveChat] = useState(chatList[2]);
  const chooseChat = (chat) => {
    setActiveChat(chat);
  };

  const [searchItem, setSearchItem] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const searchList = (event) =>{
    setSearchItem(event.target.value)
    const result = friendsForSearch.filter((user) => user.fullName.toLowerCase().includes(event.target.value.toLowerCase() )).map((user) => {return user.id});
    setSearchResult(result);
  }

  const chooseChatByUserId = (id) =>{
      const chat = chatList.find((chat)=> chat.type === 'user' && chat.members.includes(id));
     if(chat){
      chooseChat(chat);
     }
  }

  const [showSideNav, setShowSideNav] = useState(false);
  useEffect(() => {
    if(showSideNav){
      document.getElementById('sidenav').classList.add('start-0', 'position-relative');
      document.getElementById('chat-list').classList.remove('close');
      document.getElementById('chat-list').classList.add('open');
    } else{
      document.getElementById('sidenav')?.classList.remove('start-0', 'position-relative');
      document.getElementById('chat-list').classList.add('close');
      document.getElementById('chat-list').classList.remove('open');
    }
  });


  useEffect(() => {
    count > 0 ?
    document.title = `Messages (${count})`:
    document.title = `Messages`;
  }, [count]);


  
 


    return (
      <>
        <div id="chat-list" className="col-auto chat-list align-items-left close">
            <header className="chat-list-header px-4 pb-3 pt-4 sticky-top">
                <div className="row align-items-center mb-3 g-0">
                <div className="col-auto d-lg-none mx-auto"  onClick={()=> {setShowSideNav((current) => !current)}}>
                  {
showSideNav ? 
   
<span>
<svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-x" viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="18" y1="6" x2="6" y2="18" />
  <line x1="6" y1="6" x2="18" y2="18" />
</svg>
</span>:    <span ><svg xmlns="http://www.w3.org/2000/svg" className="icon-tabler icon-tabler-menu" viewBox="0 0 24 24">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="4" y1="8" x2="20" y2="8" />
  <line x1="4" y1="16" x2="20" y2="16" />
</svg></span> 
     }
        </div>
                <h4 className="text-bold lh-1 col mb-0 px-lg-0 ps-sm-3 chat-count">Messages <span className="text-primary">({count})</span></h4>
                </div>
                <div className="mb-0">
                <div className="">
      <div className="input-group mb-0 ">
        <span className="input-group-text"><i className="fal fa-search" aria-hidden="true"></i></span>
        <input className="form-control form-control-md" onChange={event => searchList(event)} value={searchItem} placeholder="Search" type="text" />
      </div>
    </div>
  </div>
            </header>
          <div className="chat-list-body">
          <div className={`search-result-chats overflow-hidden my-4 ${searchItem.length < 1 ? 'd-none' : ''}`}>
                <div className="mx-4">
                  <div className="row">
                  <h6 className="text-uppercase text-xxs text-gray col mb-0">Search Results</h6>
                  <span onClick={()=> setSearchItem('')} className="col-auto h6 ms-auto text-uppercase text-xxs">Cancel</span>
                  </div>

                 
                </div>
               {
                 chatList.filter((chat)=> chat.members.some(r=>  searchResult.includes(r))).map((chat)=>{
                  return( <ChatListCard key={chat.id} chat={chat} clickAction={() => chooseChat(chat)} active={chat.id === activeChat.id} />)
                })
               }
               
              </div>
              <div className={`pinned-chats overflow-hidden my-4 ${searchItem.length > 0 ? 'd-none' : ''}`}>
                <div className="mx-4">
                  <h6 className="text-uppercase text-xxs text-gray">Pinned</h6>
                </div>
                {
                  chatList.filter((chat)=> chat.isPinned).map((chat, i)=>{
                    return (
                      <ChatListCard key={chat.id} chat={chat} clickAction={() => chooseChat(chat)} active={chat.id === activeChat.id} />
                    )
                  })
                }
               
              </div>
              <div className={`all-chats overflow-hidden my-4 ${searchItem.length > 0 ? 'd-none' : ''}`}>
                <div className="mx-4">
                  <h6 className="text-uppercase text-xxs text-gray">All Messages</h6>
                </div>
                {
                  chatList.filter((chat)=> !chat.isPinned).map((chat, i)=>{
                    return (
                      <ChatListCard key={chat.id} chat={chat} clickAction={() => chooseChat(chat)} active={chat.id === activeChat.id} />
                    )
                  })
                }
              </div>
  
  
  
          </div>
  
  
  
        </div>
      <Conversation chat={activeChat} user={friends.filter((user)=> user.id === activeChat.members[1])[0]} clickAction={(id) => chooseChatByUserId(id)} />
  </>
    )
    
  }
