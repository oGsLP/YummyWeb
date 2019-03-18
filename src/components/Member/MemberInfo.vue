<template xmlns="http://www.w3.org/1999/html">
    <div id="member-info">
      <div id="member-left-nav">
        <left-nav :items="this.leftNavItems"></left-nav>
      </div>
      <div id="member-right-main">
        <h1>MemberInfo</h1>

        <div id="member-info-info" class="member-info-div">
          <h2>BaseInfo</h2>
          <b-form id="member-info-form">
            <b-form-group>
              <label for="info-name">email: </label>
              <b-form-input id="info-email" v-model.trim="memberInfo.name" disabled="disabled"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="info-name">name: </label>
              <b-form-input id="info-name" type="text" v-model.trim="memberInfo.name" :disabled="!infoEditable"></b-form-input>
            </b-form-group>
            <b-form-group>
              <label for="info-phone">phone: </label>
              <b-form-input id="info-phone" type="text" v-model.trim="memberInfo.phone" :disabled="!infoEditable"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button variant="outline-dark" @click="edit_info">Edit</b-button>
              <b-button variant="outline-dark" @click="modify_info">Save</b-button>
            </b-form-group>
          </b-form>
        </div>

        <div id="member-info-address" class="member-info-div">
          <h2>Addresses</h2>
          <b-form :id="('address_'+(address.id))" v-for="address of memberAddresses" :key="address.id" inline>
            <b-form-group label="Longitude" :label-for="('longitude_'+(address.id))">
              <b-form-input :id="('longitude_'+(address.id))" type="text" v-model.trim="address.longitude" disabled="disabled"></b-form-input>
            </b-form-group>
            <b-form-group label="Latitude" :label-for="('latitude_'+(address.id))">
              <b-form-input :id="('latitude_'+(address.id))" type="text" v-model.trim="address.latitude" disabled="disabled"></b-form-input>
            </b-form-group>
            <b-form-group label="Note" :label-for="('note_'+(address.id))">
              <b-form-textarea :id="('note_'+(address.id))" v-model.trim="address.note" disabled="disabled"></b-form-textarea>
            </b-form-group>
            <b-form-group>
              <b-button :id="('delete_'+(address.id))" @click="delete_address(address.id)">Delete</b-button>
            </b-form-group>
          </b-form>

          <b-form id="add_address_form">
            <b-form-group description="0.00~99.99" label="Longitude" label-for="add_address_longitude">
              <b-form-input id="add_address_longitude" type="text" v-model.trim="addAddress.longitude"></b-form-input>
            </b-form-group>
            <b-form-group description="0.00~99.99" label="Latitude" label-for="add_address_latitude">
              <b-form-input id="add_address_latitude" type="text" v-model.trim="addAddress.latitude"></b-form-input>
            </b-form-group>
            <b-form-group description="detail" label="Note" label-for="add_address_note">
              <b-form-textarea id="add_address_note" v-model.trim="addAddress.note"></b-form-textarea>
            </b-form-group>
            <b-form-group>
              <b-button id="add_address_bt" @click="add_address">Add</b-button>
            </b-form-group>
          </b-form>
        </div>

        <div id="member-info-payment" class="member-info-div">
          <h2>Payment</h2>
          <b-form id="member-payment-form">
            <b-form-group>
              <label for="payment-account">Account: </label>
              <b-form-input id="payment-account" type="text" v-model.trim="memberPayment.account" :disabled="hasPayment"></b-form-input>
            </b-form-group>
            <b-form-group v-if="!hasPayment">
              <label for="payment-password">Password: </label>
              <b-form-input id="payment-password" type="password" v-model.trim="memberPayment.password"></b-form-input>
            </b-form-group>
            <b-form-group v-if="hasPayment">
              <label for="payment-balance">Balance: </label>
              <b-form-input id="payment-balance" type="text" v-model.trim="memberPayment.balance" disabled="disabled"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-button v-if="!hasPayment" variant="outline-dark" @click="add_payment">Add</b-button>
            </b-form-group>
          </b-form>
        </div>
      </div>
      <div id="member-right-blank">
      </div>
    </div>
</template>

