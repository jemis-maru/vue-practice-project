export default {
    namespaced: true,
    state(){
        return{
            averageRating: 0,
            isSliderEmpty: false,
            sliderExps: null,
            firstSlider: {},
            withoutFirst: null,
        };
    },
    mutations: {
        setAvgRating(state, payload){
            state.averageRating = payload;
        },
        setSliderData(state, payload){
            state.isSliderEmpty = false;
            if(payload.length == 0){
                state.isSliderEmpty = true;
            }
            state.sliderExps = payload;
            state.firstSlider = payload[0];
            // console.log(state.firstSlider);
            state.withoutFirst = payload.slice(1);
            // console.log(state.withoutFirst);
        },
    },
    actions: {
        async fetchAvgRating(context){
            let fetchRating = 0;
            const response = await fetch('http://localhost:5000/averageRating');
            const responseData = await response.json();
            // console.log(responseData);
            if(responseData[0].rating.toFixed(0) != responseData[0].rating){
                fetchRating = responseData[0].rating.toFixed(1);
            }
            else{
                fetchRating = responseData[0].rating;
            }
            context.commit('setAvgRating', fetchRating);
        },
        async fetchSliderExperiences(context){
            const response = await fetch('http://localhost:5000/sliderExps');
            const responseData = await response.json();
            // console.log(responseData);
            context.commit('setSliderData', responseData);
        },
    },
    getters: {
        avgRating(state){
            return state.averageRating;
        },
        emptySlider(state){
            return state.isSliderEmpty;
        },
        firstSliderData(state){
            return state.firstSlider;
        },
        withoutFirstData(state){
            return state.withoutFirst;
        },
    },
};