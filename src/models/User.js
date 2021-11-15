import {int, boolean, } from 'js-randomize';
import casual from 'casual-browserify';


export default class User {

    constructor(){
        this.id = int(0, 999)
        this.firstName = casual.first_name;
        this.lastName = casual.last_name;
        this._status = boolean();
        this.avatar = null;
        return this
    }
  
    setAvatar(image){
        this.avatar = image;
        return this;
    }
  
    setStatus(status){
        if(status === null || status === undefined){
            this._status = !this._status
        } else if (typeof(status) === 'boolean') {
            this._status = status
        }
        return this
    }
  
    get fullName(){
      return `${this.firstName} ${this.lastName}`
    }
  
    get isOnline(){
        return this._status
    }
  
  }