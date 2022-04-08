export default {
    namespaced: true,
    state(){
        return{
        };
    },
    mutations: {
    },
    actions: {
        async deleteSliderReview(_, payload){
            fetch("http://localhost:5000/deleteSliderExps", {
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
        async deleteMultipleSlider(_, payload){
            console.log(payload);
            fetch("http://localhost:5000/deleteMultipleSliderExps", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                arrMulSel: payload,
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
    },
};