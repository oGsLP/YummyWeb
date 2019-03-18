<template>
  <div id="merchant-deal">
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
        name: "MerchantDeal",
      data() {
        return {

        }
      },
      created(){

      },
      computed:{

      },
      methods:{
        get_deals(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/merchant/1/deals`,
            callback: (response)=>{
              //
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
