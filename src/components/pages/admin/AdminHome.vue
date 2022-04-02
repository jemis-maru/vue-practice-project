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
                    <p style="color: #003865;">Review filter:</p>
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
                  <a class="btn clearDateBtn">Clear date</a>
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
      goodOrBad: '',
      firstDate: '',
      secondDate: '',
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
      filterGoodOrBad(para){
        this.searchText = "";
        if(para != "callingFromDateFilter"){
          this.firstDate = "";
          this.secondDate = "";
        }
        this.filterPersonForSearch();
        // console.log(this.goodOrBad);
        let goodOrBadArr = [];
        if(this.goodOrBad == "good"){
          goodOrBadArr = [];
          this.reviewsForApproval.forEach(review => {
            if(review.rating >= 3){
              goodOrBadArr.push(review);
            }
          });
        }
        else if(this.goodOrBad == "bad"){
          goodOrBadArr = [];
          this.reviewsForApproval.forEach(review => {
            if(review.rating < 3){
              goodOrBadArr.push(review);
            }
          });
        }
        else{
          goodOrBadArr = this.reviewsToApprove;
        }
        this.reviewsToApprove = goodOrBadArr;
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
        this.sortReview = "";
        this.goodOrBad = "";
        this.firstDate = "";
        this.secondDate = "";
        this.filterPersonForSearch();
      },
      filterDateFun(para){
        this.filterPersonForSearch();
        this.filterGoodOrBad("callingFromDateFilter");
        // console.log(this.firstDate);
        // console.log(this.secondDate);
        // console.log(para);
        let filterDataUsingDate = [];
        let selectedDate = "";
        let dateForFilter = "";
        if(para == "firstDate"){
          selectedDate = this.secondDate;
          dateForFilter = this.firstDate;
        }
        else{
          selectedDate = this.firstDate;
          dateForFilter = this.secondDate;
        }
        if(selectedDate != ""){
            if(this.secondDate < this.firstDate){
                alert("Invalid input!");
                this.firstDate = '';
                this.secondDate = '';
            }
            else{
                this.reviewsForApproval.forEach(item => {
                    let givenFirstDate = new Date(""+this.firstDate.split("/")[1] +","+ this.firstDate.split("/")[2] +","+ this.firstDate.split("/")[0]);
                    let givenSecondDate = new Date(""+this.secondDate.split("/")[1] +","+ this.secondDate.split("/")[2] +","+ this.secondDate.split("/")[0]);
                    let tempDate = new Date(""+item.addedDate.split("/")[1] +","+ item.addedDate.split("/")[0] +","+ item.addedDate.split("/")[2]);
                    if(tempDate >= givenFirstDate && tempDate <= givenSecondDate){
                        filterDataUsingDate.push(item);
                    }
                });
                console.log(filterDataUsingDate);
                this.reviewsToApprove = filterDataUsingDate;
            }
        }
        else{
            this.reviewsForApproval.forEach(item => {
                let dateFormate = new Date(""+dateForFilter.split("/")[1] +","+ dateForFilter.split("/")[2] +","+ dateForFilter.split("/")[0]);
                let tempDate = new Date(""+item.addedDate.split("/")[1] +","+ item.addedDate.split("/")[0] +","+ item.addedDate.split("/")[2]);
                if(para == "firstDate"){
                  if(tempDate >= dateFormate){
                      filterDataUsingDate.push(item);
                  }
                }
                else{
                  if(tempDate <= dateFormate){
                      filterDataUsingDate.push(item);
                  }
                }
            });
            console.log(filterDataUsingDate);
            this.reviewsToApprove = filterDataUsingDate;
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
    reviewsToApprove: {
      get(){
        return this.reviewsForApproval;
      },
      set(passingReviews){
        this.reviewsForApproval = passingReviews;
      }
    },
    dataAfterFilter(){
      if(this.reviewsForApproval.length > 0){
        return false;
      }
      else{
        return true;
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
.notFoundDiv, .noReviewForFilter, .dateFilterDivText {
  text-align: center;
}
.noReviewForFilter{
  margin-top: 30px;
}
.filterContainer{
  margin-bottom: 20px;
}
.searchDiv{
  margin-bottom: 30px;
}
.searchLabel{
  padding-right: 5px;
  text-align: right;
}
.selectionFilters{
  margin-bottom: 20px;
}
.clearDateBtn{
  background-color: #003865;
  color: #ffffff;
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