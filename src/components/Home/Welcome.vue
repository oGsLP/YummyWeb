<template>
  <div id="welcome">
    <label>Welcome</label>
    <pie-chart id="user-pie" :chart-data="data"></pie-chart>
  </div>
</template>

<script>
    import PieChart from "../Charts/PieChart";
    export default {
      name: "Welcome",
      components: {PieChart},
      data(){
        return{
          data:{
            labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
            datasets: [
              {
                data: [40, 20, 80, 10]
              }
            ]
          }
        }
      }
    }
</script>

<style scoped>
  #user-pie{
    width: 200px;
    height: 200px;
  }
</style>
