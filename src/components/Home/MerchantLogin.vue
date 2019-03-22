<template>
  <div id="merchant-login">
    <b-form id="merchant-login-form">
      <h2>Merchant {{log_type.charAt(0).toUpperCase()+log_type.slice(1).toLowerCase()}}</h2>
      <b-form-group
        id="cdkey-set"
        description="Haven't got one? Apply for it !"
        label="CDKey"
        label-for="merchant-login-cdkey"
      >
        <b-form-input id="merchant-login-cdkey" v-model="logData.cdkey" trim />
        <b-button id="merchant-apply-button"
                  variant="outline-danger"
                  :disabled="log_type==='login'"
                  @click="apply_cdkey">apply</b-button>
      </b-form-group>

      <b-form-group
        id="password-set"
        label="Password"
        label-for="merchant-login-password"
        :invalid-feedback="invalidFeedback"
        :valid-feedback="validFeedback"
        :state="state"
      >
        <b-form-input id="merchant-login-password" :state="state" type="password" v-model="logData.password" trim />
      </b-form-group>
      <b-form-group id="merchant-button-group">
        <b-button v-if="log_type==='login'"
                  variant="outline-dark"
                  @click="merchant_login">Login</b-button>
        <b-button v-else="log_type==='register'"
                  variant="outline-dark"
                  @click="merchant_register">Register</b-button>
      </b-form-group>
    </b-form>

  </div>
</template>

<script>
  import utils from "../../utils/utils";

  export default {
    data() {
      return {
        logData:{
          cdkey:'',
          password:''
        },
        cdkeySign: true,
        lastApply: '',

      }
    },
    computed: {
      log_type(){
        return this.$route.params['type'];
      },
      state() {
        return this.logData.password.length >= 6
      },
      invalidFeedback() {
        if (this.logData.password.length > 6) {
          return ''
        } else if (this.logData.password.length > 0) {
          return 'Enter at least 6 characters'
        } else {
          return 'Please enter your password'
        }
      },
      validFeedback() {
        return this.state === true ? 'Thank you' : ''
      },

    },
    methods: {
      apply_cdkey(){
        if(this.cdkeySign===true){
          utils.axiosMethod({
            method: 'GET',
            url: '/yummy/login/merchant/apply',
            callback: (response)=>{
              let cdkey=response.data.object;
              this.logData.cdkey=cdkey;
              this.lastApply=cdkey;
              this.cdkeySign=false;
              alert(cdkey);
            }
          });
        }
        else{
          alert('Already applied! Don\'t apply repeatedly\nLast Applied: '+this.lastApply);
        }
      },
      merchant_register(){
        utils.axiosMethod({
          method: 'POST',
          url: '/yummy/login/merchant/register',
          data: this.logData,
          callback: (response)=>{
            alert(response.data.msg);
            if(response.data.code===1)
              this.$router.push({name: 'merchantLogin', params:{type: 'login'}});
          }
        });
      },
      merchant_login(){
        utils.axiosMethod({
          method: 'POST',
          url: '/yummy/login/merchant/login',
          data: this.logData,
          callback: (response)=>{
            alert(response.data.msg);
            if(response.data.code===1){
              sessionStorage.setItem('vertification',response.data.object.vertification);
              this.$store.dispatch('setUser',response.data.object);
              this.$store.dispatch('setToken',response.data.object.id);
              this.$router.push({name: 'merchantInfo',params:{cdkey:this.logData.cdkey}});
            }

          }
        })
      },

    }

  }
</script>

<style scoped>
  #merchant-login{

  }
  #merchant-login-form{
    width: 80%;
    margin: 5% 10% 0 10%;
    padding-top: 2%;
  }
  #merchant-login-form h2{
    margin-bottom: 5%;
  }
  #merchant-login-form label{
    float: left;
    margin: 0 5% 0 5%;
    width: 15%;
    font-weight: bold;
  }
  #merchant-login-cdkey{
    width: 50%;
    display: inline-block;
    margin-right: 5%;
  }
  #merchant-apply-button{
    display: inline-block;
  }
  #merchant-login-password{
    width: 70%;
    margin-left: 14%;
  }
</style>
