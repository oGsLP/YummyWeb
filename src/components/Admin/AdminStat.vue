<template>
  <div id="admin-stat">
    <div id="admin-left-nav">

    </div>
    <div id="admin-right-main">
      <div id="stat-info">
        <h2>Current Profits:<b>{{profit}}</b></h2>
      </div>
      <div id="stat-chart">
        <div id="member-chart">
          <doughnut-chart v-if="loaded" id="member-val-chart" class="doughnut-chart" :chart-data="member_val_data"></doughnut-chart>
          <bar-chart v-if="loaded" id="member-level-chart" class="bar-chart"
                     color-index="2"
                     :labels="member_lv_data.labels"
                     :label="member_lv_data.label"
                     :data="member_lv_data.data"></bar-chart>
        </div>
        <div id="merchant-chart">
          <doughnut-chart v-if="loaded" id="merchant-ver-chart" class="doughnut-chart" :chart-data="merchant_ver_data"></doughnut-chart>
          <bar-chart v-if="loaded" id="merchant-type-chart" class="bar-chart"
                     color-index="4"
                     :labels="merchant_type_data.labels"
                     :label="merchant_type_data.label"
                     :data="merchant_type_data.data"></bar-chart>
        </div>
        <div id="deal-chart">
          <pie-chart v-if="loaded" id="deal-state-chart" class="pie-chart" :chart-data="deal_state_data"></pie-chart>
        </div>
      </div>
    </div>
    <div id="admin-right-blank">

    </div>
  </div>
</template>

