export default {
    namespaced: true,
    state(){
        return{
            noApprovedReviews: true,
            approvedReviews: [],
            pinReview: [],
            noPinReview: true,
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
        setPinReview(state, payload){
            state.noPinReview = false;
            if(payload.length == 0){
                state.noPinReview = true;
            }
            state.pinReview = payload;
            console.log(state.pinReview);
        },
    },
    actions: {
        async fetchApprovedReviews(context){
            const response = await fetch('http://localhost:5000/approveExps');
            const responseData = await response.json();
            // console.log(responseData);
            context.commit('setApprovedReviews', responseData);
        },
        async fetchPinReview(context){
            const response = await fetch('http://localhost:5000/pinExps');
            const responseData = await response.json();
            // console.log(responseData);
            context.commit('setPinReview', responseData);
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
        pinReview(state){
            console.log(state.pinReview);
            return state.pinReview;
        },
        noPinReview(state){
            return state.noPinReview;
        },
    },
};