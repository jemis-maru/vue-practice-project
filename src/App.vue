<template>
  <div>
    <header>
      <navbar></navbar>
    </header>
    <section class="mainSection">
      <router-view></router-view>
    </section>
    <section>
      <custom-footer></custom-footer>
    </section>
  </div>
</template>

<script>
import CustomFooter from './components/CustomFooter.vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    'navbar': Navbar,
    'custom-footer': CustomFooter,
  },
  created(){
    this.$store.dispatch('adminHomeModule/fetchReviewToApprove');
    this.$store.dispatch('adminLoginModule/isAlreadyLogin');
    this.$store.dispatch('homeModule/fetchAvgRating');
    this.$store.dispatch('homeModule/fetchSliderExperiences');
  },
}
</script>

<style>
.mainSection{
  background-color: #f9f9f9;
  padding-top: 100px;
  padding-bottom: 50px;
}
.container{
  border-radius: 10px !important;
}
.font-blue {
  color: #003865;
}
.redFont {
  color: #ff0000;
}
.starIcon {
  color: #ffa500;
}
</style>
