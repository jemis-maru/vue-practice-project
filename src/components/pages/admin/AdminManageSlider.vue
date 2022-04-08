<template>
  <div>
    <div class="shadow p-3 mb-5 bg-white container text-center">
        <h1 class="font-blue">Welcome to admin page of Experience sharing portal</h1>
        <p class="font-blue">You can read our reviews which we got from our students, college staff and visitors.</p>
    </div>
    <div class="container adminDropdown">
      <admin-dropdown></admin-dropdown>
    </div>
    <div v-if="isSliderEmpty" class="font-blue notFoundDiv">
        <h4>Sorry! No review found</h4>
    </div>
    <div v-else>
      <div class="container filterContainer">
          <div class="row deleteSelectedDiv">
              <div class="col-3"></div>
              <div class="col-6 form-row font-blue">
                  <label class="col-sm-8 col-form-label">Delete selected reviews: </label>
                  <a class="form-control col-sm-4 btn btn-danger" @click="deleteMultipleFun">Delete</a>
              </div>
              <div class="col-3"></div>
          </div>
      </div>
      <div
        class="container-fluid cardContainer"
        v-for="expe in sliderData"
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
                  <br />
                  <div class="removeBtnDiv">
                    <a @click="removeReviewFromSlider(expe._id)" class="removeBtn btn btn-danger">Remove</a>
                  </div>
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
import AdminDropdown from '../../AdminDropdown.vue';

    export default {
        name: 'adminManageSlider',
        components: {
            'admin-dropdown': AdminDropdown,
        },
        data(){
            return{
                sliderData: [],
                multipleSelectArr: [],
            };
        },
        methods: {
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
            removeReviewFromSlider(reviewId){
                if(confirm('Want to remove review?')){
                    this.$store.dispatch("adminManageSliderModule/deleteSliderReview", reviewId);
                }
            },
            deleteMultipleFun(){
                if(this.multipleSelectArr.length == 0){
                    alert("Please select atleast one review");
                    return;
                }
                // console.log(this.multipleSelectArr);
                if(confirm('Want to remove reviews?'))
                {
                    // console.log(this.multipleSelectArr);
                    this.$store.dispatch("adminManageSliderModule/deleteMultipleSlider", this.multipleSelectArr);
                }
            },
        },
        computed: {
            isSliderEmpty(){
                return this.$store.getters["homeModule/emptySlider"];
            },
        },
        async created(){
            await this.$store.dispatch("homeModule/fetchSliderExperiences");
            this.sliderData = this.$store.getters["homeModule/sliderData"];
            // console.log(this.sliderData);
        },
    }
</script>

<style scoped src="@/css/filtersAndCards.css">
</style>

<style scoped>
.deleteSelectedDiv{
    margin-top: 30px;
}
.removeBtnDiv{
    width: auto;
    text-align: center;
}
.removeBtn{
    margin: 0 auto;
}
</style>