<template>
    <div>
        <div class="container text-center">
            <h2 class="font-blue">Admin Login</h2>
        </div> 
        <br>
        <div class="container-fluid formDiv">
            <form @submit.prevent="adminLoginFun">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input v-model="admin.username" type="text" name="username" class="form-control" id="username" placeholder="Enter your username" required>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input v-model="admin.password" type="password" name="password" class="form-control" id="password" placeholder="Enter your password" required>
                </div>
                <br>
                <div class="text-center">
                    <div class="formBtnDiv text-center">
                        <button type="submit" class="btn btn-success btn-block">Login</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'adminLogin',
        data(){
            return{
                admin: {},
            };
        },
        methods:{
            adminLoginFun(){
                this.$store.dispatch('adminLoginModule/adminVerification', this.admin);
                this.admin = {};
            },
        },
    }
</script>

<style scoped>
.formDiv{
    max-width: 500px;
}
.formBtnDiv{
    max-width: 200px;
    margin: auto;
}
</style>