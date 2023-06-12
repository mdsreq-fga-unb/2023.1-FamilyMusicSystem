import { Injectable } from '@angular/core';
import * as Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  public setCookie(key: string, value: string, expires?: number): void {
    Cookies.set(key, value);
  }

  public getCookie(key: string): string | undefined {
    return Cookies.get(key);
  }

  public deleteCookie(key: string): void {
    Cookies.remove(key);
  }
}
