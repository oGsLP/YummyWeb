
<script>
  import {Bar} from 'vue-chartjs';
    export default {
      name: "BarChart",
      extends: Bar,
      data(){
        return{
          defaultColor: [
            '#DD1B16',
            '#ddd119',
            '#7f43dd',
            '#62ff20',
            '#41B883',
            '#E46651',
            '#00D8FF',
          ],
        }
      },
      props: {
        labels: {
          type: Array,
          default: null
        },
        label: {
          type: String,
          default: ''
        },
        data: {
          type: Array,
          default: null
        },
        colorIndex: {
          type: Number,
          default: 0
        },
        options: {
          type: Object,
          default: {
            responsive: true,
            maintainAspectRatio: false
          }
        }
      },
      mounted () {
        let chartData={
          labels: this.labels,
          datasets:[
            {
              label: this.label,
              backgroundColor: this.defaultColor[this.colorIndex],
              data: this.data
            }
          ]
        };
        this.renderChart(chartData, this.options)
      }
    }
</script>

<style scoped>

</style>
