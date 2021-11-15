import {int, boolean, shuffle } from 'js-randomize';
import Chat from './Chat';


export default class GroupChat extends Chat {
    constructor(){
      super();
      this.id = null
      this.type ="group";
      this.groupName = '';
      this.groupDescription = '';
      this.groupAvatar = null;

      return this;
    }


    addToGroup(user){
        this.members.push(user.id)
        return this;

    }

    setGroupChat(name, description, img){
      this.groupName = name;
      this.groupDescription = description;
      this.groupAvatar = img;
      this.id = name+int(45637, 3737388)
      return this;
    }

    get lastMessage(){
        return this._messageCount > 0 ?
         this.messages[this._messageCount-1] :
         '';
    }

  }