import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: 'user',
    state : () => ({
        token: null,
        tokenExp: null,
        usuarioID: null,
        usuario: '',
        rol: '',
        isAuthenticated : false,
        framed: false
    }),
    persist: true,
    getters: {
        
    },
    actions: {
        logOut(){
            this.usuarioID = null;
            this.isAuthenticated = false;
            this.token = null;
            this.usuario = '';
            this.email = '';
            this.tokenExp = null;

            this.$router.push({name:'Login'})
        },
        login(data, framed, url = '/ConciliadorMp'){ 

            this.isAuthenticated = true;
            this.token = data.token;
            this.usuario = data.username;
            this.rol = data.role;
            this.framed = framed;

            //TODO: REDIRECT A PANTALLA PREVIA
            this.$router.push(url);
        },
        setToken(token){
            this.token = token;
            this.isAuthenticated = true;

            const payload = token.split('.')[1];
            const decodedPayload = JSON.parse(atob(payload));
            const exp = decodedPayload.exp;
            
            this.tokenExp = new Date(exp * 1000);
        },
        setFrame(flag){
            this.framed = flag;
        }
    }
});