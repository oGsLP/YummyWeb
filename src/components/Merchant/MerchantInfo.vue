<template>
  <div id="merchant-info">
    <div id="merchant-left-nav">

    </div>

    <div id="merchant-right-main">
      <h1>MerchantInfo</h1>
      <div>
        <span><b>State: </b>{{get_state.name}}</span>
        <b-form>
          <b-form-group>
            <label for="merchant-info-name">Name</label>
            <b-form-input id="merchant-info-name" v-model.trim="merchantInfo.name" :disabled="!editable"></b-form-input>
          </b-form-group>
          <b-form-group>
            <label for="merchant-info-type">Type: </label>
            <b-form-select id="merchant-info-type" v-model="select_type" :options="type_options" :disabled="!editable"></b-form-select>
          </b-form-group>
          <b-form-group>
            <label for="merchant-address-x">X: </label>
            <b-form-input id="merchant-address-x" v-model.trim="merchantInfo.address.longitude" :disabled="!editable"></b-form-input>
            <label for="merchant-address-y">Y: </label>
            <b-form-input id="merchant-address-y" v-model.trim="merchantInfo.address.latitude" :disabled="!editable"></b-form-input>
            <label for="merchant-address-note">Note: </label>
            <b-form-input id="merchant-address-note" v-model.trim="merchantInfo.address.note" :disabled="!editable"></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-button variant="outline-dark" @click="enter_edit_mode" :disabled="editable">Edit</b-button>
            <b-button variant="outline-success" @click="modify_info" :disabled="!editable">Submit</b-button>
          </b-form-group>
        </b-form>

        <div id="ver-message">{{get_state.msg}}</div>
      </div>
    </div>

    <div id="merchant-right-blank">

    </div>

  </div>
</template>

<script>
    import utils from "../../utils/utils";

    export default {
      name: "MerchantInfo",
      data() {
        return {
          vertificationType:[
            {enum: '', name: ''},
            {enum: 'JUST_REGISTERED', name: 'ToBeAdded', msg: 'You just registered, change the default info and submit for approval.'},
            {enum: 'BEFORE_APPROVAL', name: 'UnderReview', msg: 'Your info submitted, waiting for the manager to check...'},
            {enum: 'GET_DISAPPROVAL', name: 'Disapproval', msg: 'Your info submitted, but gotta rejected. Please modify and submit again.'},
            {enum: 'AFTER_VERTIFICATION', name: 'verified', msg: 'You gotta approved! Manage your menu and make deals!'}
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
          merchantInfo: {
            name: '',
            type: '',
            verEnum: '',
            address:{
              id: '',
              longitude: '',
              latitude: '',
              note: ''
            }
          },
          editable: false,
          select_type: null,
        }
      },
      created(){
        this.get_info();
      },
      computed:{
        merchant_id(){
          return sessionStorage.getItem('merchantId');
        },
        get_state(){
          for(let type of this.vertificationType){
            if(this.merchantInfo.verEnum===type.enum)
              return type;
          }
        },
        type_options(){
          let array = [];
          this.merchantType.forEach((type,index)=>{
            if(index!==0){
              array.push({value: index, text: type.enum});
            }
          });
          return array;
        },

      },
      methods:{
        get_info(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/merchant/${this.merchant_id}/info`,
            callback: (response)=>{
              if(response.data.code===1){
                this.merchantInfo=response.data.object;
                this.select_type = this.get_enum_value(response.data.object.type);
              }
              else alert(response.data.msg);
            }
          });
        },
        get_enum_value(typeEnum){
          let value = 1;
          for(let type of this.type_options){
            if (typeEnum===type.text){
              value=type.value;
            }
          }
          return value;
        },
        modify_info(){
          this.merchantInfo.type=this.merchantType[this.select_type].enum;
          utils.axiosMethod({
            method: 'PUT',
            url: `/yummy/merchant/${this.merchant_id}/info`,
            data: this.merchantInfo,
            callback: (response)=>{
              alert(response.data.msg);
              if(response.data.code===1){
                this.get_info();
                sessionStorage.setItem('vertification','BEFORE_APPROVAL');
              }
            }
          });
        },
        enter_edit_mode(){
          this.editable=true;
        },

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
