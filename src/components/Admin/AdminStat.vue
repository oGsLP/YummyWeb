<template>
  <div id="admin-stat">
    <div id="admin-left-nav">

    </div>
    <div id="admin-right-main">

    </div>
    <div id="admin-right-blank">

    </div>
  </div>
</template>

<script>
    export default {
      name: "AdminStat",
      data(){
        return{

        }
      },
      created(){

      },
      computed:{

      },
      methods:{

      }
    }
</script>

<style scoped>
  #admin-left-nav{
    height: auto;
    min-height: 300px;
    width: 15%;
    display: inline-block;
    vertical-align: top;
  }
  #admin-right-main{
    height: 620px;
    width: 68%;
    display: inline-block;
    vertical-align: top;
    border: 2px solid black;
    overflow-y: scroll;
    padding: 2% 0;
  }
  #admin-right-main::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  #admin-right-blank{
    width: 15%;
    height: 500px;
    display: inline-block;
    vertical-align: top;
  }
</style>
