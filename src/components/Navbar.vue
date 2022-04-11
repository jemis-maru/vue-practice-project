<template>
  <div>
  <nav id="nav" class="navbar shadow-sm navbar-expand-lg navbar-dark fixed-top">
        <a class="navbar-brand">
          <router-link to="/home" class="routerLink">
            <div class="row">
              <div class="col navbarLogoDiv">
                <img class="rounded-circle navbarLogo" src="../assets/logo.png" alt="logo">
              </div>
              <div class="col">
                <p class="navTitle">VGEC
                  <br>
                  <span class="navSubTitle">Experience sharing portal</span>
                </p>
              </div>
            </div>
          </router-link>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <router-link to="/demo" class="routerLink">
              <li class="nav-item active">
                <a class="nav-link">Demo <span class="sr-only">(current)</span></a>
              </li>
            </router-link>
            <router-link to="/allReviews" class="routerLink">
              <li class="nav-item active">
                <a class="nav-link">Read reviews <span class="sr-only">(current)</span></a>
              </li>
            </router-link>
            <router-link to="/addReview" class="routerLink">
              <li class="nav-item active">
                <a class="nav-link">Add review <span class="sr-only">(current)</span></a>
              </li>
            </router-link>
            <router-link to="/findReview" class="routerLink">
              <li class="nav-item active">
                <a class="nav-link">Find review <span class="sr-only">(current)</span></a>
              </li>
            </router-link>
            <router-link to="/admin" class="routerLink">
              <li class="nav-item active">
                <a class="nav-link">Admin <span class="sr-only">(current)</span></a>
              </li>
            </router-link>
            <li class="mouseCursor nav-item active">
              <a v-if="isLogin" @click="logoutFun" class="nav-link">Logout <span class="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
    </nav>
</div>
</template>

<script>
export default {
  // data(){
  //   return{
  //     isLogin: true,
  //   };
  // },
  methods:{
    logoutFun(){
      this.$store.dispatch('adminLoginModule/logoutClicked');
    },
  },
  computed:{
    isLogin(){
      return this.$store.getters['adminLoginModule/isLogin'];
    },
  },
}
</script>

<style scoped>

.nav-link {
    color: #ffffff !important;
    font-weight: bold !important;
}
.navbar-brand{
    color: #ffffff !important;
}
.navbar-toggler-icon{
    color: #ffffff !important;
}
.navbar-toggler{
    border-color: #003865 !important;
}
#nav {
    background-color:  #003865;
    -webkit-box-shadow: 0 8px 6px -6px rgb(158, 156, 156) !important;
    -moz-box-shadow: 0 8px 6px -6px rgb(158, 156, 156) !important;
    box-shadow: 0 8px 6px -6px rgb(158, 156, 156) !important;
}
.navbarLogoDiv{
    display: flex;
    justify-content: center;
}
.navbarLogo{
    width: 50px;
    margin: auto;
}
.navTitle{
    margin-top: auto;
    margin-bottom: auto;
    font-weight: bold;
    font-size: medium;
}
.navSubTitle{
    font-weight: normal;
    font-size: small;
}
.routerLink{
  text-decoration: none;
  color: #ffffff;
}
.mouseCursor{
  cursor: pointer;
}

</style>