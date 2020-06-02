interface IAuthData {
    isAuth: boolean;
    userName: string;
}

class AuthService {
    private isAuth: boolean;
    private userName: string;
    private checkAuthFetch?: Promise<IAuthData>; 
    private backUrl = 'http://localhost:8000/api';

    constructor() {
        this.checkAuth();
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

    public login(login: string, password: string): Promise<Response|void> {
        return this.sendRequest('/login', 'POST', { login, password })
            .then((response) => {
                console.log('login = ' + response.status);
                return response;
            }); 
    }

    public register(login: string, password: string): Promise<Response> {
        return this.sendRequest('/register', 'POST', { login, password });
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

    private checkAuth(): void {
        if (localStorage) {
            this.isAuth = localStorage.getItem('isAuth') === 'true';
            this.userName = localStorage.getItem('userName') || '';
        }

        if (!this.isAuth || !this.userName) {
            this.checkAuthFetch = this.sendRequest('/check', 'GET')
            .then(response => {
                console.log(response.status);
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
