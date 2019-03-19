<template>
  <h1>You have no access to this url... <a id="back-a" @click="back">Back>></a></h1>

</template>

<script>
    export default {
      name: "NoAccess",
      methods:{
        back(){
          this.$router.go(-2);
        }
      }
    }
</script>

<style scoped>
  h1{
    margin-top: 20%;
  }
  #back-a{
    text-underline: orange;
    color: orange;
    cursor: pointer;
    border-bottom: 3px orange solid;
  }
</style>
