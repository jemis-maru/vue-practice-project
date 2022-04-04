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
          <div class="row searchDiv">
              <div class="col-3"></div>
              <div class="col-3"></div>
              <div class="col-6 form-row font-blue">
                  <label class="col-sm-6 searchLabel col-form-label" for="search">Search: &nbsp;</label>
                  <input id="search" class="form-control col-sm-6" type="text" placeholder="Search" @keyup="filterReview" v-model="searchText" />
              </div>
          </div>
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
                    <p class="font-blue">Review filter:</p>
                    <select class="form-control" v-model="goodOrBad" @change="filterGoodOrBad">
                        <option value="">All review</option>
                        <option value="good">Good review</option>
                        <option value="bad">Bad review</option>
                    </select>
                </div>
          </div>
          <div class="row dateFilterDiv">
              <div class="dateFilterDivText col-md-4 col-12">
                  <label for="firstDate">From: &nbsp;</label>
                  <input type="date" id="firstDate2" name="firstDate" v-model="firstDate" @change="filterDateFun('firstDate')">
              </div>
              <div class="dateFilterDivText col-md-4 col-12">
                  <label for="secondDate">To: &nbsp;</label>
                  <input type="date" id="secondDate2" name="secondDate" v-model="secondDate" @change="filterDateFun('secondDate')">
              </div>
              <div class="dateFilterDivText col-md-4 col-12">
                  <button class="btn clearDateBtn" @click="clearDateFilter">Clear date</button>
              </div>
          </div>
          <div class="clearAllFilterDiv">
              <p>Clear all filters:&nbsp;&nbsp;<a class="btn clearDateBtn" @click="clearAllFilters">Clear</a></p>
          </div>
          <div class="row multipleSelectDiv">
              <div class="col-6 form-row font-blue">
                  <label class="col-sm-7 col-form-label">Approve selected reviews: </label>
                  <a @click="approveMultipleFun()" class="form-control col-sm-5 btn btn-success">Approve</a>
              </div>
              <div class="col-1"></div>
              <div class="col-5 form-row font-blue">
                  <label class="col-sm-7 col-form-label">Reject selected reviews: </label>
                  <a @click="rejectMultipleFun()" class="form-control col-sm-5 btn btn-danger">Reject</a>
              </div>
          </div>
          <div class="row multipleSelectDiv">
              <div class="col-6 form-row font-blue">
                  <label class="col-sm-7 col-form-label">
                    Approve 3 & above 3:
                    <b-icon class="starIcon" icon="star-fill"></b-icon>
                  </label>
                  <a @click="approveAllGood()" class="form-control col-sm-5 btn btn-success">Approve</a>
              </div>
              <div class="col-1"></div>
              <div class="col-5 form-row font-blue">
                  <label class="col-sm-7 col-form-label">
                    Reject below 3:
                    <b-icon class="starIcon" icon="star-fill"></b-icon>
                  </label>
                  <a @click="rejectAllBad()" class="form-control col-sm-5 btn btn-danger">Reject</a>
              </div>
          </div>
      </div>
      <div v-if="dataAfterFilter" class="font-blue noReviewForFilter">
          <h4>Sorry! No review found for this filter</h4>
      </div>
      <div
        class="container-fluid cardContainer"
        v-for="expe in reviewsToApprove"
        :key="expe.expId"
      >
        <div class="row">
          <div class="col-12 mt-3">
            <div>
                <input v-model="expe.isChecked" type="checkbox" @change="selectMultipleReview(expe)">
            </div>
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
import mixin from '../../../mixins/mixin.js';

export default {
  name: "adminHome",
  mixins: [mixin],
  data(){
    return{
      reviewsForApproval: [],
      multipleSelectArr: [],
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
      selectMultipleReview(selectedReview){
        // console.log(selectedReview);
        // console.log(selectedReview.isChecked);
        if(selectedReview.isChecked){
          this.multipleSelectArr.push(selectedReview);
          // console.log(this.multipleSelectArr);
        }
        else{
          let matchIndex = this.multipleSelectArr.findIndex(item => {
            return item._id === selectedReview._id;
          });
          this.multipleSelectArr.splice(matchIndex, 1);
          // console.log(this.multipleSelectArr);
        }
      },
      approveMultipleFun(){
        if(this.multipleSelectArr.length == 0){
          alert("Please select atleast one review");
          return;
        }
        // console.log(this.multipleSelectArr);
        if(confirm('Want to approve reviews?'))
        {
          this.$store.dispatch("adminHomeModule/approveMultiple", this.multipleSelectArr);
        }
      },
      rejectMultipleFun(){
        if(this.multipleSelectArr.length == 0){
          alert("Please select atleast one review");
          return;
        }
        // console.log(this.multipleSelectArr);
        if(confirm('Want to reject reviews?'))
        {
          this.$store.dispatch("adminHomeModule/rejectMultiple", this.multipleSelectArr);
        }
      },
      approveAllGood(){
        let allReviews = this.getReviewsToApprove;
        // console.log(allReviews);
        let goodReviewArr = [];
        allReviews.forEach(item => {
          if(item.rating >= 3) {
            goodReviewArr.push(item);
          }
        });
        if(goodReviewArr.length > 0){
          if(confirm('Want to approve all good reviews?'))
          {
            this.$store.dispatch("adminHomeModule/approveGoodReviews", goodReviewArr);
          }
        }
        else{
          alert("There is no good review at this time");
        }
      },
      rejectAllBad(){
        let allReviews = this.getReviewsToApprove;
        // console.log(allReviews);
        let badReviewArr = [];
        allReviews.forEach(item => {
          if(item.rating < 3) {
            badReviewArr.push(item);
          }
        });
        if(badReviewArr.length > 0){
          if(confirm('Want to reject all bad reviews?'))
          {
            this.$store.dispatch("adminHomeModule/rejectbadReviews", badReviewArr);
          }
        }
        else{
          alert("There is no bad review at this time");
        }
      },
  },
  computed: {
    noReviewFound() {
      return this.$store.getters["adminHomeModule/noReviewsToApprove"];
    },
    getReviewsToApprove(){
      return this.$store.getters["adminHomeModule/reviewsToApprove"];
    },
  },
  async created(){
    await this.$store.dispatch('adminHomeModule/fetchReviewToApprove');
    this.reviewsForApproval = this.getReviewsToApprove;
  },
};
</script>

<style scoped src="@/css/filtersAndCards.css">
</style>

<style scoped>
.approveBtn, .rejectBtn{
  display: inline-block;
}
.rejectBtn{
  float: right;
}
</style>