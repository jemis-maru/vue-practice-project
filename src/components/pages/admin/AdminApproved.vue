<template>
  <div>
    <div class="shadow p-3 mb-5 bg-white container text-center">
        <h1 class="font-blue">Welcome to admin page of Experience sharing portal</h1>
        <p class="font-blue">You can read our reviews which we got from our students, college staff and visitors.</p>
    </div>
    <div class="container adminDropdown">
      <admin-dropdown></admin-dropdown>
    </div>
    <div v-if="noReviewFound" class="font-blue notFoundDiv">
        <h4>Sorry! No review found</h4>
    </div>
    <div v-else>
      <div class="container filterContainer">
          <div class="unpinDiv">
              <h4 class="unpinTxt">Want to unpin experience?</h4>
              <a @click="unpinReview" class="btn btn btn-info unpinBtn">Unpin</a>
          </div>
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
          <div class="row deleteSelectedDiv">
              <div class="col-3"></div>
              <div class="col-6 form-row font-blue">
                  <label class="col-sm-8 col-form-label">Delete selected reviews: </label>
                  <a class="form-control col-sm-4 btn btn-danger" @click="deleteMultipleFun">Delete</a>
              </div>
              <div class="col-3"></div>
          </div>
          <div class="row exportPdfDiv">
              <div class="col-2"></div>
              <div class="col-8 form-row font-blue">
                  <label class="col-sm-3 col-form-label">Export as PDF: </label>
                  <a @click="allExportPdf" class="exportBtn col-sm-4 btn">Export all</a>
                  <a @click="selectedExportPdf" class="exportBtn col-sm-5 btn">Export selected</a>
              </div>
              <div class="col-2"></div>
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
                  <p class="textRight">Contact details - {{expe.email}}</p>
                  <br />
                  <a
                    class="btn btn btn-info pinBtn"
                    @click="pinReview(expe)"
                    >Pin</a
                  >
                  <a
                    class="btn btn btn-info addSliderBtn"
                    @click="addToSlider(expe)"
                    >Add to slider</a
                  >
                  <a
                    class="btn btn btn-danger deleteBtn"
                    @click="deleteApprovedReview(expe._id)"
                    >Delete</a
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
import AdminDropdown from '../../AdminDropdown.vue';

export default {
  name: "allReviews",
  mixins: [mixin],
  components: {
    'admin-dropdown': AdminDropdown,
  },
  data() {
    return {
      reviewsForApproval: [],
      multipleSelectArr: [],
    };
  },
  methods: {
    pinReview(review){
        // console.log(review);
        if(confirm('Want to pin review?')){
            this.$store.dispatch("adminApprovedModule/pinReview", review);
        }
    },
    unpinReview(){
        if(confirm('Want to unpin review?')){
            this.$store.dispatch("adminApprovedModule/unpinReview");
        }
    },
    addToSlider(review){
        if(confirm('Want to add review to slider?')){
            this.$store.dispatch("adminApprovedModule/addToSlider", review);
        }
    },
    deleteApprovedReview(reviewId){
        if(confirm('Want to delete review?')){
            this.$store.dispatch("adminApprovedModule/deleteApprovedReview", reviewId);
        }
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
    deleteMultipleFun(){
      if(this.multipleSelectArr.length == 0){
        alert("Please select atleast one review");
        return;
      }
      // console.log(this.multipleSelectArr);
      if(confirm('Want to delete reviews?'))
      {
        // console.log(this.multipleSelectArr);
        this.$store.dispatch("adminApprovedModule/deleteMultiple", this.multipleSelectArr);
      }
    },
    selectedExportPdf(){
      if(this.multipleSelectArr.length == 0){
        alert("Please select atleast one review");
        return;
      }
      // console.log(this.multipleSelectArr);
      if(confirm('Want to export reviews?'))
      {
        // console.log(this.multipleSelectArr);
        this.$store.dispatch("adminApprovedModule/selectedExportPdf", this.multipleSelectArr);
      }
    },
    allExportPdf(){
      if(confirm('Want to export all reviews?'))
      {
        this.$store.dispatch("adminApprovedModule/selectedExportPdf", this.getReviewsToApprove);
      }
    },
  },
  computed: {
    noReviewFound() {
      return this.$store.getters["allReviewsModule/noApprovedReviews"];
    },
    getReviewsToApprove() {
      return this.$store.getters["allReviewsModule/approvedReviews"];
    },
  },
  async created() {
    await this.$store.dispatch("allReviewsModule/fetchApprovedReviews");
    this.reviewsForApproval = this.getReviewsToApprove;
  },
};
</script>

<style scoped src="@/css/filtersAndCards.css">
</style>

<style scoped>
.unpinDiv{
    text-align: center;
    margin-bottom: 30px;
}
.unpinTxt, .unpinBtn{
    display: inline-block;
}
.unpinBtn{
    margin-left: 2px;
}
.pinBtn, .addSliderBtn, .deleteBtn{
  display: inline-block;
}
.addSliderBtn{
    margin-left: 2px;
}
.deleteBtn, .deleteSelectedBtn{
    float: right;
}
.adminDropdown{
  margin-bottom: 30px;
}
.deleteSelectedDiv, .exportPdfDiv{
  margin-top: 30px;
}
.exportBtn{
  margin: auto;
  border: 2px solid #f9f9f9;
  background-color: #003865;
  color: #ffffff;
  text-decoration: none;
}
.exportBtn:hover{
  color: #ffffff;
}
</style>