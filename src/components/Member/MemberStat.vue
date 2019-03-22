<template>
  <div id="member-stat">
    <div id="member-left-nav">
    </div>
    <div id="member-right-main">
      <div id="info-stat">
        <h2>Personal Stat</h2>
        <p><label>MemberId: </label><b>{{member_id}}</b></p>
        <p><label>MemberEmail: </label><b>{{member_email}}</b></p>
        <p><label>MemberLevel: </label><b>{{member_level_enum}}</b></p>
        <p><label>Total Consumption: </label><b>{{consumption}}</b></p>
        <p><label>Favourite Merchants: </label><b v-for="merchant of mostUsuallyMerchants"> | <code>{{merchant.name}}</code> | </b></p>
        <b-button variant="danger" @click="cancel_account">Cancel Account</b-button>
      </div>
      <div id="info-chart">
        <h2>Deal Stat</h2>
        <pie-chart v-if="loaded" id="deal-type-pie" class="pie-chart" :chart-data="deals_data"></pie-chart>
      </div>
    </div>
    <div id="member-right-blank">
    </div>
  </div>
</template>

<script>
  import utils from "../../utils/utils";
  import PieChart from "../Charts/PieChart";

  export default {
      name: "MemberStat",
      components:{
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
          loaded:false,
          consumption:0,
          mostUsuallyMerchants:[]
        }
      },
      created(){
        this.get_deals(1);
        this.get_deals(2);
        this.get_deals(3);
        this.get_stat();
      },
      mounted() {
        setTimeout(()=>{
          this.loaded=true;
        },1000)
      },
      computed:{
        member_id(){
          return sessionStorage.getItem('memberId');
        },
        member_email(){
          return sessionStorage.getItem('memberEmail');
        },
        member_level_enum(){
          return sessionStorage.getItem('level');
        }
      },
      methods:{

        get_stat(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/member/${this.member_id}/stat`,
            callback: response=>{
              if(response.data.code===0)
                alert(response.data.msg);
              else {
                this.consumption=response.data.object.sum;
                this.mostUsuallyMerchants=response.data.list;
              }
            }
          });
        },
        get_deals(i){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/member/${this.member_id}/deals`,
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
        cancel_account(){
          utils.axiosMethod({
            method: 'PUT',
            url: `/yummy/member/${this.member_id}/stat/account`,
            callback: response=>{
              alert(response.data.msg);
              if(response.data.code===1)
                this.$router.push({name:'memberLogin'});
            }
          })
        }

      }
    }
</script>

<style scoped>
  #member-left-nav{
    height: auto;
    min-height: 300px;
    width: 10%;
    display: inline-block;
    vertical-align: top;
    margin-right: 0.5%;
    /*border: 2px solid green;*/
  }
  #member-right-main{
    margin-top: 15px;
    height: 620px;
    width: 78%;
    display: inline-block;
    vertical-align: top;
    border-left: 2px solid black;
    border-right: 2px solid black;
  }

  #member-right-blank{
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
    margin-bottom: 10%;
  }
  #info-stat p{
    width: 90%;
    margin: 7.5% 5%;
    border-bottom: 2px solid black;
  }
  #info-stat button{
    margin-top: 10%;
  }


  .pie-chart{
    width: 70%;
    margin: 5% 15%;
  }
</style>
