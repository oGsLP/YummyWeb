<template>
  <div id="member-shop">
    <div id="member-left-nav">
      <b-list-group v-b-scrollspy:member-right-main>
        <b-list-group-item variant="warning"
                           v-for="i of typeCounter"
                           :href="'#dish_type_'+i"
                           :key="'list_'+dishType[i].enum"
                           disabled="disabled">{{dishType[i].name}}</b-list-group-item>
        <b-list-group-item variant="danger"
                           href="#dish_type_5"
                           disabled="disabled">{{dishType[5].name}}</b-list-group-item>
      </b-list-group>
      <b-collapse id="collapse">
        <b-card v-model="toggle_info">
          <p class="card-text">Pack Info</p>
          <b-button v-b-toggle.collapse_inner size="sm">{{toggle_info.name}}</b-button>
          <b-collapse id="collapse_inner" class="mt-2" >
            <b-card>
              <b-card-text v-for="(dish,index) of toggle_info.dishes" :key="index">{{dish.dish.name}} * {{dish.num}}</b-card-text>
              <b-card-text>Pack Price: {{toggle_info.price}}</b-card-text>
            </b-card>
          </b-collapse>
        </b-card>
      </b-collapse>
    </div>

    <div id="member-right-main">
      <div v-for="i of typeCounter" :id="'dish_type_'+i" :key="'dish_'+dishType[i].enum">
        <div class="dish-div" v-for="dish of get_type_dishes(i)">
          <div class="name-div">{{dish.name}}</div>
          <div class="span-div">
            <span class="type-span"><code>Type: </code>{{get_name_by_enum(dish.kind)}}</span>
            <span class="price-span"><code>Price: </code>{{dish.price}}</span>
            <span class="supply-span"><code>Supply: </code>{{dish.supply}}</span>
            <span class="deadline-span"><code>Deadline: </code>{{dish.deadline}}</span>
            <span class="add-bt-span">
              <b-button class="add-button" variant="outline-success" @click="add_dish_to_chart(dish)">+</b-button>
            </span>
          </div>

        </div>
      </div>
      <div id="dish_type_5" :key="'dish_'+dishType[5].enum">
        <div class="dish-div" v-for="(pack,index) of shopMenu.packs">
          <div class="name-div">{{pack.name}}</div>
          <div class="span-div">
            <span class="type-span"><code>Type: </code>{{get_name_by_enum('PACK')}}</span>
            <span class="price-span"><code>Price: </code>{{pack.price}}</span>
            <span class="bt-span toggle-bt">
              <b-button class="add-button" variant="info"
                        v-b-toggle="'collapse'"
                        @click="set_toggle_info(index)">+</b-button>
            </span>
            <span class="deadline-span"><code>Deadline: </code>{{pack.deadline}}</span>
            <span class="bt-span">
              <b-button class="add-button" variant="outline-success" @click="add_pack_to_chart(pack)">+</b-button>
            </span>
          </div>
        </div>
      </div>
      <div class="clear-div"></div>
    </div>

    <div id="member-right-blank">
      <div id="shop-chart" v-model="shopChart">
        <h2>Shop Chart</h2>
        <b-list-group id="chart-list">
          <b-list-group-item class="d-flex justify-content-between align-items-center chart-list-item"
                             v-for="(dish,index) of shopChart.dishes" :key="'chart_dish'+index">
            {{dish.name}}
            <b-badge variant="dark" pill>{{dish.num}}</b-badge>
            <b-button variant="outline-primary" @click="increment_dish(index)">+</b-button>
            <b-button variant="outline-secondary" @click="decrease_dish(index)">-</b-button>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center chart-list-item"
                             v-for="(pack,index) of shopChart.packs" :key="'chart_pack'+index">
            {{pack.name}}
            <b-badge variant="warning" pill>{{pack.num}}</b-badge>
            <b-button variant="outline-primary" @click="increment_pack(index)">+</b-button>
            <b-button variant="outline-secondary" @click="decrease_pack(index)">-</b-button>
          </b-list-group-item>
        </b-list-group>
        <span id="sum-span">Sum: {{(shopChart.sum+0.001).toFixed(2)}}</span>
        <b-button id="submit-bt" variant="outline-success" v-b-modal.modal-pay :disabled="!chart_empty">Submit</b-button>
        <b-modal
          id="modal-pay"
          ref="modal"
          title="Pay now or later."
          hide-footer="hide-footer"
        >
          <form id="pay-modal-form" @submit.stop.prevent="handleSubmit">
            <b-form-group>
              <div id="pay-modal-info-div">
                <span id="pay-modal-member-discount">
                <b>MemberLv : </b>{{mem_lv}}, <b>Discount : </b>{{mem_dis}}
              </span>
                <span id="pay-modal-merchant-discount">
                <b>MerchantDiscount : </b>{{mer_dis}}
              </span>
                <label id="pay-modal-sum">
                  <b>To pay : </b><span>{{deal_total}}</span>
                </label>
              </div>
              <div id="pay-modal-select-div">
                <label id="pay-modal-time">
                  <b>Delivery Time : </b><b-form-input v-model="limit_time"></b-form-input>
                </label>
                <label id="pay-modal-address">
                  <b>Address : </b><b-form-select v-model="addresses_select" :options="addresses_options" required/>
                </label>
              </div>
              <div id="pay-modal-account-div">
                <label id="pay-modal-account">
                  <b>Your Payment : </b><span>{{payment.account}}</span>
                </label>
                <label id="pay-modal-password">
                  <b>Enter Password : </b><b-input type="password" placeholder="Enter your password" v-model="payment.password" required/>
                </label>
              </div>
            </b-form-group>
            <b-form-group>
              <b-button variant="success" @click="pay_deal"> Pay Now </b-button>
              <b-button variant="dark" @click="pay_later"> Pay Later</b-button>
            </b-form-group>

          </form>
        </b-modal>
      </div>
    </div>

  </div>
