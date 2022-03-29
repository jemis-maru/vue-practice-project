<template>
  <div class="mainDiv">
    <div class="homeTitle shadow p-3 mb-5 bg-white container text-center">
      <h1 class="font-blue">Welcome to Experience sharing portal</h1>
      <p class="font-blue">
        Our average rating is {{ averageRating }}
        <b-icon class="starIcon" icon="star-fill"></b-icon> out of 5
        <b-icon
          class="starIcon"
          icon="star-fill"
        ></b-icon>
      </p>
    </div>
    <div class="container">
      <h3 class="font-blue">About us</h3>
      <br />
      <p class="font-blue">
        We provide online platform for students, college staffs and visitors in
        our college in which they can share their experience(good or bad)
        including rating. From your reviews we will improve or manage our
        facilities.
      </p>
      <p class="font-blue">
        You can read our reviews which we got from our students, college staff
        and visitors. This reviews are useful for those who want to visit our
        campus or want to make their future with VGEC.
      </p>
    </div>
    <div class="container">
      <p class="redFont">
        <strong>Note: </strong> The identity of the user will be kept
        confidential. However any falsification in the details will be viewed
        seriously by our admin and strict action will be taken.
      </p>
    </div>
    <div v-if="isSliderEmpty">
      <div class="container highlightContainer">
        <h3 class="font-blue">Highlighted reviews</h3>
      </div>
      <div id="demo" class="carousel slide" data-ride="carousel">
        <ul class="carousel-indicators">
          <li data-target="#demo" data-slide-to="0" class="active"></li>
          <li data-target="#demo" data-slide-to="1"></li>
          <li data-target="#demo" data-slide-to="2"></li>
          <li data-target="#demo" data-slide-to="3"></li>
          <li data-target="#demo" data-slide-to="4"></li>
        </ul>
        <div class="blueBackground carouselDiv carousel-inner">
          <div class="carousel-item active">
            <div class="container">
              <div class="row">
                <div class="col-12 mt-3">
                  <div class="shadow card blueBackground">
                    <div class="card-horizontal">
                      <div class="card-body">
                        <div v-html="sliderFirstData.content"></div>
                      </div>
                    </div>
                    <div class="card-footer">
                      <div :id="sliderFirstData.expId">
                        <p class="fontRight">Written by - {{sliderFirstData.name}}({{sliderFirstData.reviewer}})</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-for="exps in sliderWithoutFirst" :key="exps.expId" class="carousel-item">
            <div class="container">
              <div class="row">
                <div class="col-12 mt-3">
                  <div class="shadow card blueBackground">
                    <div class="card-horizontal">
                      <div class="card-body">
                        <div v-html="exps.content"></div>
                      </div>
                    </div>
                    <div class="card-footer">
                      <div :id="exps.expId">
                        <p class="fontRight">Written by - {{exps.name}}({{exps.reviewer}})</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" data-target="#demo" data-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" data-target="#demo" data-slide="next">
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
    </div>
    <div class="reportDiv container">
      <h3 class="font-blue">Report an issue</h3>
      <br>
      <form class="was-validated" action="http://localhost:5000/issueData" method="post" encType="application/x-www-form-urlencoded">
        <div class="form-group">
            <label for="email"><span class="redFont">*</span> Email:</label>
            <input type="email" pattern="[a-zA-Z0-9]{1,}[a-zA-Z0-9.-_]{1,}@[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,}[.]{0,1}[a-zA-Z]{0,}" title="Please enter valid email id." name="email" class="form-control" id="email" placeholder="Enter your email id here..." required>
        </div>
        <div class="form-group">
            <label for="content"><span class="redFont">*</span> Issue:</label>
            <textarea type="text" name="issue" id="issue" class="form-control" rows="5" placeholder="Write your issue here..." required></textarea>
        </div>
        <br>
        <div class="text-center">
            <div class="reportBtn text-center">
              <button type="submit" class="btn btn-success btn-block">Submit</button>
            </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
    };
  },
  methods:{
  },
  computed: {
      averageRating(){
          return this.$store.getters['homeModule/avgRating'];
      },
      isSliderEmpty(){
          return !this.$store.getters['homeModule/emptySlider'];
      },
      sliderFirstData(){
        return this.$store.getters['homeModule/firstSliderData'];
      },
      sliderWithoutFirst(){
        return this.$store.getters['homeModule/withoutFirstData'];
      },
  },
};
</script>

<style scoped>
.mainDiv {
  min-height: 100vh;
}
.homeTitle {
  background-color: #ffffff;
}
.blueBackground {
  background-color: #003865;
}
.starIcon {
  color: #ffa500;
}
.redFont {
  color: #ff0000;
}
.highlightContainer {
  margin-top: 50px;
}
.carouselDiv {
  color: #ffffff;
  margin-top: 20px;
  padding-bottom: 10px;
}
.fontRight {
  text-align: right;
}
.reportDiv{
  margin-top: 50px;
}
.reportBtn{
  max-width: 600px;
  margin: auto;
}
</style>