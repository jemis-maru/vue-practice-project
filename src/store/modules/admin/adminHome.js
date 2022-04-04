export default {
    namespaced: true,
    state(){
        return{
            noReviewsToApprove: true,
            reviewsToApprove: [],
        };
    },
    mutations: {
        setReviewsToApprove(state, payload){
            state.noReviewsToApprove = false;
            if(payload.length == 0){
                state.noReviewsToApprove = true;
            }
            state.reviewsToApprove = payload;
            console.log(state.reviewsToApprove);
        },
    },
    actions: {
        async fetchReviewToApprove(context){
            const response = await fetch('http://localhost:5000/experience');
            const responseData = await response.json();
            // console.log(responseData);
            context.commit('setReviewsToApprove', responseData);
        },
        async approveReview(_, payload){
            if(confirm('Want to approve review?')){
                fetch("http://localhost:5000/approveExp", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                  })
                  .then( res => {
                    console.log(res);
                    if(!res.ok){
                      if(!alert("Unable to approve data!"))
                      {
                        window.location.reload();
                      }
                    }
                    else{
                      if(!alert("Approve successfully!"))
                      {
                        window.location.reload();
                      }
                    }
                  })
                  .catch( err => {
                    console.log(err);
                    if(!alert("Unable to approve data!"))
                    {
                        window.location.reload();
                    }
                  });
            }
        },
        async rejectReview(_, payload){
            if(confirm('Want to reject review?')){
                fetch("http://localhost:5000/rejectExps", {
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
                      if(!alert("Unable to reject data!"))
                      {
                        window.location.reload();
                      }
                    }
                    else{
                      if(!alert("Reject successfully!"))
                      {
                        window.location.reload();
                      }
                    }
                  })
                  .catch( err => {
                    console.log(err);
                    if(!alert("Unable to reject data!"))
                    {
                        window.location.reload();
                    }
                  });
            }
        },
        async approveMultiple(_, payload){
          console.log(payload);
          fetch("http://localhost:5000/approveMultipleApprExps", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              arrApprMulSel: payload,
            }),
          })
          .then( res => {
            console.log(res);
            if(!res.ok){
              if(!alert("Unable to approve data!"))
              {
                window.location.reload();
              }
            }
            else{
              if(!alert("Approve successfully!"))
              {
                window.location.reload();
              }
            }
          })
          .catch( err => {
            console.log(err);
            if(!alert("Unable to approve data!"))
            {
                window.location.reload();
            }
          });
        },
        async rejectMultiple(_, payload){
          console.log(payload);
          fetch("http://localhost:5000/rejectMultipleApprExps", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              arrApprMulSel: payload,
            }),
          })
          .then( res => {
            console.log(res);
            if(!res.ok){
              if(!alert("Unable to reject data!"))
              {
                window.location.reload();
              }
            }
            else{
              if(!alert("Reject successfully!"))
              {
                window.location.reload();
              }
            }
          })
          .catch( err => {
            console.log(err);
            if(!alert("Unable to reject data!"))
            {
                window.location.reload();
            }
          });
        },
        approveGoodReviews(context, payload){
          // console.log(payload);
          context.dispatch("approveMultiple", payload);
        },
        rejectbadReviews(context, payload){
          // console.log(payload);
          context.dispatch("rejectMultiple", payload);
        },
    },
    getters: {
        reviewsToApprove(state){
          console.log(state.reviewsToApprove);
            return state.reviewsToApprove;
        },
        noReviewsToApprove(state){
            return state.noReviewsToApprove;
        },
    },
};