<script>
    import BarChart from "../Charts/BarChart";
    import PieChart from "../Charts/PieChart";
    import DoughnutChart from "../Charts/DoughnutChart";
    import utils from "../../utils/utils";
    export default {
      name: "AdminStat",
      components:{
        PieChart,
        BarChart,
        DoughnutChart
      },
      data(){
        return{
          loaded: false,
          profit:0,
          memberValType:[
            {enum:'',name:''},
            {enum:'REGISTERED',name:'Valid'},
            {enum:'CANCELLED',name:'Cancelled'}
          ],
          memberLvType:[
            {enum:'',name:''},
            {enum:'BRONZE',name:'Bronze'},
            {enum:'SILVER',name:'Silver'},
            {enum:'GOLD',name:'Gold'},
            {enum:'PLATINUM',name:'Platinum'},
            {enum:'DIAMOND',name:'Diamond'}
          ],
          merchantVerType:[
            {enum:'',name:''},
            {enum:'JUST_REGISTERED',name:'Registered'},
            {enum:'BEFORE_APPROVAL',name:'Applying'},
            {enum:'GET_DISAPPROVAL',name:'Rejected'},
            {enum:'AFTER_VERTIFICATION',name:'Opening'}
          ],
          merchantType:[
            {enum: "", name:""},
            {enum: 'FAST_FOOD', name: 'FastFood'},            //  1
            {enum: 'HOME_COOKING', name: 'HomeStyle'},        //  2
            {enum: 'PASTRY_SHOP', name: 'Snacks'},            //  3
            {enum: 'CONVENIENCE_SHOP', name: 'Convenience'},  //  4
            {enum: 'GARDEN_STUFF', name: 'GardenStuff'},      //  5
            {enum: 'OTHER' , name: 'Other'}                   //  6
          ],
          dealType:[
            {enum: '', name: ''},
            {enum: 'SET_UP', name: 'Obligation'},
            {enum: 'CANCELLED', name: 'Cancelled'},
            {enum: 'ACCOUNT_PAID', name: 'Delivering'},
            {enum: 'REFUNDED', name: 'Refund'},
            {enum: 'RECEIVED', name: 'Completed'}
          ],
          member_val_data:{
            labels: ['Valid', 'Cancelled'],
            datasets: [
              {
                data: []
              }
            ]
          },
          member_lv_data:{
            labels:['Bronze','Silver','Gold','Platinum','Diamond'],
            label: 'Members',
            data:[]
          },
          merchant_ver_data:{
            labels: ['Registered','Applying','Rejected','Opening'],
            datasets: [
              {
                data: []
              }
            ]
          },
          merchant_type_data:{
            labels:['FastFood','HomeStyle','Snacks','Convenience','GardenStuff','Other'],
            label:'Merchants',
            data:[]
          },
          deal_state_data:{
            labels: ['Obligation','Cancelled', 'Delivering', 'Refunded', 'Completed'],
            datasets: [
              {
                data: []
              }
            ]
          },

        }
      },
      created(){
        this.get_profit();
        this.get_members_by_val(1);
        this.get_members_by_val(2);
        this.get_members_by_lv(1);
        this.get_members_by_lv(2);
        this.get_members_by_lv(3);
        this.get_members_by_lv(4);
        this.get_members_by_lv(5);
        this.get_merchants_by_ver(1);
        this.get_merchants_by_ver(2);
        this.get_merchants_by_ver(3);
        this.get_merchants_by_ver(4);
        this.get_merchants_by_type(1);
        this.get_merchants_by_type(2);
        this.get_merchants_by_type(3);
        this.get_merchants_by_type(4);
        this.get_merchants_by_type(5);
        this.get_merchants_by_type(6);
        this.get_deals_by_state(1);
        this.get_deals_by_state(2);
        this.get_deals_by_state(3);
        this.get_deals_by_state(4);
        this.get_deals_by_state(5);
      },
      mounted() {
        setTimeout(()=>{
          this.loaded=true;
        },1500)
      },
      computed:{

      },
      methods:{
        get_members_by_val(i){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/admin/stat/members`,
            params:{valEnum: this.memberValType[i].enum},
            callback: response=>{
              if(response.data.code===1)
                this.member_val_data.datasets[0].data[i-1]=response.data.list.length;
            }
          });
        },
        get_members_by_lv(i){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/admin/stat/members`,
            params:{lvEnum: this.memberLvType[i].enum},
            callback: response=>{
              if(response.data.code===1)
                this.member_lv_data.data[i-1]=response.data.list.length;
            }
          });
        },
        get_merchants_by_ver(i){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/admin/stat/merchants`,
            params:{verEnum: this.merchantVerType[i].enum},
            callback: response=>{
              if(response.data.code===1)
                this.merchant_ver_data.datasets[0].data[i-1]=response.data.list.length;
            }
          });
        },
        get_merchants_by_type(i){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/admin/stat/merchants`,
            params:{typeEnum: this.merchantType[i].enum},
            callback: response=>{
              if(response.data.code===1)
                this.merchant_type_data.data[i-1]=response.data.list.length;
            }
          });
        },
        get_deals_by_state(i){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/admin/stat/deals`,
            params:{stateEnum: this.dealType[i].enum},
            callback: response=>{
              if(response.data.code===1)
                this.deal_state_data.datasets[0].data[i-1]=response.data.list.length;
            }
          });
        },
        get_profit(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/admin/stat/profits`,
            callback: response=>{
              if(response.data.code===1)
                this.profit=response.data.object;
            }
          });
        }
      }
    }
</script>

<style scoped>
  #admin-left-nav{
    height: auto;
    min-height: 300px;
    width: 10%;
    display: inline-block;
    vertical-align: top;
  }
  #admin-right-main{
    margin-top: 15px;
    height: 620px;
    width: 78%;
    display: inline-block;
    vertical-align: top;
    border-left: 2px solid black;
    border-right: 2px solid black;
    overflow-y: scroll;
  }
  #admin-right-main::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  #admin-right-blank{
    width: 10%;
    height: 500px;
    display: inline-block;
    vertical-align: top;
  }
  #stat-info{
    width: 60%;
    margin: 1% 20%;
    border-bottom: 1px solid black;
    display: block;
    box-shadow: gray 5px 5px 5px;
  }
  #stat-chart{
    width: 90%;
    margin: 1% 5%;
  }
  #member-chart,#merchant-chart{
    width: 96%;
    margin: 5% 2%;
  }
  .doughnut-chart{

    margin: 0 1%;
    display: inline-block;
  }
  .bar-chart{

    margin: 0 2%;
    display: inline-block;
  }
</style>
