import store from '../redux/store';
import { setCurrentTargetUser, deleteDialogs } from '../redux/chat/actions';
import chatService from './chatService';

export interface IAuthData {
    isAuth: boolean;
    userName: string;
}

class AuthService {
    private isAuth: boolean;
    public userName: string;
    private checkAuthFetch?: Promise<IAuthData>; 
    private backUrl = 'http://localhost:8000/api';

    constructor() {
        this.checkAuth();
    }

    private handleAuthResponse = (promise: Promise<Response>): Promise<{ status: number }>  => {
        return promise
            .then(response => {
                return response.json();
            })
            .then(res => {
                this.userName = res.login || '';
                this.isAuth = Boolean(this.userName);

                if (this.isAuth) {
                    chatService.connect();
                }

                return { status: this.isAuth ? 200 : 403 };
            });
    }

    private sendRequest(address: string, method: string, body?: object): Promise<Response> {
        const url = this.backUrl + address;
        const options: RequestInit = {
            method: method,
            mode: 'cors',
            credentials: 'include',
            headers: { Host: 'localhost' },
        }
        if (method !== 'GET' && body) {
            options.headers = { ...options.headers, 'Content-Type': 'application/json; charset=utf-8' }
            options.body = JSON.stringify(body);
        }
        return fetch(url, options);
    }

    public login(login: string, password: string): Promise<{ status: number }> {
        return this.handleAuthResponse(this.sendRequest('/login', 'POST', { login, password }));
    }

    public register(login: string, password: string): Promise<{ status: number }> {
        return this.handleAuthResponse(this.sendRequest('/register', 'POST', { login, password }));
    }

    public getAuthData(): Promise<IAuthData> | IAuthData {
        if (this.checkAuthFetch) return this.checkAuthFetch;
        return { isAuth: this.isAuth, userName: this.userName };
    }

    private clearData(): void {
        if (localStorage) {
            delete localStorage.isAuth;
            delete localStorage.userName;
        }

        this.isAuth = false;
        this.userName = '';
    }

    public logOut(): Promise<void> {
        return this.sendRequest('/login', 'DELETE')
            .then(() => {
                this.clearData();
                store.dispatch(setCurrentTargetUser(''));
                store.dispatch(deleteDialogs());
                chatService.setOffline();
            });
    }

    private checkAuth(): void {
        if (localStorage) {
            this.isAuth = localStorage.getItem('isAuth') === 'true';
            this.userName = localStorage.getItem('userName') || '';
        }

        if (!this.isAuth || !this.userName) {
            this.checkAuthFetch = this.sendRequest('/check', 'GET')
            .then(response => {
                return response.json();
            }).then(response => {
                if (response.message) {
                    this.isAuth = false;
                    this.userName = '';
                } else {
                    this.isAuth = true;
                    this.userName = response.userName;
                    
                    if (localStorage) {
                        localStorage.setItem('isAuth', 'true');
                        localStorage.setItem('userName', this.userName);
                    }
                }
                return { isAuth: this.isAuth, userName: this.userName };
            });
        } 
    }
}

export default new AuthService();
