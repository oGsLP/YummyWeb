<template>
  <div id="member-main">
    <div id="member-left-nav">
      <b-list-group v-b-scrollspy:member-right-main>
        <b-list-group-item variant="warning"
                           v-for="i of typeCounter"
                           :href="'#merchant_type_'+i"
                           :key="'list_'+merchantType[i].enum"
                           disabled="disabled">{{merchantType[i].name}}</b-list-group-item>
      </b-list-group>
    </div>
    <div id="member-right-main">
      <div v-for="i of typeCounter" :id="'merchant_type_'+i" :key="'type_'+merchantType[i].enum">
        <div class="merchant-div" v-for="merchant of get_type_merchants(i)">
          <p>{{merchant.cdkey}}</p>
          <div class="merchant-info">
            <h2>{{merchant.name}}</h2>
            <span class="type-span">{{get_name_by_enum(merchant.type)}}</span>
            <span class="address-span">
            <strong>X:</strong> {{merchant.address.longitude}}
            <strong>Y:</strong> {{merchant.address.latitude}}
            <strong>Address: </strong><small> {{merchant.address.note}}</small>
          </span>
            <b-button @click="choose_merchant(merchant.id)">choose</b-button>
          </div>
      </div>
      </div>
    </div>
    <div id="member-right-blank">
    </div>
  </div>
</template>

<script>
    import utils from "../../utils/utils";

    export default {
      name: "MemberMain",
      data() {
        return {
          typeCounter:[
            1,2,3,4,5,6
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
          merchants:null
        }
      },
      created (){
        this.get_merchants();
      },
      watch:{
        '$route': 'get_merchants'
      },
      computed:{
      },
      methods:{
        get_merchants() {
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/member/1/merchants`,
            callback: (response)=>{
              if(response.data.code===1)
                this.merchants=response.data.list;
              else alert("Cannot get merchants!");
            }
          });
        },
        choose_merchant(i){
          this.$router.push({name:'memberShop', params:{mer_id: i}});
        },
        get_type_merchants(index){
          let type = this.merchantType[index].enum;
          let array = [];
          if(this.merchants!==null){
            for(let merchant of this.merchants){
              if(merchant.type===type){
                array.push(merchant);
              }
            }
          }
          return array;
        },
        get_name_by_enum(typeEnum){
          for(let type of this.merchantType){
            if(type.enum===typeEnum)
              return type.name;
          }
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
    height: 500px;
    display: inline-block;
    vertical-align: top;
    margin-left: 0.5%;
    /*border: 2px solid darkcyan;*/
  }
  ul{
    color: black;
  }
  .merchant-div{
    display: block;
    border: 1px outset darkslategrey;
    position: relative;
    padding: 2% 2% 0.5% 2%;
    margin: 3% 1% 3% 3%;
  }
  .merchant-div p{
    position: absolute;
    left: 2%;
    top: 10%;
    font-size: 14px;
  }
  .merchant-div .merchant-info{
    height: 50px;
    vertical-align: middle;
  }
  .merchant-div h2 {
    float: left;
    font-weight: bold;
    width: 20%;
    text-align: left;
    margin: 5px 0 0 0;
  }
  .merchant-div span{
    text-align: center;
    height: 80%;
    float: left;
    margin: 0 5%;
    display: inline-block;
    vertical-align: middle;
  }
  .merchant-div .type-span{
    width: 10%;
    font-weight: bolder;
    padding: 1% 0;
  }
  .merchant-div .address-span{
    width: 30%;
    padding: 10px 5px 2px 5px;
    border-bottom: 2px solid black;
  }
</style>
