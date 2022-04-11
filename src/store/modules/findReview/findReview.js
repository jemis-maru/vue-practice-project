export default {
    namespaced: true,
    state(){
        return{
            findData: {},
        };
    },
    mutations: {
        setFindData(state, payload){
            // console.log(payload);
            state.findData = payload;
            // console.log(state.findData);
        },
    },
    actions: {
        async findReview(context, payload){
            return new Promise(resolve => {
                let resData = {};
                fetch("http://localhost:5000/findExps", {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            appId: payload,
                        }),
                      })
                      .then( response => {
                        if(!response.ok){
                            if(!alert("Unable to find data!"))
                            {
                              window.location.reload();
                            }
                        }
                        else{
                            return response.json();
                        }
                      })
                      .then( resJson => {
                        //   console.log(resJson);
                          resData = resJson;
                          context.commit('setFindData', resData);
                          resolve();
                      })
                      .catch( err => {
                        console.log(err);
                        if(!alert("Unable to find data!"))
                        {
                            window.location.reload();
                        }
                      });
            });
        },
        deleteReview(_, payload){
            fetch("http://localhost:5000/deleteExps", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        appId: payload,
                    }),
                  })
                  .then( res => {
                    console.log(res);
                    if(!res.ok){
                        if(!alert("Unable to delete data!"))
                        {
                          window.location.reload();
                        }
                    }
                    else{
                        if(!alert("Delete successfully!"))
                        {
                          window.location.reload();
                        }
                    }
                  })
                  .catch( err => {
                    console.log(err);
                    if(!alert("Unable to delete data!"))
                    {
                        window.location.reload();
                    }
                  });
        },
    },
    getters: {
        findData(state){
            // console.log('getters');
            // console.log(state.findData);
            return state.findData;
        }
    },
};