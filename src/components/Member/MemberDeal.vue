<template>
  <div id="member-deal">
    <div id="member-right-main">
      <div id="member-deal-list">
        <b-card id="deal-card" no-body>
          <b-tabs pills card vertical>

            <b-tab active>
              <template slot="title">
                <b-spinner variant="success" small/>{{dealType[1].name}}
              </template>
              <b-modal
                id="modal-pay"
                ref="payModal"
                title="Pay now."
                hide-footer="hide-footer"
              >
                <form id="pay-modal-form">
                  <b>To pay : </b><span>{{currentPayDeal.finalPrice}}</span>
                  <div id="pay-modal-account-div">
                    <label id="pay-modal-account">
                      <b>Your Payment : </b><span>{{payment.account}}</span>
                    </label>
                    <label id="pay-modal-password">
                      <b>Enter Password : </b><b-input type="password" placeholder="Enter your password" v-model="payment.password" required/>
                    </label>
                  </div>
                  <b-form-group>
                    <b-button variant="success" @click="pay_deal"> Pay Now </b-button>
                  </b-form-group>

                </form>
              </b-modal>
              <div class="list-wrap-div">
                <div v-for="(deal,index) in deals.obligation" class="insert" :key="'obligation_'+index">
                  <b>MerId: {{deal.merId}}>> <code>{{deal.setupTime}}</code></b>
                  <p>To {{deal.memberAddress.note}}   |   Sum: {{deal.finalPrice}}   |
                    <a class="pay-a" v-b-modal.modal-pay @click="set_current_pay_deal(index)">Pay</a> in 3min or
                    <a class="cancel-a" @click="cancel_deal(index)">Cancel</a>
                  </p>
                </div>
              </div>
            </b-tab>

            <b-tab :title="dealType[2].name">
              <div class="list-wrap-div">
                <div v-for="(deal,index) of deals.cancelled" class="insert" :key="'cancelled_'+index">
                  <b>MerId: {{deal.merId}}>> <code>{{deal.setupTime}}</code></b>
                  <p>To {{deal.memberAddress.note}}   |   Sum: {{deal.finalPrice}}   |   <label>Description: </label> This deal had been cancelled</p>
                </div>
              </div>
            </b-tab>

            <b-tab :title="dealType[3].name">
              <b-modal
                id="modal-refund"
                ref="refundModal"
                title="Pay now."
                hide-footer="hide-footer"
              >
                <form class="pay-modal-form">
                  <b>Refund back : </b><span>{{currentRefundDeal.finalPrice/2}}</span>
                  <div class="pay-modal-account-div">
                    <label class="pay-modal-account">
                      <b>Your Payment : </b><span>{{payment.account}}</span>
                    </label>
                    <label class="pay-modal-password">
                      <b>Enter Password : </b><b-input type="password" placeholder="Enter your password" v-model="payment.password" required/>
                    </label>
                  </div>
                  <b-form-group>
                    <b-button variant="success" @click="refund_deal"> Pay Now </b-button>
                  </b-form-group>

                </form>
              </b-modal>
              <div class="list-wrap-div">
                <div v-for="(deal,index) of deals.paid" class="insert" :key="'paid_'+index">
                  <b>MerId: {{deal.merId}}>> <code>{{deal.setupTime}}</code></b>
                  <p>To {{deal.memberAddress.note}}   |   Sum: {{deal.finalPrice}}   |   under delivering... |
                    <b-button variant="outline-warning" v-b-modal.modal-refund @click="set_current_refund_deal(index)">Refund</b-button>
                    <b-button variant="outline-success" @click="complete_deal(index)">Received</b-button>
                  </p>
                </div>
              </div>
            </b-tab>

            <b-tab :title="dealType[4].name">
              <div class="list-wrap-div">
                <div v-for="(deal,index) of deals.refund" class="insert" :key="'refund_'+index">
                  <b>MerId: {{deal.merId}}>> <code>{{deal.setupTime}}</code></b>
                  <p>To {{deal.memberAddress.note}}   |   Sum: {{deal.finalPrice}}   |   Refund: {{deal.refund}}  |  <label>Description: </label> This deal had been refunded</p>
                </div>
              </div>
            </b-tab>

            <b-tab :title="dealType[5].name">
              <div class="list-wrap-div">
                <div v-for="(deal,index) of deals.complete" class="insert" :key="'complete_'+index">
                  <b>MerId: {{deal.merId}}>> <code>{{deal.setupTime}}</code></b>
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
      name: "MemberDeal",
      data(){
        return{
          typeCounter:[1,2,3,4,5],
          dealType:[
            {enum: '', name: ''},
            {enum: 'SET_UP', name: 'Obligation'},
            {enum: 'CANCELLED', name: 'Cancelled'},
            {enum: 'ACCOUNT_PAID', name: 'Delivering'},
            {enum: 'REFUNDED', name: 'Refund'},
            {enum: 'RECEIVED', name: 'Completed'}
          ],
          deals:{
            obligation: [],
            cancelled: [],
            paid: [],
            refund: [],
            complete: []
          },
          payment:{
            account: 123456789,
            password: null
          },
          currentPayDeal: {},
          currentRefundDeal: {}
        }
      },
      created(){
        for(let i of this.typeCounter)
          this.get_deals(i);
      },
      computed:{
        member_id(){
          return sessionStorage.getItem('memberId');
        }
      },
      methods:{
        get_deals(i){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/member/${this.member_id}/deals`,
            params: {type : this.dealType[i].enum},
            callback: (response)=>{
              if(response.data.code===1){
                if(i===1)
                  this.deals.obligation=response.data.list;
                else if(i===2)
                  this.deals.cancelled=response.data.list;
                else if(i===3)
                  this.deals.paid=response.data.list;
                else if(i===4)
                  this.deals.refund=response.data.list;
                else if(i===5)
                  this.deals.complete=response.data.list;
              }
              else alert(response.data.msg);
            }
          });
        },
        pay_deal(){
          new Promise(resolve => {
            utils.axiosMethod({
              method: 'PUT',
              url:  `/yummy/member/${this.member_id}/payment/deals`,
              params: {
                deal_id: this.currentPayDeal.id,
                type: 'pay'
              },
              data: this.payment,
              callback: response=>{
                if(response.data.code===1){
                  resolve(this.currentPayDeal.id);
                }
                else alert(response.data.msg);
              }
            });
          }).then(id=> {
            utils.axiosMethod({
              method: 'PUT',
              url: `/yummy/member/${this.member_id}/deals/${id}`,
              params: {put_type: this.dealType[3].enum},
              callback: (response)=> {
                alert(response.data.msg);
                if(response.data.code===1){
                  this.get_deals(1);
                  this.get_deals(3);
                  this.$refs.payModal.hide();
                }
              }
            });
          });
        },
        cancel_deal(i){
          utils.axiosMethod({
            method: 'PUT',
            url: `/yummy/member/${this.member_id}/deals/${this.deals.obligation[i].id}`,
            params: {put_type: this.dealType[2].enum},
            callback: (response)=>{
              alert(response.data.msg);
              if(response.data.code===1){
                this.get_deals(1);
                this.get_deals(2);
              }
            }
          });
        },
        refund_deal(){
          new Promise(resolve => {
            utils.axiosMethod({
              method: 'PUT',
              url:  `/yummy/member/${this.member_id}/payment/deals`,
              params: {
                deal_id: this.currentRefundDeal.id,
                type: 'refund'
              },
              data: this.payment,
              callback: response=>{
                if(response.data.code===1){
                  resolve(this.currentRefundDeal.id);
                }
                else alert(response.data.msg);
              }
            });
          }).then(id=>{
            utils.axiosMethod({
              method: 'PUT',
              url: `/yummy/member/${this.member_id}/deals/${id}`,
              params: {put_type: this.dealType[4].enum},
              callback: (response)=>{
                alert(response.data.msg);
                if(response.data.code===1){
                  this.get_deals(3);
                  this.get_deals(4);
                  this.$refs.refundModal.hide();
                }
              }
            });
          });

        },
        complete_deal(i){
          utils.axiosMethod({
            method: 'PUT',
            url: `/yummy/member/${this.member_id}/deals/${this.deals.paid[i].id}`,
            params: {put_type: this.dealType[5].enum},
            callback: (response)=>{
              alert(response.data.msg);
              if(response.data.code===1){
                this.get_deals(3);
                this.get_deals(5);
              }
            }
          });
        },
        set_current_pay_deal(index){
          this.currentPayDeal = this.deals.obligation[index];
        },
        set_current_refund_deal(index){
          this.currentRefundDeal = this.deals.paid[index];
        }
      }
    }
</script>

<style scoped>

  #member-right-main{
    height: 620px;
    width: 86%;
    margin: 0 7%;
    display: inline-block;
    vertical-align: top;
    border-left: 2px solid black;
    border-right: 2px solid black;
  }

  #member-deal-list{
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
  .pay-modal-account-div label{
    display: block;
  }
  .pay-modal-account-div input{
    width: 60%;
    margin-left: 20%;
    text-align: center;
  }

</style>
