<template>
  <div id="merchant-menu">

    <div id="merchant-right-main">
      <h2>Menu~</h2>
      <div id="dishes-list">
        <h3>Dishes</h3>
        <div class="menu-item" v-for="(dish,index) of dishes" :key="'dish_'+index">
          <h4>{{dish.name}}</h4>
          <p><label>Kind: </label><b>{{dish.kind}}</b>
            <label>Price: </label><b>{{dish.price}}</b>
            <label>Supply: </label><b>{{dish.supply}}</b>
          </p>
          <p><label>Deadline: </label><code>{{dish.deadline}}</code></p>
        </div>
      </div>
      <div id="packs-list">
        <h3>Packs</h3>
        <div class="menu-item" v-for="(pack,index) of packs" :key="'pack_'+index">
          <h4>{{pack.name}}</h4>
          <p>
            <label>Price: </label><b>{{pack.price}}</b>
            <label>Deadline: </label><code>{{pack.deadline}}</code>

          </p>
          <b-card>
            <p class="card-text">Pack Info <b-button variant="outline-info" v-b-toggle="'collapse_inner_'+index">+</b-button></p>
            <b-collapse :id="'collapse_inner_'+index" class="mt-2" >
              <b-card>
                <b-card-text v-for="(dish,i) of pack.dishes" :key="'pack_'+index+'_dish_'+i">{{dish.dish.name}} * {{dish.num}}</b-card-text>
                <b-card-text>Pack Price: {{pack.price}}</b-card-text>
              </b-card>
            </b-collapse>
          </b-card>
        </div>
      </div>
    </div>

    <div id="merchant-right-blank">
      <b-form id="new-dish-form">
        <h3>New Dish</h3>
        <b-form-group class="new-group">
          <label>Name: </label>
          <b-form-input class="w2" v-model="newDish.name"></b-form-input>
        </b-form-group>
        <b-form-group  class="new-group">
          <label>Type: </label>
          <b-form-select class="w2"  v-model="newDish.type" :options="type_options"/>
        </b-form-group>
        <b-form-group class="new-group">
          <label>Price: </label>
          <b-form-input class="w1" v-model="newDish.price"></b-form-input>
          <label>Supply: </label>
          <b-form-input class="w1" v-model="newDish.supply"></b-form-input>
        </b-form-group>
        <b-form-group class="new-group">
          <label>Deadline: </label>
          <b-form-input class="w3" v-model="newDish.deadline" type="date"></b-form-input>
        </b-form-group>
        <b-button variant="outline-success" @click="add_dish">Add</b-button>
      </b-form>
      <b-form id="new-pack-form">
        <h3>New Pack</h3>
        <b-form-group class="new-group">
          <label>Name: </label>
          <b-form-input class="w2" v-model="newPack.name"></b-form-input>
          <label>Price: </label>
          <b-form-input class="w1" v-model="newPack.price"></b-form-input>
        </b-form-group>
        <b-form-group class="new-group">
          <label>Deadline: </label>
          <b-form-input class="w3" v-model="newPack.deadline" type="date"></b-form-input>
        </b-form-group>
        <b-form-group class="new-group">
          <h5>AddDishInPack</h5>
          <b-form-select class="w2" v-model="newDishInPack.dish" :options="dish_options"></b-form-select>
          <b-form-input class="w1" v-model="newDishInPack.num"></b-form-input>
          <b-button variant="success" @click="add_select">+</b-button>
        </b-form-group>
        <b-form-group class="new-group">
          <p>DishesInPack</p>
          <div class="dishes-in-pack">
            <b-card>
              <b-card-text v-for="(dish,i) of newPack.dishes" :key="'dish_in_pack_'+i">{{dish.dish.name}} * {{dish.num}}</b-card-text>
            </b-card>
          </div>
        </b-form-group>
        <b-button variant="outline-success" @click="add_pack">Add</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
    import utils from "../../utils/utils";

    export default {
      name: "MerchantMenu",
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
          dishes: [],
          packs: [],
          newDish: {
            name: '',
            type: null,
            price: 0.0,
            supply: 0,
            deadline: null
          },
          newPack: {
            name: '',
            price: 0,
            deadline: null,
            dishes: []
          },
          newDishInPack:{
            dish: null,
            num: 0,
          },
          nothing_item: {name: 'nothing'}
        }
      },
      created(){
        this.get_dishes();
        this.get_packs();
      },
      computed:{
        type_options(){
          let array = [];
          this.dishType.forEach((type,index)=>{
            if(index!==0&&index!==5){
              array.push({value: index, text: type.name});
            }
          });
          return array;
        },
        dish_options(){
          let array = [];
          this.dishes.forEach((dish,index)=>{
            array.push({value: index, text: dish.name});
          });
          return array;
        }
      },
      methods:{
        get_dishes(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/merchant/1/menu/dishes`,
            callback: (response)=>{
              this.dishes=response.data.list;
            }
          });
        },
        get_packs(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/merchant/1/menu/packs`,
            callback: (response)=>{
              this.packs=response.data.list;
            }
          });
        },
        add_dish(){
          if(1===1){    ///////////to do
            this.newDish.type=this.dishType[this.newDish.type].enum;
            utils.axiosMethod({
              method: 'POST',
              url: `/yummy/merchant/1/menu/dishes`,
              data: this.newDish,
              callback: (response)=>{
                alert(response.data.msg);
                if(response.data.code===1){
                  this.get_dishes();
                  this.newDish.price=0;
                  this.newDish.supply=0;
                  this.newDish.name=0;
                  this.newDish.date=null;
                }
              }
            });
          }
          else alert("New dish info invalid");
        },
        modify_dish(i){
          utils.axiosMethod({
            method: 'PUT',
            url: `/yummy/merchant/1/menu/dishes/${this.dishes[i].id}`,
            data: this.dishes[i],
            callback: (response)=>{
              alert(response.data.msg);
            }
          });
        },
        delete_dish(i){
          let dish_id = this.dishes[i].id;
          utils.axiosMethod({
            method: 'DELETE',
            url: `/yummy/merchant/1/menu/dishes/${dish_id}`,
            callback: (response)=>{
              alert(response.data.msg);
            }
          });
        },
        add_pack(){
          if(1===1){    ///////////to do
            utils.axiosMethod({
              method: 'POST',
              url: `/yummy/merchant/1/menu/packs`,
              data: this.newPack,
              callback: (response)=>{
                alert(response.data.msg);
                if(response.data.code===1){
                  this.get_packs();
                  this.newDishInPack.dish=null;
                  this.newDishInPack.num=0;
                  this.newPack.name='';
                  this.newPack.deadline=null;
                  this.newPack.dishes=[];
                  this.newPack.price=0;
                }
              }
            });
          }
          else alert("New Pack info invalid");
        },
        delete_pack(i){
          let pack_id = this.packs[i].id;
          utils.axiosMethod({
            method: 'DELETE',
            url: `/yummy/merchant/1/menu/packs/${pack_id}`,
            callback: (response)=>{
              alert(response.data.msg);
            }
          });
        },
        add_select(){
          if(this.newDishInPack.dish!==null&&this.newDishInPack.num>0){
            let sign = 1;
            if(this.newPack.dishes.length>0)
              for(let dishInPack of this.newPack.dishes){
                if(dishInPack.dish.id===this.dishes[this.newDishInPack.dish].id){
                  dishInPack.num=parseInt(dishInPack.num)+parseInt(this.newDishInPack.num);
                  sign=0;
                  break;
                }
              }
            if(sign===1)
              this.newPack.dishes.push({dish: this.dishes[this.newDishInPack.dish],num:this.newDishInPack.num});
          }
        }
      }
    }
