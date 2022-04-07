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
      <div v-if="!noPinReview" class="pinReviewDiv">
        <div class="container-fluid cardContainer">
          <div class="row">
            <div class="col-12 mt-3">
              <div>
                  <b-icon class="pinIcon" icon="bookmark-star-fill"></b-icon>
              </div>
              <div class="shadow card">
                <div class="card-horizontal">
                  <div class="img-square-wrapper">
                    <img
                      class="cardImg card-img-top img-fluid mx-auto d-block"
                      :src="pinReview[0].filePath"
                      alt="Card image"
                    />
                  </div>
                  <div class="card-body">
                    <h4 class="card-title">{{ pinReview[0].title }}</h4>
                    <p class="card-text">{{ pinReview[0].highlights }}</p>
                    <p class="card-text">
                      Rating: {{ pinReview[0].rating }}/5
                      <b-icon class="starIcon" icon="star-fill"></b-icon>
                    </p>
                  </div>
                </div>
                <div class="footerCard card-footer">
                  <a
                    class="btn btn-primary cardBtn"
                    data-toggle="collapse"
                    :data-target="pinReview[0].targetId"
                    >Read full experience</a
                  >
                  <div :id="pinReview[0].expId" class="collapse">
                    <br />
                    <div v-html="pinReview[0].content"></div>
                    <p class="textRight">Written by - {{ pinReview[0].name }}</p>
                    <p class="textRight">On - {{ pinReview[0].addedDate }}</p>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
        <div>
            <hr class="hrLine">
        </div>
      </div>
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
import mixin from '../../mixins/mixin.js';

export default {
  name: "allReviews",
  mixins: [mixin],
  data() {
    return {
      reviewsForApproval: [],
      pinReview: [],
      noPinReview: true,
    };
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
    await this.$store.dispatch("allReviewsModule/fetchPinReview");
    this.pinReview = this.$store.getters["allReviewsModule/pinReview"];
    this.noPinReview = this.$store.getters["allReviewsModule/noPinReview"];
  },
};
</script>

<style scoped src="@/css/filtersAndCards.css">
</style>

<style scoped>
.pinReviewDiv{
  margin-bottom: 30px;
}
.pinIcon{
  color: #ff0000;
}
.hrLine{
  background-color: #003865;
  max-width: 500px;
}
</style>