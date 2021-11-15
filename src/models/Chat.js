import {int,} from 'js-randomize';

export default class Chat {
  
    constructor(){
        this.id = int(1000, 9999);
        this.type = "user";
        this.members = [];
        this.messages = [];
        this._pinned = false;
        this.notifications = true;
        // this.lastMessage = ''
    }
    
    addMe(user) {
        this._me = user.id;
        this.members.push(this._me);
        return this;
    };
    addWith(user) {
        this._with = user.id;
        this.members.push(this._with);
        return this;
    }
  

  
    get isPinned(){
        return this._pinned
    }
  
    switchPin(){
        this._pinned = !this._pinned;
        return this
    }
    switchNotification(){
        this.notifications = !this.notifications;
        return this
    }
  
    get _messageCount(){
        return this.messages.length
    }
    get lastMessage(){
        return this._messageCount > 0 ?
         this.messages[this._messageCount-1].text :
         '';
    }
  
    unread(id){
      return this.messages.filter((message)=> message.read === false && message.from !== id).length
    }
  
    read(id){
      return this._messageCount > 0 ?
      this.messages[this._messageCount-1].read :
      null
    }
  
    readChats(id){
      this.messages.forEach((message) =>{
        if( message.from !== id){
          message.readMessage();
        }
      });
      return this;
    }

    addMessage(message){
        this.messages.push(message);
        // this.lastMessage = message.text
        return this.messages;
    }
  
  
  
  }

