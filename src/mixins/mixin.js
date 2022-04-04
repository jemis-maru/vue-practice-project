export default {
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
 }