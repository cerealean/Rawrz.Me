import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import * as CryptoJS from 'crypto-js';
import { environment } from "environments/environment";

@Injectable()
export class AuthenticationService {
  private readonly hash:string = CryptoJS.enc.Base64.parse(environment.storageHash);
  private readonly iv:string = CryptoJS.enc.Base64.parse(environment.storageIV);
  private readonly currentUserKey:string = environment.currentUserKey;
  private isLoggedIn:boolean = false;

  constructor() { 
      const serializedUser = localStorage.getItem(this.currentUserKey);
      this.isLoggedIn = !!serializedUser;
  }

  public getCurrentlyLoggedInUser():User{
    let user:User = null;

    if(this.isLoggedIn){
      const serializedUser = localStorage.getItem(this.currentUserKey);
      const unencryptedUser = CryptoJS.AES.decrypt(serializedUser, this.hash, {iv:this.iv});
      user = unencryptedUser ? <User>JSON.parse(unencryptedUser.toString(CryptoJS.enc.Utf8)) : null;
    }

    return user;
  }

  public setCurrentlyLoggedInUser(user:User){
    const jsonUser = JSON.stringify(user);
    const encryptedUser = CryptoJS.AES.encrypt(jsonUser, this.hash, {iv:this.iv});
    localStorage.setItem(this.currentUserKey, encryptedUser);
    this.isLoggedIn = true;
  }

  public clearCurrentlyLoggedInUser(){
    localStorage.removeItem(this.currentUserKey);
    this.isLoggedIn = false;
  }

  public isUserLoggedIn():boolean {
    return this.isLoggedIn;
  }

}
