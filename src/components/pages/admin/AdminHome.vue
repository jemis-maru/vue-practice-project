<template>
  <div>
    <div class="shadow p-3 mb-5 bg-white container text-center">
        <h1 class="font-blue">Welcome to admin page of Experience sharing portal</h1>
        <p class="font-blue">You can approve experience here!</p>
    </div>
    <div v-if="noReviewFound" class="font-blue notFoundDiv">
        <h4>Sorry! No review found</h4>
    </div>
    <div v-else>
      <div class="container filterContainer">
          <div class="row selectionFilters">
                <div class="col-md-4 col-12">
                    <p class="font-blue">Sort:</p>
                    <select class="form-control" v-model="sortReview" @change="sortReviewsFun">
                        <option value="" disabled>Sort Reviews</option>
                        <option value="ascending" selected>Old to new</option>
                        <option value="descending">New to old</option>
                    </select>
                </div>
                <div class="col-md-4 col-12">
                    <p class="font-blue">Apply filter:</p>
                    <select class="form-control" v-model="filterPerson" @change="filterPersonFun">
                        <option value="">All review</option>
                        <option value="Student">Student review</option>
                        <option value="College staff">College staff review</option>
                        <option value="Visitor">Visitor review</option>
                    </select>
                </div>
                <div class="col-md-4 col-12">
                    
                </div>
          </div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-3"></div>
            <div class="col-6 form-row font-blue">
                <label class="col-sm-3 col-form-label" for="search">Search: </label>
                <input id="search" class="form-control col-sm-7" type="text" placeholder="Search" @keyup="filterReview" v-model="searchText" />
            </div>
        </div>
      </div>
      <div
        class="container-fluid cardContainer"
        v-for="expe in reviewsToApprove"
        :key="expe.expId"
      >
        <div class="row">
          <div class="col-12 mt-3">
            <div class="shadow card">
              <div class="card-horizontal">
                <div class="img-square-wrapper">
                  <img
                    class="cardImg card-img-top img-fluid mx-auto d-block"
                    :src="expe.filePath"
                    alt="Card image"
                  />
                </div>
                <div class="card-body">
                  <h4 class="card-title">{{ expe.title }}</h4>
                  <p class="card-text">{{ expe.highlights }}</p>
                  <p class="card-text">
                    Rating: {{ expe.rating }}/5
                    <b-icon class="starIcon" icon="star-fill"></b-icon>
                  </p>
                </div>
              </div>
              <div class="footerCard card-footer">
                <a
                  class="btn btn-primary cardBtn"
                  data-toggle="collapse"
                  :data-target="expe.targetId"
                  >Read full experience</a
                >
                <div :id="expe.expId" class="collapse">
                  <br />
                  <div v-html="expe.content"></div>
                  <p class="textRight">Written by - {{ expe.name }}</p>
                  <p class="textRight">On - {{ expe.addedDate }}</p>
                  <p class="textRight">
                    Contact details - {{ expe.email }}
                  </p>
                  <br />
                  <a
                    class="btn btn btn-info approveBtn"
                    @click="approveReview(expe)"
                    >Approve</a
                  >
                  <a
                    class="btn btn btn-danger rejectBtn"
                    @click="rejectReview(expe._id)"
                    >Reject</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminHome",
  data(){
    return{
      searchText: '',
      sortReview: '',
      filterPerson: '',
      reviewsForApproval: [],
    };
  },
  methods: {
      approveReview(review){
        console.log(review);
        this.$store.dispatch("adminHomeModule/approveReview", review);
      },
      rejectReview(reviewId){
        console.log(reviewId);
        this.$store.dispatch("adminHomeModule/rejectReview", reviewId);
      },
      filterReview(){
        this.filterPersonForSearch();
        this.reviewsToApprove = this.reviewsForApproval;
        let filterArray = [];
        if(this.searchText === ''){
          this.reviewsForApproval = this.reviewsToApprove;
        }
        this.reviewsForApproval.forEach(review => {
          let reviewArray = Object.values(review);
          let filteredReview = reviewArray.filter(reviewElement => {
            if(typeof reviewElement === 'number'){
              reviewElement = reviewElement.toString();
            }
            return reviewElement.toLowerCase().includes(this.searchText.toLowerCase());
          });
          if(filteredReview.length != 0){
            filterArray.push(review);
          }
        });
        this.reviewsToApprove = filterArray;
      },
      sortReviewsFun(){
        if(this.sortReview == "ascending"){
          this.reviewsToApprove.sort((a, b) => a._id.localeCompare(b._id));
        }
        else if(this.sortReview == "descending"){
          this.reviewsToApprove.reverse((a, b) => a._id.localeCompare(b._id));
        }
      },
      filterPersonForSearch(){
        this.reviewsForApproval = this.getReviewsToApprove;
        let filterReviewByPerson = [];
        if(this.filterPerson == "Student"){
          filterReviewByPerson = [];
          this.reviewsForApproval.forEach(review => {
            if(review.reviewer == "Student"){
              filterReviewByPerson.push(review);
            }
          });
        }
        else if(this.filterPerson == "College staff"){
          filterReviewByPerson = [];
          this.reviewsForApproval.forEach(review => {
            if(review.reviewer == "College staff"){
              filterReviewByPerson.push(review);
            }
          });
        }
        else if(this.filterPerson == "Visitor"){
          filterReviewByPerson = [];
          this.reviewsForApproval.forEach(review => {
            if(review.reviewer == "Visitor"){
              filterReviewByPerson.push(review);
            }
          });
        }
        else{
          filterReviewByPerson = this.getReviewsToApprove;
        }
        this.reviewsToApprove = filterReviewByPerson;
      },
      filterPersonFun(){
        this.searchText = "";
        this.filterPersonForSearch();
      },
  },
  computed: {
    noReviewFound() {
      return this.$store.getters["adminHomeModule/noReviewsToApprove"];
    },
    getReviewsToApprove(){
      return this.$store.getters["adminHomeModule/reviewsToApprove"];
    },
    reviewsToApprove: {
      get(){
        return this.reviewsForApproval;
      },
      set(passingReviews){
        this.reviewsForApproval = passingReviews;
      }
    },
  },
  async created(){
    await this.$store.dispatch('adminHomeModule/fetchReviewToApprove');
    this.reviewsForApproval = this.getReviewsToApprove;
  },
};
</script>

<style scoped>
.notFoundDiv {
  text-align: center;
}
.filterContainer{
  margin-bottom: 20px;
}
.selectionFilters{
  margin-bottom: 20px;
}
.cardContainer{
  max-width: 1000px
}
.card-horizontal {
  display: flex;
  flex: 1 1 auto;
}
.cardImg {
  max-width: 400px;
  height: 200px;
}
.cardBtn {
  display: grid;
}
.footerCard{
  background-color: #ffffff;
}
.textRight{
  text-align: right;
}
.approveBtn, .rejectBtn{
  display: inline-block;
}
.rejectBtn{
  float: right;
}

@media only screen and (max-width: 700px) {
  .card-horizontal {
    display: inline-block;
  }
  .cardImg {
    max-width: 600px !important;
  }
}
</style>