</script>

<style scoped>

  #merchant-right-main{
    height: 620px;
    width: 77%;
    display: inline-block;
    vertical-align: top;
    border-right: 2px solid black;
    overflow-y: hidden;
    padding: 2% 0;
  }
  #merchant-right-main::-webkit-scrollbar {/*滚动条整体样式*/
    width: 0;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 0;
  }
  #merchant-right-blank{
    width: 21%;
    height: 600px;
    display: inline-block;
    vertical-align: top;
    /*border: 2px solid darkcyan;*/
  }
  #merchant-right-main #dishes-list{
    width: 40%;
    margin: 1.5%;
    height: 96%;
    border-right: 2px solid black;
    border-left: 2px solid black;
    overflow-y: scroll;
    display: inline-block;
    position: relative;
  }

  #merchant-right-main #packs-list{
    width: 50%;
    margin: 1.5%;
    height: 96%;
    border-left: 2px solid black;
    border-right: 2px solid black;
    overflow-y: scroll;
    display: inline-block;
    position: relative;
  }
  #dishes-list::-webkit-scrollbar{
    width: 0;
    height: 0;
  }
  #packs-list::-webkit-scrollbar{
    width: 0;
    height: 0;
  }


  .menu-item{
    display: block;
    width: 90%;
    min-height: 20%;
    height: auto;
    margin: 2% 5%;
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: black 2px 2px 2px;
  }
  .menu-item p{
    margin: 5px;
  }
  .menu-item label{
    margin: 0 8px;
  }
  .menu-item button{
    margin-left: 3%;
    font-size: 24px;
    line-height: 12px;
    height: 20px;
    width: 20px;
    padding: 0;
  }
  .card-text{
    font-size: 20px;
    margin: 0;
    vertical-align: middle;
  }
  .card-body{
    padding: 2px 10%;
  }

  #new-dish-form{
    margin: 5% 2px;
    height: 40%;width: 100%;
    border: 1px black solid;
    border-radius: 10px;
    box-shadow: black 5px 5px 5px;
  }
  #new-pack-form{
    margin: 5% 2px;
    height: 50%;width: 100%;
    overflow-y: scroll;
    border: 1px black solid;
    border-radius: 10px;
    box-shadow: black 5px 5px 5px;
  }
  #new-pack-form::-webkit-scrollbar{
    width: 0;
    height: 0;
  }

  #new-dish-form h3,#new-pack-form h3{
    margin-left: 15%;
    width: 70%;
    border-bottom: 1px solid black;
  }

  .new-group{
    margin: 4px 0;
    padding: 0;
  }

  #new-dish-form label{
    display: inline-block;
    width: auto;
    min-width: 15%;
    text-align: left;
    margin-right: 10px;
  }
  .w2{
    display: inline-block;
    width: 40%;
    height: 25px;
    text-align: center;
    font-size: 16px;
    padding: 1px 2px;
  }
  .w1{
    display: inline-block;
    width: 20%;
    height: 25px;
    text-align: center;
  }
  .w3{
    display: inline-block;
    width: 60%;
    height: 35px;
    text-align: center;
  }

  .dishes-in-pack{
    border: 1px saddlebrown solid;
    margin: 5px;
  }
  .new-group button{
    margin-left: 3%;
    font-size: 24px;
    line-height: 12px;
    height: 20px;
    width: 20px;
    padding: 0;
  }
  .new-group p{
    margin: 5px;
    padding: 0;
  }
  .dishes-in-pack {

  }

</style>
