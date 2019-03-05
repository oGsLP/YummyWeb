<template>
  <div id="memberLogin">
    <b-form id="member-login-form">
      <h2>Member {{log_type.charAt(0).toUpperCase()+log_type.slice(1).toLowerCase()}}</h2>
      <b-form class="member-group"
              inline>
        <label for="member-email-pre">Email:</label>
        <b-form-input v-model.trim="logData.email_pre" id="member-email-pre"
                      placeholder="member123"></b-form-input>
        <b-input-group prepend="@" id="member-email-post-group">
          <b-form-input v-model.trim="logData.email_post" id="member-email-post" placeholder="xxx.com"></b-form-input>
        </b-input-group>
      </b-form>

      <b-form-group class="member-group">
        <label for="member-password">Password:</label>
        <b-form-input name="password" type="password" id="member-password"
                 variant="outline-primary"
                 v-model.trim="logData.password"></b-form-input>
      </b-form-group>
      <b-form-group v-if="log_type==='register'" class="member-group">
        <label for="member-vertification">Vertification Code:</label>
        <b-form-input id="member-vertification" name="vertification" type="password"
                 variant="outline-primary"
                 v-model.trim="logData.vertification"></b-form-input>
        <b-button id="member-email-button" variant="outline-info" @click="sendCode">Send</b-button>
        <b-alert id="member-email-alert"
          :show="countData.dismissCountDown"
          dismissible
          variant="warning"
          @dismissed="countData.dismissCountDown=0"
          @dismiss-count-down="countDownChanged"
        >
          <p>Resend after {{ countData.dismissCountDown }} seconds...</p>
          <b-progress variant="warning" :max="countData.dismissSecs" :value="countData.dismissCountDown" height="4px" />
        </b-alert>
      </b-form-group>

      <b-form-group class="member-group" id="member-button-group">
        <b-button v-if="log_type==='login'"
                  variant="outline-dark"
                  @click="member_login">Login</b-button>
        <b-button v-else="log_type==='register'"
                  variant="outline-dark"
                  @click="member_register">Register</b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
  import utils from "../../utils/utils"
  export default {
    name: 'memberLogin',
    data () {
      return {
        logData:{
          email_pre:"",
          email_post:"",
          password:"",
          vertification:""
        },
        countData:{
          dismissSecs: 60,
          dismissCountDown: 0,
          showDismissibleAlert: false
        },
        codeVertification:"198756"
      }
    },
    computed:{
      email: function () {
        if(this.logData.email_pre==="")
          return "member123@xxx.com";
        else
          return this.logData.email_pre+'@'+this.logData.email_post;
      },
      log_type: function () {
        return this.$route.params['type'];
      }
    },
    methods:{
      getLogData(){
        return{
          email: this.email,
          password: this.logData.password
        }
      },
      sendCode(){
        utils.axiosMethod({
          method: 'POST',
          url:'/yummy/member/sendCode',
          data:{email: this.email},
          callback:(response)=>{
            alert(response.data.msg);
            setTimeout(function () {
              this.countData.dismissCountDown = this.countData.dismissSecs;
            }.bind(this),10);
          }
        });

      },
      member_login(){
        utils.axiosMethod({
          method: 'POST',
          url:'/yummy/member/login',
          data:this.getLogData(),
          callback:(response)=>{
            alert(response.data.msg);
            this.$router.push({name:'member'});
          }
        });
      },
      member_register(){
        if(this.logData.vertification===this.codeVertification){
          utils.axiosMethod({
            method: 'Post',
            url:"/yummy/member/register",
            data:this.getLogData(),
            callback:(response)=>{
              alert(response.data.msg);
            }
          });
          setTimeout(function () {
            this.$router.push({name:'memberLogin',params:{type:'login'}});
          }.bind(this),1000);

        }
        else
          alert("Not correct vertification code!");
      },


      countDownChanged(dismissCountDown) {
        this.countData.dismissCountDown = dismissCountDown;
      },

    }
  }
</script>

<style scoped>
  #member-login-form{
    width: 80%;
    margin: 5% 10% 0 10%;
    padding-top: 2%;
  }
  #member-login-form label{
    float: left;
    margin: 0 5% 0 5%;
    width: 15%;
    font-weight: bold;
  }
  .member-group{
    margin: 6% 0 5% 0;
  }
  #member-email-pre{
    width: 32.5%;
  }
  #member-email-post-group{
    margin-left: 5%;
    width: 27.5%;
  }
  #member-password {
    width: 65%;
  }
  #member-vertification{
    width: 10%;
    float: left;
    display: inline-block;
    vertical-align: middle;
  }
  #member-email-button{
    float: left;
    display: inline-block;
    vertical-align: middle;
    margin: 0 2%;
  }
  #member-email-alert{
    float: left;
    display: inline-block;
    vertical-align: middle;
    width: 42%;
    padding: 5px 20px;
    margin-bottom: 0;
  }
  #member-email-alert p{
    margin-bottom: 5px;
  }
  #member-button-group button{
    font-size: 24px;
  }

</style>
