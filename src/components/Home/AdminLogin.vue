<template>
    <div id="admin-login">
      <h2>adminLogin</h2>
      <b-form>
        <b-form-group class="code-group">
          <label class="code-frag">CodeA : <b-form-input placeholder="1234" v-model.trim="verifyData.codeA"></b-form-input></label>
          <label class="code-frag">CodeB : <b-form-input placeholder="abcd" v-model.trim="verifyData.codeB"></b-form-input></label>
        </b-form-group>
        <b-form-group class="code-group">
          <label class="code-frag">CodeC : <b-form-input placeholder="1234" v-model.trim="verifyData.codeC"></b-form-input></label>
          <label class="code-frag">CodeD : <b-form-input placeholder="abcd" v-model.trim="verifyData.codeD"></b-form-input></label>
        </b-form-group>
        <b-form-group class="code-group">
          <label class="code-frag">Password : <b-form-input placeholder="123456" v-model.trim="verifyData.password"></b-form-input></label>
        </b-form-group>
      </b-form>
      <b-button variant="outline-info"
                @click="admin_verify"
                >Verify</b-button>
    </div>
</template>

<script>
    import utils from "../../utils/utils";

    export default {
      name: "AdminLogin",
      data() {
        return {
          verifyData:{
            codeA: '',
            codeB: '',
            codeC: '',
            codeD: '',
            password: ''
          }
        }
      },
      computed:{
        not_blank(){
          return this.verifyData.codeA.length>0&&this.verifyData.codeB.length>0&&this.verifyData.codeC.length>0
            &&this.verifyData.codeD.length>0&&this.verifyData.password.length>0;
        }
      },
      methods:{
        admin_verify(){
          if(this.not_blank){
            utils.axiosMethod({
              method: 'POST',
              url: '/yummy/login/admin',
              data: this.verifyData,
              callback: (response)=>{
                alert(response.data.msg);
                if(response.data.code===1){
                  this.$store.dispatch('setUser','admin');
                  this.$store.dispatch('setToken','admin');
                  this.$router.push({name: 'admin'})
                }

              }
            });
          }
          else alert("Invalid code!");
        }
      }
    }
</script>

<style scoped>

  h2{
    margin: 5%;
    font-weight: bold;
  }
  .code-group{
    width: 80%;
    margin: 2% 10%;
    text-align: center;
  }
  .code-frag{
    margin: 0 4%;
    border-top: 1px solid gainsboro;
    border-bottom: 1px solid black;
  }

  input{
    text-align: center;
  }

</style>
