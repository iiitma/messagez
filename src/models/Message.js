import {int, boolean, shuffle } from 'js-randomize';
import moment from 'moment';
// import casual from 'casual-browserify';

export default class Message{
    constructor(text, from){
      this.id = int(3000,9999)
      this.dateTime = new Date();
      this.time = moment(new Date()).format('h:mm a');
      this.from  = from;
      this.text = text
      this.read= false;
  return this;
    }
  
  
    readMessage(){
      this.read = true;
      return this;
    }
  }