<script>
    import utils from "../../utils/utils";

    export default {
      name: "MemberInfo",
      data() {
        return {
          leftNavItems:[
            {
              text: 'info',
              sort: function () {
                return this.jump_info('#member-info-info');
              }.bind(this)
            },
            {
              text: 'address',
              sort: function () {
                return this.jump_info('#member-info-address');
              }.bind(this)
            },
            {
              text: 'payment',
              sort: function () {
                return this.jump_info('#member-info-payment');
              }.bind(this)
            },
          ],
          memberInfo:{
            phone: '',
            name: ''
          },
          memberAddresses: null,
          addAddress:{
            longitude: undefined,
            latitude: undefined,
            note: undefined
          },
          memberPayment: {
            account: '',
            password: '',
            balance: ''
          },
          infoEditable: false,
          hasPayment: false,
        }
      },
      computed:{
        infoValidation(){
          if(this.infoEditable){

          }
        },
        paymentValidation(){
          if(this.hasPayment)
            return true;
          else {
            return  this.memberPayment.account.length>5 && this.memberPayment.password.length>5;
          }
        },
        addressValidation(){
          return this.addAddress.latitude !== undefined && this.addAddress.longitude !== undefined
                  &&this.addAddress.latitude !== '' && this.addAddress.longitude !== '';
        }
      },
      created(){
        this.get_info();
        this.get_addresses();
        this.get_payment();
      },
      methods:{
        get_info(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/member/1/info/info`, //to modify
            callback: (response)=>{
              if(response.data.code===1){
                this.memberInfo.phone=response.data.object.phone;
                this.memberInfo.name=response.data.object.name;
              }
              else alert("Cannot get Info");
            }
          });
        },
        get_addresses(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/member/1/info/addresses`, //to modify
            callback: (response)=>{
              if(response.data.code===1){
                this.memberAddresses=response.data.list;
                //to modify
              }
              else alert("Cannot get addresses");
            }
          });
        },
        get_payment(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/member/1/payment`, //to modify
            callback: (response)=>{
              if(response.data.code===1){
                this.hasPayment=true;
                this.memberPayment.account=response.data.object.account;
                this.memberPayment.balance=response.data.object.balance;
                //to modify
              }
              else this.hasPayment=false;
            }
          });
        },
        edit_info(){
          if(!this.infoEditable)
            this.infoEditable=true;
        },
        modify_info(){
          if(this.infoEditable)
            utils.axiosMethod({
              method: 'PUT',
              url: `/yummy/member/1/info/info`, //to modify
              data: this.memberInfo,
              callback: (response)=>{
                alert(response.data.msg);
              }
            });
        },
        add_address(){
          if(this.addressValidation)
            utils.axiosMethod({
              method: 'POST',
              url: `/yummy/member/1/info/address`,
              data: this.addAddress,
              callback: (response)=>{
                alert(response.data.msg);
                if(response.data.code===1){
                  this.memberAddresses.longitude='';
                  this.memberAddresses.latitude='';
                  this.memberAddresses.note='';
                  this.get_addresses();
                }
              }
            });
          else alert('Invalid address');
        },
        delete_address(i){
          utils.axiosMethod({
            method: 'DELETE',
            url: `/yummy/member/1/info/addresses/${i}`,
            callback: (response)=>{
              alert(response.data.msg);
              if(response.data.code===1){
                this.get_addresses();
              }
            }
          });
        },
        add_payment(){
          if(this.paymentValidation)
            utils.axiosMethod({
              method: 'POST',
              url: `/yummy/member/1/payment`,
              data: {
                account: this.memberPayment.account,
                password: this.memberPayment.password
              },
              callback: (response)=>{
                if(response.data.code===1){
                  alert(response.data.msg);
                  this.get_payment();
                }
                else alert(response.data.msg);
              }
            });
          else alert("Invalid payment");
        },

        jump_info(href){
          document.querySelector(href).scrollIntoView(true);
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
    /*border: 2px solid green;*/
  }
  #member-right-main{
    height: auto;
    min-height: 650px;
    width: 68%;
    display: inline-block;
    vertical-align: top;
    border: 2px solid black;
    overflow-y: scroll;
    padding: 2% 0;
  }
  #member-right-main h2{
    position: relative;
    left: -35%;
  }
  #member-right-main::-webkit-scrollbar {/*滚动条整体样式*/
    width: 0;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 0;
  }
  #member-right-blank{
    width: 15%;
    height: 500px;
    display: inline-block;
    vertical-align: top;
    /*border: 2px solid darkcyan;*/
  }
  .member-info-div{
    height: auto;
    width: 90%;margin: 2% 5%;
    padding: 1%;
    border: 1px solid cornsilk;
    border-radius: 10px;
    box-shadow: burlywood 3px 3px 3px;
  }
  #member-info-form{

  }
  #member-info-form label{
    width: 15%;
    display: inline-block;
  }
  #member-info-form input{
    width: 50%;
    display: inline-block;
  }
</style>
