<template>
  <div id="member-stat">
    <div id="member-left-nav">
    </div>
    <div id="member-right-main">
      <div>

      </div>
      <div>

      </div>
    </div>
    <div id="member-right-blank">
    </div>
  </div>
</template>

<script>
    import utils from "../../utils/utils";

    export default {
      name: "MemberStat",
      data() {
        return {
          statItem:[
            '',

          ],
          leftNavItems:[

          ],
        }
      },
      created(){

      },
      computed:{
        member_id(){
          return sessionStorage.getItem('memberId');
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

              }
            }
          });
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
</style>
