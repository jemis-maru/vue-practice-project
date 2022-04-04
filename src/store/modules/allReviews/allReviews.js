export default {
    namespaced: true,
    state(){
        return{
            noApprovedReviews: true,
            approvedReviews: [],
        };
    },
    mutations: {
        setApprovedReviews(state, payload){
            state.noApprovedReviews = false;
            if(payload.length == 0){
                state.noApprovedReviews = true;
            }
            state.approvedReviews = payload;
            console.log(state.approvedReviews);
        },
    },
    actions: {
        async fetchApprovedReviews(context){
            const response = await fetch('http://localhost:5000/approveExps');
            const responseData = await response.json();
            // console.log(responseData);
            context.commit('setApprovedReviews', responseData);
        },
    },
    getters: {
        approvedReviews(state){
            console.log(state.approvedReviews);
            return state.approvedReviews;
        },
        noApprovedReviews(state){
            return state.noApprovedReviews;
        },
    },
};