<template>
    <div>
        <div v-if="disableFindForm" class="container text-center">
            <h3 class="font-blue">Enter your registration ID to find your experience.</h3>
            <br>
            <div class="form-row">
                <div class="form-group col-md-3"></div>
                <div class="form-group col-md-3">
                    <input v-model="enteredId" type="text" name="appId" class="form-control" id="appId" placeholder="Enter Registration ID">
                </div>
                <div class="form-group col-md-3">
                    <button @click="findReviewFun" type="button" class="btn btn-success btn-block">Find</button>
                </div>
                <div class="form-group col-md-3"></div>
            </div>
        </div>
        <div v-else>
            <div class="card reviewCard">
                <h4 class="cardTitle">{{findData.title}}</h4>
                <img class="reviewImg card-img-top img-fluid mx-auto d-block" :src="findData.filePath" alt="Card image">
                <div class="card-body">
                    <p class="card-text">{{findData.highlights}}</p>
                    <p class="card-text">Rating: {{findData.rating}}/5
                        <b-icon
                            class="starIcon"
                            icon="star-fill"
                        ></b-icon>
                    </p>
                    <a class="btn btn-primary collapseBtn" data-toggle="collapse" :data-target="findData.targetId">Read full experience</a>
                    <div :id="findData.expId" class="collapse">
                        <br>
                        <div v-html="findData.content"></div>
                        <p class="text-right">Created by - {{findData.name}}</p>
                        <p class="text-right">On - {{findData.addedDate}}</p>
                        <p class="text-right">Contact details - {{findData.email}}</p>
                        <br>
                        <a @click="updateFun" class="btn btn-info">Update</a>
                        <a @click="deleteReviewFun(findData._id)" class="deleteBtn btn btn-danger">Delete</a>
                    </div>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'findReview',
        data(){
            return{
                enteredId: '',
                findData: {},
                disableFindForm: true,
            };
        },
        methods: {
            async findReviewFun(){
                if(this.enteredId === ''){
                    alert("Please enter something to find a review");
                    return;
                }
                // console.log(this.enteredId);
                await this.$store.dispatch('findReviewModule/findReview', this.enteredId);
                this.findData = this.$store.getters['findReviewModule/findData'];
                console.log(this.findData);
                this.disableFindForm = false;
            },
            updateFun(){
                this.$router.replace('/updateReview');
            },
            deleteReviewFun(reviewId){
                if(confirm('Want to delete review?'))
                {
                    this.$store.dispatch("findReviewModule/deleteReview", reviewId);
                }
            },
        },
    }
</script>

<style scoped>
.reviewCard{
    max-width: 1000px;
    padding: 10px;
    margin: auto;
}
.reviewImg{
    max-width: 950px;
    height: 400px;
}
.cardTitle{
    text-align: center;
}
.collapseBtn{
    display: grid;
}
.deleteBtn{
    float: right;
    text-align: right;
}
</style>