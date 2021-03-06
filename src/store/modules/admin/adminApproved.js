export default {
    namespaced: true,
    state(){
        return{
        };
    },
    mutations: {
    },
    actions: {
        async pinReview(_, payload){
            fetch("http://localhost:5000/pinExp", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                  })
                  .then( res => {
                    console.log(res);
                    if(!res.ok){
                        if(!alert("Unable to pin data!"))
                        {
                          window.location.reload();
                        }
                    }
                    else{
                        if(!alert("Pin successfully!"))
                        {
                            window.location.reload();
                        }
                    }
                  })
                  .catch( err => {
                    console.log(err);
                    if(!alert("Unable to pin data!"))
                    {
                      window.location.reload();
                    }
                  });
        },
        async unpinReview(){
            fetch("http://localhost:5000/unpinExp", {
                    method: 'POST',
                  })
                  .then( res => {
                    console.log(res);
                    if(!res.ok){
                        if(!alert("Unable to unpin data!"))
                        {
                          window.location.reload();
                        }
                    }
                    else{
                        if(!alert("Unpin successfully!"))
                        {
                            window.location.reload();
                        }
                    }
                  })
                  .catch( err => {
                    console.log(err);
                    if(!alert("Unable to unpin data!"))
                    {
                        window.location.reload();
                    }
                  });
        },
        async addToSlider(_, payload){
            fetch("http://localhost:5000/sliderExp", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                  })
                  .then( res => {
                    console.log(res);
                    if(!res.ok){
                        if(!alert("Unable to add data!"))
                        {
                          window.location.reload();
                        }
                    }
                    else{
                        if(!alert("Add successfully!"))
                        {
                          window.location.reload();
                        }
                    }
                  })
                  .catch( err => {
                    console.log(err);
                    if(!alert("Unable to add data!"))
                    {
                        window.location.reload();
                    }
                  });
        },
        async deleteApprovedReview(_, payload){
            fetch("http://localhost:5000/deleteApprExps", {
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
        async deleteMultiple(_, payload){
          console.log(payload);
          fetch("http://localhost:5000/deleteMultipleApprExps", {
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
        async selectedExportPdf(_, payload){
          console.log(payload);
          fetch("http://localhost:5000/exportPdf", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              exportArr: payload,
            }),
          })
          .then( res => {
            console.log(res);
            if(!res.ok){
              if(!alert("Unable to export!"))
              {
                window.location.reload();
              }
            }
            else{
              window.open('http://localhost:5000/viewReport', '_blank');
              // if(!alert("Export successfully!"))
              // {
              //   window.location.reload();
              // }
            }
          })
          .catch( err => {
            console.log(err);
            if(!alert("Unable to export"))
            {
                window.location.reload();
            }
          });
        },
    },
    getters: {
    },
};