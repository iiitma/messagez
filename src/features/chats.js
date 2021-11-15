import {
  createSlice
} from '@reduxjs/toolkit'
import notificationSound from '../assets/sounds/notification.mp3';

export const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    value: [],
  },
  reducers: {

    newChat: (state, action) => {
      state.value = [...state.value, action.payload]
    },

    changeChatNotification: (state, action) => {
      const chat = state.value.find((chat) => chat.id === action.payload.id);

      if (chat) {
        chat.notifications = !chat.notifications
      }
      state.value = [...state.value]
    },

    sendMessage: (state, action)=>{
      // console.log(action.payload.message)

      const chat = state.value.find((chat) => chat.id === action.payload.id);

      if (chat) {
        // chat.messages= [...chat.messages, action.payload.message];
        chat.messages = chat.addMessage(action.payload.message);
        // if(chat.notifications){playSound();}
      }
      // console.log(chat)
      state.value = [chat, ...state.value.filter((chat)=> chat.id !== action.payload.id)]
    },

    getMessage: (state, action)=>{
      const chat = state.value.find((chat) => chat.id === action.payload.id);
      if (chat) {
        // chat.messages= [...chat.messages, action.payload.message];
        chat.messages = chat.addMessage(action.payload.message);
        if(chat.notifications && action.payload.noSound !== true){playSound();}
      }

      // state.value = [...state.value];
      state.value = [chat, ...state.value.filter((chat)=> chat.id !== action.payload.id)]
    },


    readChat: (state, action)=>{
      const chat = state.value.find((chat) => chat.id === action.payload.id);
      if (chat) {
        // chat.readChats(action.payload.myId);
        chat.messages = chat.messages.map((message) => {
         return message.from !== action.payload.myid ? message.readMessage() : message
        });
      }

      state.value = [...state.value];

    },



    clearConversation: (state, action)=>{
      const chat = state.value.find((chat) => chat.id === action.payload.id);
      if (chat) {
        chat.messages= [];
      }
      state.value = [...state.value];
    },

    clearAllChats: (state) => {
      state.value = []
    }


  },
})

// Action creators are generated for each case reducer function
export const {
  newChat,
  changeChatNotification,
  sendMessage,
  getMessage,
  readChat,
  clearConversation,
  clearAllChats,
} = chatsSlice.actions;

export const chatCount = state => state.chats.value.length;
export const selectChatList = state => state.chats.value;


export default chatsSlice.reducer


function playSound () {
  // const audio = new Audio("https://audio-previews.elements.envatousercontent.com/files/156322809/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22H42VWCD-notification.mp3%22");
  const audio = new Audio(notificationSound);
  audio.play()
}