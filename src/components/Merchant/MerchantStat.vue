<template>
  <div id="merchant-stat">
    <div id="merchant-left-nav">

    </div>

    <div id="merchant-right-main">
      <div id="info-stat">
        <h2>Personal Stat</h2>
        <p><label>MerchantId: </label><b>{{merchant_id}}</b></p>
        <p><label>Cdkey: </label><b>{{merchant_cdkey}}</b></p>
        <p><label>Deal Sum : </label><b>{{stat.complete}}</b></p>
        <p><label>Benefit : </label><b>{{stat.total}}</b></p>
        <p><label>Refunded : </label><b>{{stat.refund}}</b></p>
        <p><label style="display: block;margin: 0" >Favourite Members: </label><b v-for="member of mostUsuallyMembers"> | <code>{{member.name}}</code> | </b></p>
        <label style="display: block;margin: 0">Discount: </label>
        <b-form-input v-model="discount.min" placeholder="Min"></b-form-input>
        <b-form-input v-model="discount.discount" placeholder="Discount"></b-form-input>
        <b-button @click="modify_discount">Modify</b-button>
      </div>
      <div id="info-chart">
        <h2>Deal Stat</h2>
        <pie-chart v-if="loaded"
                   id="deal-type-pie" class="pie-chart" :chart-data="deals_data"></pie-chart>
      </div>
    </div>

    <div id="merchant-right-blank">

    </div>
  </div>
</template>

<script>
    import utils from "../../utils/utils";
    import PieChart from "../Charts/PieChart";

    export default {
      name: "MerchantStat",
      components: {
        PieChart
      },
      data() {
        return {
          dealType:[
            {enum: '', name: ''},
            {enum: 'CANCELLED', name: 'Cancelled'},
            {enum: 'REFUNDED', name: 'Refund'},
            {enum: 'RECEIVED', name: 'Completed'}
          ],
          deals:{
            cancelled:[],
            refunded:[],
            completed:[]
          },
          deals_load:false,
          deals_data:{
            labels: ['Cancelled', 'Refunded', 'Completed'],
            datasets: [
              {
                data: []
              }
            ]
          },
          stat:{},
          mostUsuallyMembers:[],
          discount:{},
          loaded: false,

        }
      },
      created(){
        this.get_deals(1);
        this.get_deals(2);
        this.get_deals(3);
        this.get_stat();
        this.get_discount();
      },
      mounted() {
        setTimeout(()=>{
          this.loaded=true;
        },1000)
      },
      computed:{
        merchant_id(){
          return sessionStorage.getItem('merchantId');
        },
        merchant_cdkey(){
          return sessionStorage.getItem('cdkey');
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
                this.stat = response.data.object;
                this.mostUsuallyMembers = response.data.list;
              }
            }
          });
        },
        get_discount() {
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/merchant/${this.merchant_id}/stat/discounts`,
            callback: response=>{
              if(response.data.code===0)
                alert(response.data.msg);
              else {
                this.discount = response.data.object;
              }
            }
          })
        },
        modify_discount() {
          utils.axiosMethod({
            method: 'PUT',
            url: `/yummy/merchant/${this.merchant_id}/stat/discounts`,
            data: this.discount,
            callback: response=>{
              alert(response.data.msg);
              if(response.data.code===1)
                this.get_discount();
            }
          })
        },
        get_deals(i){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/merchant/${this.merchant_id}/deals`,
            params: {type : this.dealType[i].enum},
            callback: (response)=>{
              if(response.data.code===1){
                if(i===1){
                  this.deals.cancelled=response.data.list;
                  this.deals_data.datasets[0].data[0]=response.data.list.length;
                }
                else if(i===2){
                  this.deals.refunded=response.data.list;
                  this.deals_data.datasets[0].data[1]=response.data.list.length;
                }
                else if(i===3){
                  this.deals.completed=response.data.list;
                  this.deals_data.datasets[0].data[2]=response.data.list.length;
                }
              }
              else alert(response.data.msg);
            }
          });
        },
      }
    }
</script>

<style scoped>
  #merchant-left-nav{
    height: auto;
    min-height: 300px;
    width: 10%;
    display: inline-block;
    vertical-align: top;
    margin-right: 0.5%;
    /*border: 2px solid green;*/
  }
  #merchant-right-main{
    margin-top: 15px;
    height: 620px;
    width: 78%;
    display: inline-block;
    vertical-align: top;
    border-left: 2px solid black;
    border-right: 2px solid black;
  }

  #merchant-right-blank{
    width: 10%;
    height: 500px;
    display: inline-block;
    vertical-align: top;
    margin-left: 0.5%;
    /*border: 2px solid darkcyan;*/
  }

  #info-stat{
    padding-top: 2.5%;
    margin: 2.5% 4%;
    height: 90%;
    width: 30%;
    border: 1px solid black;
    display: inline-block;
    vertical-align: middle;
  }
  #info-chart{
    padding-top: 2.5%;
    margin: 2.5% 4%;
    height: 90%;
    width: 50%;
    border: 1px solid black;
    display: inline-block;
    vertical-align: middle;
  }

  #info-stat h2{
    margin-bottom: 5%;
  }
  #info-stat p{
    width: 70%;
    margin: 5% 15%;
    border-bottom: 2px solid black;
  }

  #info-stat input{
    width: 30%;
    display: inline-block;
    margin: 1% 5%;
  }
  #info-stat button{
    margin-top: 2%;
  }


  .pie-chart{
    width: 70%;
    margin: 5% 15%;
  }
</style>