</template>

<script>
    import utils from "../../utils/utils";
    export default {
      name: "MemberShop",
      data() {
        return {
          typeCounter:[1,2,3,4],
          dishType:[
            {enum: "", name:""},
            {enum: "STAPLE_FOOD", name: "Staple"},   // 1
            {enum: "DIM_SUM", name: "Snack"},      // 2
            {enum: "BEVERAGE", name: "Beverage"},     // 3
            {enum: "OTHER", name: "Other"},       // 4
            {enum: "PACK", name: "Packs"}           // 5
          ],
          shopMenu:{
            dishes: null,
            packs: null
          },
          toggle_info:{
            name: '',
            dishes: null,
            price: 0
          },
          shopChart:{
            dishes: [],
            packs: [],
            sum: 0
          },
          nothing_item:{
            name: ""
          },
          payment:{
            account: 123456789,
            password: null
          },
          addresses: [],
          addresses_select: null,
          limit_time: 30,
          new_deal_id: null,
          check_payment: false,
          merchantDiscount: {},
          mem_dis: 1,
        }
      },
      created(){
        this.get_current_dishes();
        this.get_current_packs();
        this.get_addresses();
        this.get_merchant_discount();
        this.get_member_discount();
        this.get_member_payment();
      },
      computed:{
        member_id(){
          return sessionStorage.getItem('memberId');
        },
        url_params(){
          return this.$route.params;
        },
        chart_empty(){
          return this.shopChart.dishes.length!==0||this.shopChart.packs.length!==0;
        },
        addresses_options(){
          let array = [];
          this.addresses.forEach((address,index)=>{
            array.push({value: index, text: `X: ${address.longitude}, Y: ${address.latitude}  ${address.note}`});
          });
          return array;
        },
        mem_lv(){
          return sessionStorage.getItem('level');
        },
        mer_dis(){
          return this.merchantDiscount.min<=this.shopChart.sum?this.merchantDiscount.discount:0;
        },
        deal_total(){
          return ((this.shopChart.sum-this.mer_dis)*this.mem_dis).toFixed(2);
        }
      },
      methods:{
        get_current_dishes(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/member/${this.member_id}/merchants/${this.url_params['mer_id']}/dishes`,
            callback: (response)=>{
              if(response.data.code===1){
                this.shopMenu.dishes=response.data.list;
              }
              else alert('Cannot get menu dishes !');
            }
          });
        },
        get_current_packs(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/member/${this.member_id}/merchants/${this.url_params['mer_id']}/packs`,
            callback: (response)=>{
              if(response.data.code===1){
                this.shopMenu.packs=response.data.list;
              }
              else alert('Cannot get menu packs !');
            }
          });
        },
        get_addresses(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/member/${this.member_id}/info/addresses`, //to modify
            callback: (response)=>{
              if(response.data.code===1){
                this.addresses=response.data.list;
                //to modify
              }
              else alert("Cannot get addresses");
            }
          });
        },
        get_merchant_discount(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/member/${this.member_id}/merchants/${this.url_params['mer_id']}/discounts`,
            callback: (response)=>{
              this.merchantDiscount = response.data.object;
            }
          })
        },
        add_dish_to_chart(dish){
          let dish_id = dish.id;
          let index=0;
          for(let item of this.shopChart.dishes){
            if(item.id === dish_id){
              item.num++;
              this.shopChart.sum+=item.price;
              this.shopChart.dishes.push(this.nothing_item);
              this.shopChart.dishes.pop();
              return;
            }
            index++
          }
          dish.num=1;
          this.shopChart.sum+=dish.price;
          this.shopChart.dishes.push(dish);
        },
        add_pack_to_chart(pack){
          let pack_id = pack.id;
          let index=0;
          for(let item of this.shopChart.packs){
            if(item.id === pack_id){
              pack.num++;
              this.shopChart.sum+=item.price;
              this.shopChart.packs.push(this.nothing_item);
              this.shopChart.packs.pop();
              return;
            }
            index++
          }
          pack.num=1;
          this.shopChart.sum+=pack.price;
          this.shopChart.packs.push(pack);
        },
        get_type_dishes(i){
          let type = this.dishType[i].enum;
          let array = [];
          if(this.shopMenu.dishes!==null){
            for(let dish of this.shopMenu.dishes){
              if(dish.kind===type){
                array.push(dish);
              }
            }
          }
          return array;
        },
        get_name_by_enum(typeEnum){
          for(let type of this.dishType){
            if(type.enum===typeEnum)
              return type.name;
          }
        },
        get_member_discount(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/member/${this.member_id}/payment/discount`,
            callback: response=>{
              if(response.data.code===1)
                this.mem_dis=response.data.object;
            }
          });
        },
        get_member_payment(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/member/${this.member_id}/payment`,
            callback: (response)=>{
              if(response.data.code===1){
                this.payment.account=response.data.object.account;
              }
              else alert(response.data.msg);
            }
          });
        },
        get_member_level(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/member/${this.member_id}/payment/level`,
            callback: (response)=>{
              if(response.data.code===1){
                sessionStorage.setItem('level',response.data.object);
              }
            }
          });
        },
        set_toggle_info(i){
            let pack = this.shopMenu.packs[i];
            this.toggle_info.name=pack.name;
            this.toggle_info.dishes=pack.dishes;
            this.toggle_info.price=pack.price;
        },
        increment_dish(i){
          let dish=this.shopChart.dishes[i];
          dish.num++;
          this.shopChart.sum+=dish.price;
          this.shopChart.dishes.push(this.nothing_item);
          this.shopChart.dishes.pop();
        },
        decrease_dish(i){
          let dish=this.shopChart.dishes[i];
          this.shopChart.sum-=dish.price;
          if(dish.num===1){
            this.shopChart.dishes.splice(i,1);
          }
          else {
            dish.num--;
            this.shopChart.dishes.push(this.nothing_item);
            this.shopChart.dishes.pop();
          }
        },
        increment_pack(i){
          let pack=this.shopChart.packs[i];
          pack.num++;
          this.shopChart.sum+=pack.price;
          this.shopChart.packs.push(this.nothing_item);
          this.shopChart.packs.pop();
        },
        decrease_pack(i){
          let pack=this.shopChart.packs[i];
          this.shopChart.sum-=pack.price;
          if(pack.num===1){
            this.shopChart.packs.splice(i,1);
          }
          else {
            pack.num--;
            this.shopChart.packs.push(this.nothing_item);
            this.shopChart.packs.pop();
          }
        },
        pay_later(){
          new Promise(resolve => {
            utils.axiosMethod({
              method: 'POST',
              url: `/yummy/member/${this.member_id}/merchants/${this.url_params['mer_id']}/distance`,
              params:{time: this.limit_time},
              data: this.addresses[this.addresses_select],
              callback: response=>{
                if(response.data.code===0)
                  alert(response.data.msg);
                else resolve();
              }
            });
          }).then(()=>{
            utils.axiosMethod({
              method: 'POST',
              url: `/yummy/member/${this.member_id}/deals`,
              params: {mer_id: this.url_params['mer_id']},
              data: this.get_deal_object(),
              callback: (response)=>{
                alert(response.data.msg);
                if(response.data.code===1)
                  this.$router.push({name: 'memberDeal'});
              }
            });
          });
        },
        pay_deal(){
          new Promise(resolve => {
            utils.axiosMethod({
              method: 'POST',
              url: `/yummy/member/${this.member_id}/deals`,
              params: {mer_id: '1'},
              data: this.get_deal_object(),
              callback: (response)=>{
                if(response.data.code===1)
                  resolve(response.data.object.id);
                else alert(response.data.msg);
              }
            });
          }).then(deal_id=>new Promise(resolve =>  {
            if(deal_id!==null){
              utils.axiosMethod({
                method: 'PUT',
                url:  `/yummy/member/${this.member_id}/payment/deals`,
                params: {
                  deal_id: deal_id,
                  type: 'pay'
                },
                data: this.payment,
                callback: (response)=>{
                  alert(response.data.msg);
                  if(response.data.code===1)
                    resolve(deal_id);
                  else {
                    alert(" You can pay it later.. ");
                    this.$router.push({name: 'memberDeal'});
                  }
                }
              });
            }
          })).then(deal_id=>{
            utils.axiosMethod({
              method: 'PUT',
              url: `/yummy/member/${this.member_id}/deals/${deal_id}`,
              params:{put_type : 'ACCOUNT_PAID'},
              callback: response=>{
                alert(response.data.msg);
                this.$router.push({name: 'memberDeal'});
                this.get_member_level();
              }
            });
          });
        },
        get_deal_object(){
          return {
            address: this.addresses[this.addresses_select],
            dishes: this.shopChart.dishes,
            packs: this.shopChart.packs,
            sum: this.shopChart.sum,
            memberDiscount: this.mem_dis,      ///////////////////////////////
            merchantDiscount: this.mer_dis,   //////////////////////
            total: this.deal_total,              /////////////////////
            limitTime: this.limit_time
          };
        }
      }
    }
</script>

<style scoped>
  #member-left-nav{
    height: auto;
    min-height: 300px;
    width: 15%;
    display: inline-block;
    vertical-align: top;
    margin-right: 0.5%;
    /*border: 2px solid green;*/
  }
  #collapse{
    margin-top: 50px;
  }
  #member-right-main{
    height: 620px;
    width: 68%;
    display: inline-block;
    vertical-align: top;
    border-left: 2px solid black;
    border-right: 2px solid black;
    overflow-y: scroll;
  }
  #member-right-main::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  #member-right-blank{
    width: 15%;
    height: 450px;
    display: inline-block;
    vertical-align: top;
    margin-left: 0.5%;
    margin-top: 25px;
    /*border: 2px solid darkcyan;*/
  }
  .dish-div{
    display: block;
    border: 1px outset darkslategrey;
    position: relative;
    padding: 1% 2% 0.5% 2%;
    margin: 3% 1% 3% 3%;
  }

  .name-div{
    height: 90%;
    width: 20%;
    font-size: 32px;
    display: inline-block;
    vertical-align: middle;
    text-align: left;
  }
  .span-div{
    height: 80%;
    margin-right: 10%;
    width: 65%;
    display: inline-block;
    vertical-align: middle;
  }
  .span-div span{
    margin: 0 2%;
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;

  }
  .type-span, .price-span, .supply-span{
    width: 25%;
    border-bottom: 2px inset lightgrey;
  }
  .deadline-span{
    width: 60%;
    border-bottom: 2px inset lightgrey;
  }
  .bt-span{
    border: 0;
    float: right;
  }
  .add-button{
    line-height: 12px;
    height: 25px;
    width: 25px;
    padding: 0;
  }
  .toggle-bt{

  }
  .clear-div{
    width: 100%;
    height: 100px;
    border-bottom: 1px solid saddlebrown;
    border-radius: 10px;
    margin-bottom: 50px;
  }
  .chart-list-item button{
    line-height: 15px;
    height: 25px;
    width: 25px;
    padding: 0;
  }

  #chart-list{
    text-align: center;
    height: 350px;
    overflow-y: scroll;
  }
  #chart-list::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  #sum-span{
    display: block;
    font-size: 32px;
    font-weight: bold;
    margin: 5% 0;
  }
  #submit-bt{
    left: 50%;
    right: 50%;
    margin: 0;
  }
  #pay-modal-form b-form-group{
    display: block;
    text-align: center;
  }
  #pay-modal-form button{
    margin: 0 20px;
  }
  #pay-modal-form input{
    text-align: center;
  }
  #pay-modal-account{
    display: block;
  }
  #pay-modal-member-discount{
    display: block;
  }
  #pay-modal-merchant-discount{
    display: block;
  }
  #pay-modal-sum{
    display: block;
  }

  #pay-modal-info-div{
    border-bottom: 1px solid darkgray;
    margin-bottom: 10px;
  }
  #pay-modal-select-div{

  }

  #pay-modal-time{
    width: 25%;
    margin-right: 5%;
  }
  #pay-modal-address{
    width: 50%;
  }
  #pay-modal-account-div{

  }
</style>
