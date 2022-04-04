<template>
  <div>
    <div class="shadow p-3 mb-5 bg-white container text-center">
        <h1 class="font-blue">Welcome to admin page of Experience sharing portal</h1>
        <p class="font-blue">You can read our reviews which we got from our students, college staff and visitors.</p>
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
                  <br />
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
  name: "allReviews",
  data() {
    return {
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
    filterGoodOrBad(para) {
      if (para != "callingFromOtherFilter") {
        this.searchText = "";
        this.firstDate = "";
        this.secondDate = "";
      }
      this.filterPersonForSearch();
      let goodOrBadArr = [];
      if (this.goodOrBad == "good") {
        goodOrBadArr = [];
        this.reviewsForApproval.forEach((review) => {
          if (review.rating >= 3) {
            goodOrBadArr.push(review);
          }
        });
      } else if (this.goodOrBad == "bad") {
        goodOrBadArr = [];
        this.reviewsForApproval.forEach((review) => {
          if (review.rating < 3) {
            goodOrBadArr.push(review);
          }
        });
      } else {
        goodOrBadArr = this.reviewsToApprove;
      }
      this.reviewsToApprove = goodOrBadArr;
    },
    filterReview() {
      if (this.goodOrBad != "") {
        this.filterGoodOrBad("callingFromOtherFilter");
      }
      if (this.firstDate != "" || this.secondDate != "") {
        this.filterDateFun("callingFromSearch");
      } else if (
        this.firstDate == "" &&
        this.secondDate == "" &&
        this.goodOrBad == ""
      ) {
        this.filterPersonForSearch();
      }
      this.reviewsToApprove = this.reviewsForApproval;
      let filterArray = [];
      if (this.searchText === "") {
        this.reviewsForApproval = this.reviewsToApprove;
      }
      this.reviewsForApproval.forEach((review) => {
        let reviewArray = Object.values(review);
        let filteredReview = reviewArray.filter((reviewElement) => {
          if (typeof reviewElement === "number") {
            reviewElement = reviewElement.toString();
          }
          return reviewElement
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        });
        if (filteredReview.length != 0) {
          filterArray.push(review);
        }
      });
      this.reviewsToApprove = filterArray;
    },
    sortReviewsFun() {
      if (this.sortReview == "ascending") {
        this.reviewsToApprove.sort((a, b) => a._id.localeCompare(b._id));
      } else if (this.sortReview == "descending") {
        this.reviewsToApprove.reverse((a, b) => a._id.localeCompare(b._id));
      }
    },
    filterPersonForSearch() {
      this.reviewsForApproval = this.getReviewsToApprove;
      let filterReviewByPerson = [];
      if (this.filterPerson == "Student") {
        filterReviewByPerson = [];
        this.reviewsForApproval.forEach((review) => {
          if (review.reviewer == "Student") {
            filterReviewByPerson.push(review);
          }
        });
      } else if (this.filterPerson == "College staff") {
        filterReviewByPerson = [];
        this.reviewsForApproval.forEach((review) => {
          if (review.reviewer == "College staff") {
            filterReviewByPerson.push(review);
          }
        });
      } else if (this.filterPerson == "Visitor") {
        filterReviewByPerson = [];
        this.reviewsForApproval.forEach((review) => {
          if (review.reviewer == "Visitor") {
            filterReviewByPerson.push(review);
          }
        });
      } else {
        filterReviewByPerson = this.getReviewsToApprove;
      }
      this.reviewsToApprove = filterReviewByPerson;
    },
    filterPersonFun() {
      this.searchText = "";
      this.sortReview = "";
      this.goodOrBad = "";
      this.firstDate = "";
      this.secondDate = "";
      this.filterPersonForSearch();
    },
    filterDateFun(para) {
      if (para != "callingFromSearch") {
        this.searchText = "";
      }
      this.filterGoodOrBad("callingFromOtherFilter");
      let filterDataUsingDate = [];
      let dateForFilter = "";
      if (this.firstDate != "" && this.secondDate == "") {
        dateForFilter = this.firstDate;
      } else if (this.firstDate == "" && this.secondDate != "") {
        dateForFilter = this.secondDate;
      }
      if (this.firstDate != "" || this.secondDate != "") {
        if (this.firstDate != "" && this.secondDate != "") {
          if (this.secondDate < this.firstDate) {
            alert("Invalid input!");
            this.firstDate = "";
            this.secondDate = "";
          } else {
            this.reviewsForApproval.forEach((item) => {
              let givenFirstDate = new Date(
                "" +
                  this.firstDate.split("/")[1] +
                  "," +
                  this.firstDate.split("/")[2] +
                  "," +
                  this.firstDate.split("/")[0]
              );
              let givenSecondDate = new Date(
                "" +
                  this.secondDate.split("/")[1] +
                  "," +
                  this.secondDate.split("/")[2] +
                  "," +
                  this.secondDate.split("/")[0]
              );
              let tempDate = new Date(
                "" +
                  item.addedDate.split("/")[1] +
                  "," +
                  item.addedDate.split("/")[0] +
                  "," +
                  item.addedDate.split("/")[2]
              );
              if (tempDate >= givenFirstDate && tempDate <= givenSecondDate) {
                filterDataUsingDate.push(item);
              }
            });
            this.reviewsToApprove = filterDataUsingDate;
          }
        } else {
          this.reviewsForApproval.forEach((item) => {
            let dateFormate = new Date(
              "" +
                dateForFilter.split("/")[1] +
                "," +
                dateForFilter.split("/")[2] +
                "," +
                dateForFilter.split("/")[0]
            );
            let tempDate = new Date(
              "" +
                item.addedDate.split("/")[1] +
                "," +
                item.addedDate.split("/")[0] +
                "," +
                item.addedDate.split("/")[2]
            );
            if (this.firstDate != "" && this.secondDate == "") {
              if (tempDate >= dateFormate) {
                filterDataUsingDate.push(item);
              }
            } else if (this.firstDate == "" && this.secondDate != "") {
              if (tempDate <= dateFormate) {
                filterDataUsingDate.push(item);
              }
            }
          });
          this.reviewsToApprove = filterDataUsingDate;
        }
      }
    },
    clearDateFilter() {
      this.firstDate = "";
      this.secondDate = "";
      this.filterDateFun("");
    },
    clearAllFilters() {
      this.searchText = "";
      this.sortReview = "";
      this.filterPerson = "";
      this.goodOrBad = "";
      this.firstDate = "";
      this.secondDate = "";
      this.filterDateFun("");
      this.filterPersonFun();
      this.sortReviewsFun();
      this.filterReview();
      this.filterGoodOrBad("");
    },
  },
  computed: {
    noReviewFound() {
      return this.$store.getters["allReviewsModule/noApprovedReviews"];
    },
    getReviewsToApprove() {
      return this.$store.getters["allReviewsModule/approvedReviews"];
    },
    reviewsToApprove: {
      get() {
        return this.reviewsForApproval;
      },
      set(passingReviews) {
        this.reviewsForApproval = passingReviews;
      },
    },
    dataAfterFilter() {
      if (this.reviewsForApproval.length > 0) {
        return false;
      } else {
        return true;
      }
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
</style>