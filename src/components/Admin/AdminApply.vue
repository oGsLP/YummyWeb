<template>
  <div id="admin-apply">
    <div id="admin-left-nav">

    </div>
    <div id="admin-right-main">
      <div id="applies-list">
        <b-card class="apply-card"
                v-for="(apply,index) of applies"
                :key="'apply_'+index"
                no-body>
          <h3 slot="header">Apply</h3>

          <b-card-body>
            <b-card-title>{{apply.name}}</b-card-title>
            <b-card-sub-title class="mb-2">{{apply.cdkey}}</b-card-sub-title>
          </b-card-body>

          <b-list-group flush>
            <b-list-group-item>
              <label>Type: </label>
              <b>{{apply.type}}</b>
            </b-list-group-item>
            <b-list-group-item>
              <label>Address: </label>
              <b>X: <code>{{apply.address.longitude}}</code>,</b>
              <b>Y: <code>{{apply.address.latitude}}</code>,</b>
              <b>Note: <code>{{apply.address.note}}</code></b>
            </b-list-group-item>

          </b-list-group>

          <b-card-body>
            <b-button variant="success" @click="approve_apply(index)">Approve</b-button>
            <b-button variant="danger" @click="reject_apply(index)">Reject</b-button>
          </b-card-body>

        </b-card>
      </div>
    </div>
    <div id="admin-right-blank">

    </div>
  </div>
</template>

<script>
    import utils from "../../utils/utils";

    export default {
      name: "AdminApply",
      data(){
        return{
          applies: []
        }
      },
      created(){
        this.get_applies();
      },
      computed:{

      },
      methods:{
        get_applies(){
          utils.axiosMethod({
            method: 'GET',
            url: `/yummy/admin/manage/applies`,
            callback: response=>{
              if(response.data.code===1)
                this.applies=response.data.list;
            }
          });
        },
        reject_apply(i){
          utils.axiosMethod({
            method: 'PUT',
            url: `/yummy/admin/manage/applies/${this.applies[i].merId}`,
            params: {type: 'GET_DISAPPROVAL'},
            callback: response=>{
              alert(response.data.msg);
              if(response.data.code===1)
                this.get_applies();
            }
          });
        },
        approve_apply(i){
          utils.axiosMethod({
            method: 'PUT',
            url: `/yummy/admin/manage/applies/${this.applies[i].merId}`,
            params: {type: 'AFTER_VERTIFICATION'},
            callback: response=>{
              alert(response.data.msg);
              if(response.data.code===1)
                this.get_applies();
            }
          });
        },

      }
    }
</script>

<style scoped>
  #admin-left-nav{
    height: auto;
    min-height: 300px;
    width: 8%;
    display: inline-block;
    vertical-align: top;
    /*border: 2px solid green;*/
  }
  #admin-right-main{
    height: 620px;
    width: 82%;
    display: inline-block;
    vertical-align: top;
    border-left: 2px solid black;
    border-right: 2px solid black;
    overflow-y: scroll;
    padding: 2% 0;
    text-align: center;
  }
  #admin-right-main::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  #admin-right-blank{
    width: 8%;
    height: 500px;
    display: inline-block;
    vertical-align: top;
  }
  #applies-list{
    text-align: center;
    display: flex;
    justify-content: center;
    width: 95%;
    padding: 1% 2%;
  }
  .apply-card{
    width: 27%;
    margin: 2%;
  }
  .apply-card h3{
    margin: 0;
  }

  .apply-card .card-body{
    padding: 10px;
  }
  .apply-card .card-title{
    font-size: 32px;
    font-weight: bold;
  }
  .apply-card label{
    margin: 0;
  }
  .apply-card button {
    margin: 0 10px;
  }
</style>
