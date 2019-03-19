<template>
  <div id="admin-setting">
    <div id="admin-left-nav">

    </div>
    <div id="admin-right-main">
      <div id="profit-part">
        <h2>Profit</h2>
        <b-table id="profit-table" striped hover :items="profits_list" />
        <div id="profit-change">
          <label>Current Ratio: <b>{{ratio}}%</b></label>
          <b-form-input placeholder="0" v-model.trim="newRatio"></b-form-input>
          <b-button variant="success" @click="save_ratio">Change</b-button>
        </div>
      </div>
      <div id="discount-part">

      </div>

    </div>
    <div id="admin-right-blank">

    </div>
  </div>
</template>

<script>
    import utils from "../../utils/utils";

    export default {
      name: "AdminSetting",
      data(){
        return{
          profits: [],
          ratio: '',
          newRatio: '',
          discounts: [],
        }
      },
      created(){
        this.get_ratio();
        this.get_profits();
        this.get_discounts();
      },
      computed:{
        profits_list(){
          let array = [];
          this.profits.forEach((profit,index)=>{
            array.push({id: index+1, ratio: profit.ratio+'%', modifyDate: profit.effectDate});
          });
          return array;
        }
      },
      methods:{
        get_ratio(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/admin/manage/profits`,
            callback: response=>{
              if(response.data.code===1)
                this.ratio=response.data.object;
            }
          });
        },
        get_profits(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/admin/manage/profits`,
            params: {type: 'all'},
            callback: response=>{
              if(response.data.code===1)
                this.profits=response.data.list;
            }
          })
        },
        save_ratio(){
          utils.axiosMethod({
            method: 'POST',
            url: `/yummy/admin/manage/profits`,
            params:{profit: this.newRatio} ,
            callback: response=>{
              alert(response.data.msg);
              if(response.data.code===1){
                this.get_profits();
                this.get_ratio();
              }
            }
          });
        },
        get_discounts(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/admin/manage/discounts`,
            callback: response=>{
              if(response.data.code===1)
                this.discounts=response.data.list;
            }
          });
        },
        save_discounts(){
          utils.axiosMethod({
            method: 'PUT',
            url: `/yummy/admin/manage/discounts`,
            data: this.discounts,
            callback: response=>{
              alert(response.data.msg);
              if(response.data.code===1)
                this.get_discounts();
            }
          })
        }
      }
    }
</script>

<style scoped>
  #admin-left-nav{
    height: auto;
    min-height: 300px;
    width: 8%;
    display: inline-block;
    vertical-align: top;
    /*border: 2px solid green;*/
  }
  #admin-right-main{
    height: 620px;
    width: 82%;
    display: inline-block;
    vertical-align: top;
    border-left: 2px solid black;
    border-right: 2px solid black;
    overflow-y: scroll;
    padding: 2% 0;
    text-align: center;
  }
  #admin-right-main::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  #admin-right-blank{
    width: 8%;
    height: 500px;
    display: inline-block;
    vertical-align: top;
  }

  #profit-part{
    height: auto;
    width: 90%;
    margin: 0 5%;
    border-bottom: 2px solid black;
    padding-bottom: 10px;
  }
  #profit-table{
    width: 60%;
    margin: 1% 20%;
  }
  #profit-change label{
    display: inline-block;
    font-size: 24px;
  }
  #profit-change input{
    display: inline-block;
    width: 5%;
    margin: 1% 5% 1% 10%;
  }
  #profit-change button{
    display: inline-block;
  }
</style>
