<template>
  <div>
    <div v-if="noReviewFound" class="font-blue notFoundDiv">
        <h4>Sorry! No review found</h4>
    </div>
    <div
      v-else
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
</template>

<script>
export default {
  name: "adminHome",
  methods: {
      approveReview(review){
        console.log(review);
        this.$store.dispatch("adminHomeModule/approveReview", review);
      },
      rejectReview(reviewId){
        console.log(reviewId);
        this.$store.dispatch("adminHomeModule/rejectReview", reviewId);
      },
  },
  computed: {
    noReviewFound() {
      // console.log(this.$store.getters['adminHomeModule/noReviewsToApprove']);
      return this.$store.getters["adminHomeModule/noReviewsToApprove"];
    },
    reviewsToApprove() {
      // console.log(this.$store.getters['adminHomeModule/reviewsToApprove']);
      return this.$store.getters["adminHomeModule/reviewsToApprove"];
    },
  },
};
</script>

<style scoped>
.notFoundDiv {
  text-align: center;
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