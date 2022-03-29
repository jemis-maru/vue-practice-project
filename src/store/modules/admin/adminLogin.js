import router from '../../../router.js';

export default {
    namespaced: true,
    state(){
        return{
            adminUsername: 'admin',
            adminPassword: 'adminPass',
            loginSuccessful: false,
            isLogin: false,
        };
    },
    mutations: {
        verifyAdminData(state, payload){
            state.loginSuccessful = false;
            state.isLogin = false;
            if(state.adminUsername===payload.username && state.adminPassword == payload.password){
                localStorage.setItem("test", "hi");
                state.loginSuccessful = true;
                state.isLogin = true;
                alert("Login successful");
                router.replace('/admin');
            }
            else{
                alert("Login failed!");
                state.loginSuccessful = false;
                state.isLogin = false;
            }
        },
        isAlreadyLogin(state, payload){
            state.isLogin = false;
            if(payload == null){
                state.isLogin = false;
            }
            else{
                state.isLogin = true;
            }
            // console.log(state.isLogin);
        },
        logoutFunction(state){
            if(confirm('Want to logout?')){
                localStorage.removeItem("test");
                state.isLogin = false;
                router.replace('/login');
            }
        },
    },
    actions: {
        adminVerification(context, payload){
            context.commit('verifyAdminData', payload);
        },
        isAlreadyLogin(context){
            let loginToken = localStorage.getItem("test");
            context.commit('isAlreadyLogin', loginToken);
        },
        logoutClicked(context){
            context.commit('logoutFunction');
        },
    },
    getters: {
        isLogin(state){
            return state.isLogin;
        },
    },
};