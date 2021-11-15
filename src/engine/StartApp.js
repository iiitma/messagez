import person0 from '../assets/images/0.jpg';
import person1 from '../assets/images/1.jpg';
import person2 from '../assets/images/2.jpg';
import person3 from '../assets/images/3.jpg';
import person4 from '../assets/images/4.jpg';
import person5 from '../assets/images/5.jpg';
import person6 from '../assets/images/6.jpg';
import person7 from '../assets/images/7.jpg';
import person8 from '../assets/images/8.jpg';
import person9 from '../assets/images/9.jpg';
import group1 from '../assets/images/g1.jpg';
import {useEffect} from 'react';
import {int, boolean, shuffle } from 'js-randomize';
import casual from 'casual-browserify';
import { useSelector, useDispatch } from 'react-redux';
import { addMe, addFriend, selectMe, selectFriends, comeOnline, goOffline } from '../features/users'
import { newChat, getMessage, sendMessage, readChat } from '../features/chats'
import User from '../models/User';
import Chat from '../models/Chat';
import GroupChat from '../models/GroupChat';
import Message from '../models/Message';


const images =  shuffle([person1,person2,person3,person4,person5,person6,person7,person8,person9]);


export default function StartApp(){
    const dispatch = useDispatch();
    const me = useSelector(selectMe);
    const friends = useSelector(selectFriends);
  
    let newMe;
    let groupChat;
  
    if(me == null){
      newMe = new User().setAvatar(person0).setStatus(true);
      dispatch(addMe(newMe));
      groupChat = new GroupChat().setGroupChat(casual.company_name, casual.description, group1);
      groupChat.addMe(newMe);
      groupChat.switchPin(true);

    }
  
    if(friends.length === 0){
    
      for (let i = 1; i <= 9; i++ ){
        let newFriend = new User().setAvatar(images[i%9]);
        dispatch(addFriend(newFriend));
        let chat = new Chat().addMe(newMe).addWith(newFriend);
        if(i === 1){
          chat.switchPin();
        }
        if(i%4 === 1){
          groupChat.addToGroup(newFriend)
        }

        if(i%2 === 1){
          chat.switchNotification(false);
        }

        dispatch(newChat(chat));
        
        let nTexts = int(0,3);
        for(let j=0; j <= nTexts; j++ ){
          let newMessage = new Message(casual.sentence, newFriend.id);
          dispatch(getMessage({id: chat.id, message: newMessage, noSound: true }));
        }
  

          dispatch(readChat({id: chat.id, myId: newMe.id}))
          let mTexts = int(0,2);
          for(let k=0; k <= mTexts; k++ ){
            let newMessageFromMe = new Message(casual.sentence, newMe.id);
            dispatch(sendMessage({id: chat.id, message: newMessageFromMe }));
          }

          if(newFriend.isOnline){
            readChat({id: chat.id, myId: newFriend.id})
          }  
          let interval = int(60000, 110000)
          // let interval = int(180000, 300000)
        setInterval(() => {
          dispatch(comeOnline({id: newFriend.id}))
          setTimeout(() => {
            dispatch(readChat({id: chat.id, myId: newFriend.id}))
          }, int(10000, 20000));
          let nTexts = int(0,1);
          for(let j=0; j <= nTexts; j++ ){
            let newMessage = new Message(casual.sentence, newFriend.id);
            dispatch(getMessage({id: chat.id, message: newMessage }));
          }
          setTimeout(() => {
            if( boolean()){
              dispatch(comeOnline({id: newFriend.id}))
              dispatch(readChat({id: chat.id, myId: newFriend.id}))
  
            } else dispatch(goOffline({id: newFriend.id}))
  
          }, int(10000, 30000));
  
  
        }, interval);
  
        setInterval(() => {
          dispatch(readChat({id: chat.id, myId: newMe.id}))
          let nTexts = int(1,2);
          for(let j=0; j <= nTexts; j++ ){
            let newMessageFromMe = new Message(casual.sentence, newMe.id);
          dispatch(sendMessage({id: chat.id, message: newMessageFromMe }));
          }
        }, interval+30000);
  
        
    
      }
      dispatch(newChat(groupChat));
      const groupMembers = groupChat.members;
      let sender = null
        for(const member of shuffle(groupMembers)){
          let nTexts = 1;
          // console.log(member, nTexts)
          for(let j=0; j < nTexts; j++ ){
            let newMessage = new Message(casual.sentence, member);
            member === newMe.id ?
            dispatch(sendMessage({id: groupChat.id, message: newMessage,})) :
            dispatch(getMessage({id: groupChat.id, message: newMessage, noSound: true }));
          }
          sender = member;
        }

        // let groupInterval = int(5000, 12000)
        let groupInterval = int(65000, 125000)

        setInterval(() => {
          let newSender = groupMembers[int(0, groupMembers.length-1)];
          while (newSender === sender) {
            // console.log(newSender)
            newSender = groupMembers[int(0, groupMembers.length-1)];
          }
          // console.log('sender', sender)
          dispatch(comeOnline({id: sender}))
          setTimeout(() => {
            dispatch(readChat({id: groupChat.id, myId: sender}))
          }, int(10000, 20000));
          let nTexts = int(0,1);
          for(let j=0; j <= nTexts; j++ ){
            let newMessage = new Message(boolean() ? casual.sentence : casual.sentences(3), sender);
            sender === newMe.id ?
            dispatch(sendMessage({id: groupChat.id, message: newMessage,})) :
            dispatch(getMessage({id: groupChat.id, message: newMessage, noSound: true }));
          }
          setTimeout(() => {
            if( boolean() && sender   !== newMe.id){
              dispatch(comeOnline({id: sender}))
            } else dispatch(goOffline({id: sender}))
  
          }, int(10000, 30000));
          sender = newSender;
        }, groupInterval);
    }





    useEffect(() => {

    })
  }