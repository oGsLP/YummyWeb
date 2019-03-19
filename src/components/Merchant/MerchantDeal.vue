<template>
  <div id="merchant-deal">
    <div id="merchant-right-main">
      <div id="merchant-deal-list">
        <b-card id="deal-card" no-body>
          <b-tabs pills card vertical>

            <b-tab active>
              <template slot="title">
                <b-spinner variant="success" small/>{{dealType[1].name}}
              </template>
              <div class="list-wrap-div">
                <div v-for="(deal,index) of deals.paid" class="insert" :key="'cancelled_'+index">
                  <b>MemId: {{deal.memId}}> <code>{{deal.setupTime}}</code></b>
                  <p>To {{deal.memberAddress.note}}   |   Sum: {{deal.finalPrice}}   |   Delivering ...</p>
                </div>
              </div>
            </b-tab>

            <b-tab :title="dealType[2].name">
              <div class="list-wrap-div">
                <div v-for="(deal,index) of deals.cancelled" class="insert" :key="'paid_'+index">
                  <b>MemId: {{deal.memId}}> <code>{{deal.setupTime}}</code></b>
                  <p>To {{deal.memberAddress.note}}   |   Sum: {{deal.finalPrice}}   |   <label>Description: </label> This deal had been cancelled</p>
                </div>
              </div>
            </b-tab>

            <b-tab :title="dealType[3].name">
              <div class="list-wrap-div">
                <div v-for="(deal,index) of deals.refund" class="insert" :key="'refund_'+index">
                  <b>MemId: {{deal.memId}}> <code>{{deal.setupTime}}</code></b>
                  <p>To {{deal.memberAddress.note}}   |   Sum: {{deal.finalPrice}}   |   Refund: {{deal.refund}}  |  <label>Description: </label> This deal had been refunded</p>
                </div>
              </div>
            </b-tab>

            <b-tab :title="dealType[4].name">
              <div class="list-wrap-div">
                <div v-for="(deal,index) of deals.complete" class="insert" :key="'complete_'+index">
                  <b>MemId: {{deal.memId}}> <code>{{deal.setupTime}}</code></b>
                  <p>To {{deal.memberAddress.note}}   |   Sum: {{deal.finalPrice}}   |  <label>Description: </label> This deal had been received</p>
                </div>
              </div>
            </b-tab>

          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
    import utils from "../../utils/utils";

    export default {
        name: "MerchantDeal",
      data() {
        return {
          typeCounter:[1,2,3,4],
          dealType:[
            {enum: '', name: ''},
            {enum: 'ACCOUNT_PAID', name: 'Paid'},
            {enum: 'CANCELLED', name: 'Cancelled'},
            {enum: 'REFUNDED', name: 'Refunded'},
            {enum: 'RECEIVED', name: 'Completed'}
          ],
          deals:{
            cancelled: [],
            paid: [],
            refund: [],
            complete: []
          },
        }
      },
      created(){
        for(let i of this.typeCounter)
          this.get_deals(i);
      },
      computed:{
        merchant_id(){
          return sessionStorage.getItem('merchantId');
        }
      },
      methods:{
        get_deals(i){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/merchant/${this.merchant_id}/deals`,
            params: {type : this.dealType[i].enum},
            callback: (response)=>{
              if(response.data.code===1){
                if(i===2)
                  this.deals.cancelled=response.data.list;
                else if(i===1)
                  this.deals.paid=response.data.list;
                else if(i===3)
                  this.deals.refund=response.data.list;
                else if(i===4)
                  this.deals.complete=response.data.list;
              }
              else alert(response.data.msg);
            }
          });
        },
      }
    }
</script>

<style scoped>
  #merchant-right-main{
    height: 620px;
    width: 86%;
    margin: 0 7%;
    display: inline-block;
    vertical-align: top;
    border-left: 2px solid black;
    border-right: 2px solid black;
  }

  #merchant-deal-list{
    height: 600px;
    margin: 10px 8%;
  }

  #deal-card{
    height: 550px;
    margin: 25px 0;

  }

  .insert{
    width: 90%;
    margin: 2% 5%;
    height: auto;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }
  .insert b{
    font-size: 32px;
    display: block;
    text-align: left;
  }
  .insert p{
    font-size: 18px;
  }
  .insert a{
    padding: 2px;
    border-radius: 2px;
    font-size: 24px;
    cursor: pointer;
    margin: 0 10px;
  }
  .insert code{
    margin-left: 10%;
    padding: 2px;
    border-radius: 2px;
    font-size: 18px;
    border-bottom: 1px solid black;
  }
  .insert .pay-a{
    color: green;
    border-bottom: 2px solid green;
  }
  .insert .cancel-a{
    color: orangered;
    border-bottom: 2px solid orangered;
  }
  .list-wrap-div{
    height: 500px;
    overflow-y: scroll;
    border-left: 2px solid black;
    border-right: 2px solid black;
  }
  .list-wrap-div::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

</style>
