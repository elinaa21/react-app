class AuthService {
    private isAuth: boolean;
    private userName: string;

    constructor() {
        this.checkAuth();
    }

    public login(login: string, password: string) {
        //что типа запрос на соотв ножку
    }

    public register(login: string, password: string) {

    }

    public getAuthData() {
        if (this.checkAuthFetch) return this.checkAuthFetch;
        return new Promise((resolve) => resolve({ isAuth: this.isAuth, userName: this.userName }));
    }

    private clearData() {
        if (localStorage) {
            delete localStorage.isAuth;
            delete localStorage.userName;
        }

        this.isAuth = false;
        this.userName = '';
    }

    private checkAuth() {
        if (localStorage) {
            this.isAuth = localStorage.isAuth || false;
            this.userName = localStorage.userName || '';
        }

        if (!this.isAuth || !this.userName) {
            //здесь типа запрос на бэк и обработка ответа 
            //this.checkAuthFetch = fetch()
            //в обработке ответа this.checkAuthFetch = undeefined
        }
    }
}

export default new AuthService();
