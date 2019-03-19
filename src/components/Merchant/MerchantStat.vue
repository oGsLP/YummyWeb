<template>
  <div id="merchant-stat">
    <div id="merchant-left-nav">

    </div>

    <div id="merchant-right-main">
      <h1>MerchantInfo</h1>
    </div>

    <div id="merchant-right-blank">

    </div>
  </div>
</template>

<script>
    import utils from "../../utils/utils";

    export default {
      name: "MerchantStat",
      data() {
        return {

        }
      },
      created(){

      },
      computed:{
        merchant_id(){
          return sessionStorage.getItem('merchantId');
        }
      },
      methods:{
        get_stat(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/merchant/${this.merchant_id}/stat`,
            callback: response=>{
              if(response.data.code===0)
                alert(response.data.msg);
              else {

              }
            }
          });
        }
      }
    }
</script>

<style scoped>
  #merchant-left-nav{
    height: auto;
    min-height: 300px;
    width: 15%;
    display: inline-block;
    vertical-align: top;
    /*border: 2px solid green;*/
  }
  #merchant-right-main{
    height: 620px;
    width: 68%;
    display: inline-block;
    vertical-align: top;
    border: 2px solid black;
    overflow-y: scroll;
    padding: 2% 0;
  }
  #merchant-right-main::-webkit-scrollbar {/*滚动条整体样式*/
    width: 0;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 0;
  }
  #merchant-right-blank{
    width: 15%;
    height: 500px;
    display: inline-block;
    vertical-align: top;
    /*border: 2px solid darkcyan;*/
  }
</style>
