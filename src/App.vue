<template>
  <div id="app">
    <router-view/>
    <p id="app-copyright">Yummy! | @XYF | Copyright ©2019 All Rights Reserved</p>
  </div>
</template>

<script>

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    background-color: white;
  }
  #app::-webkit-scrollbar {/*滚动条整体样式*/
    width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  #app::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
  }
  #app::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #EDEDED;
  }
  #app-copyright {
    color: dimgrey;
    font-size: 14px;
    padding: 0;
    margin: 0;
    position: fixed;
    left: 20%;right: 20%;
    bottom: 2.5%;
  }
</style>
