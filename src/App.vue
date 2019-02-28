<template>
  <div id="app">
    <form>
      <label for="username">Username</label>
      <input type="text" v-model.trim="loginData.username" name="username" id="username">
      <label for="password">Password</label>
      <input type="password" v-model.trim="loginData.password" id="password" name="password">
      <input type="button" value="Log in" @click="doLogin">
    </form>
  </div>
</template>

<script>
import utils from "./utils/utils"
export default {
  name: 'login',
  data () {
    return {
      loginData:{
        username:"",
        password:""
      }
    }
  },
  methods:{
    doLogin(){
      let success=(response)=>{
        alert(response.data.msg);
      };
      utils.axiosMethod({
        method: "POST",
        url:"/yummy/login/",
        data:this.loginData,
        callback:success
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
