<template>
    <div>
        <div class="shadow p-3 mb-5 bg-white container text-center">
            <h1 class="font-blue">Demo for Experience sharing portal</h1>
            <p class="font-blue">You can watch demo video or can read our user manual as well.</p>
        </div> 
        <div class="container">
            <h3 class="font-blue">Watch video</h3>
            <br>
            <div class="videoDiv embed-responsive embed-responsive-16by9">
                <iframe class="videoFrame" src="https://www.youtube.com/embed/u9dGFuxuONg" allowfullscreen></iframe>
            </div>
        </div> 
        <br>
        <div class="container">
            <h3 class="font-blue">Read our document for user manual</h3>
            <br>
            <p class="font-blue">Click to read: <a class="btn btn-success" target="_blank" href="http://localhost:5000/viewManual">View manual</a></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'demo',
    }
</script>

<style scoped>
.videoDiv{
    height: 500px;
    border-radius: 5px;
    border: 2px solid #003865;
}
.videoFrame{
    height: 500px;
}
</style>