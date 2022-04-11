<template>
    <div>
        <div class="container text-center">
            <h2 class="font-blue">Fill out below form to update your experience!</h2>
            <p class="redFont">Note: * indicates required field.</p>
        </div> 
        <div class="container">
            <form class="was-validated" @submit="submitReview" id="formAdd" name="formAdd">
                <input v-model="updateData._id" type="hidden" name="appId" id="appID" >
                <div class="form-group">
                    <label for="name"><span class="redFont">*</span> Name:</label>
                    <input v-model="updateData.name" pattern="[a-zA-Z]{1,}[ ]{0,1}[a-zA-Z]{1,}" title="Please enter valid name with only alphabets." type="text" name="name" class="form-control" id="name" placeholder="Enter your full name here..." minlength="3" required>
                </div>
                <input v-model="updateData.addedDate" type="hidden" name="curDate">
                <div class="form-group">
                    <label for="reviewer"><span class="redFont">*</span> Choose option:</label>
                    <br>
                    <div class="form-check-inline">
                        <label class="form-check-label" for="radio1">
                            <input v-model="updateData.reviewer" type="radio" class="form-check-input" id="radio1" name="reviewer" value="Student" required>Student
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label" for="radio2">
                            <input v-model="updateData.reviewer" type="radio" class="form-check-input" id="radio2" name="reviewer" value="College staff" required>College staff
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label" for="radio3">
                            <input v-model="updateData.reviewer" type="radio" class="form-check-input" id="radio3" name="reviewer" value="Visitor" required>Visitor
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="email"><span class="redFont">*</span> Email:</label>
                    <input v-model="updateData.email" type="email" pattern="[a-zA-Z0-9]{1,}[a-zA-Z0-9.-_]{1,}@[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,}[.]{0,1}[a-zA-Z]{0,}" title="Please enter valid email id." name="email" class="form-control" id="email" placeholder="Enter your email id here..." required>
                </div>
                <div class="form-group">
                    <label for="title"><span class="redFont">*</span> Title:</label>
                    <input v-model="updateData.title" type="text" name="title" class="form-control" id="title" placeholder="Enter experience title here..." required>
                </div>
                <div class="form-group">
                    <label for="highlights"><span class="redFont">*</span> Highlights:</label>
                    <input v-model="updateData.highlights" type="text" title="Please enter highlights of review between 3 to 30 characters." name="highlights" class="form-control" id="highlights" placeholder="Enter highlights for your experience..." required minlength="3" maxlength="30">
                </div>
                <div class="form-group">
                    <label for="content">Content (Optional):</label>
                    <div class="editorContainer">
                        <vue-editor v-model="updateData.content" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="reviewer"><span class="redFont">*</span> Rate your experience(Here 1 indicates very poor and 5 indicates excellent):</label>
                    <br>
                    <div class="form-check-inline">
                        <label class="form-check-label" for="rating1">
                            <input v-model="updateData.rating" type="radio" class="form-check-input" id="rating1" name="rating" value="1" required>
                            1<b-icon class="starIcon" icon="star-fill"></b-icon>
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label" for="rating2">
                            <input v-model="updateData.rating" type="radio" class="form-check-input" id="rating2" name="rating" value="2" required>
                            2<b-icon class="starIcon" icon="star-fill"></b-icon>
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label" for="rating3">
                            <input v-model="updateData.rating" type="radio" class="form-check-input" id="rating3" name="rating" value="3" required>
                            3<b-icon class="starIcon" icon="star-fill"></b-icon>
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label" for="rating3">
                            <input v-model="updateData.rating" type="radio" class="form-check-input" id="rating3" name="rating" value="4" required>
                            4<b-icon class="starIcon" icon="star-fill"></b-icon>
                        </label>
                    </div>
                    <div class="form-check-inline">
                        <label class="form-check-label" for="rating3">
                            <input v-model="updateData.rating" type="radio" class="form-check-input" id="rating3" name="rating" value="5" required>
                            5<b-icon class="starIcon" icon="star-fill"></b-icon>
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="file">Upload Image(Optional - releted to your experience - Only .png and .jpg file):</label>
                    <input type="file" name="file" class="form-control" @change="imageValidation"/>
                </div>
                <div class="container">
                    <p class="redFont">
                        <strong>Note: </strong>
                        The identity of the user will be kept confidential. However any falsification in the below details will be viewed seriously by our admin.
                    </p>
                </div>
                <br>
                <div class="text-center">
                    <div class="text-center submitBtnDiv">
                        <button type="submit" class="btn btn-success btn-block">Update experience</button>
                    </div>
                </div>
            </form>
            <br>
        </div>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

    export default {
        name: 'updateReview',
        components: {
            VueEditor
        },
        data(){
            return{
                updateData: {},
            };
        },
        methods: {
            imageValidation(event){
                let _validFileExtensions = [".png", ".jpg"];
                let imgFile = event.target;
                if (imgFile.type == "file") {
                    let sFileName = imgFile.value;
                    if (sFileName.length > 0) {
                        let blnValid = false;
                        for (let j = 0; j < _validFileExtensions.length; j++) {
                            let sCurExtension = _validFileExtensions[j];
                            if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                                blnValid = true;
                                break;
                            }
                        }
                        
                        if (!blnValid) {
                            alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                            imgFile.value = "";
                            return false;
                        }
                    }
                }
                return true;
            },
            submitReview(event){
                // console.log(event.target);
                // console.log(this.updateData.content);
                let editor = document.createElement('input');
                editor.type = 'text';
                editor.name = 'content';
                editor.value = this.updateData.content;
                event.target.append(editor);
                event.target.enctype = "multipart/form-data";
                event.target.method = "POST";
                event.target.action = "http://localhost:5000/updateExps";
                // console.log(event.target.action);
                // console.log(event.target.method);
            },
        },
        created(){
            this.updateData = this.$store.getters['findReviewModule/findData'];
        },
    }
</script>

<style scoped>
.submitBtnDiv{
    max-width: 600px;
    margin: auto;
}
.editorContainer{
    background-color: #ffffff;
}
</style>