<template>
  <div id="leftNav">
    <ul class="menu">
      <li v-for="item of items"><a @click="item.sort">{{item.text}}</a></li>
      <div class="ribbon_wrap">
        <div class="ribbon_rail">
          <div></div>
        </div>
      </div>
    </ul>
    <div style="text-align:center;clear:both">
    </div>
  </div>
</template>

<script>
    export default {
      name: "LeftNav",
      props:['items']
    }
</script>

<style scoped>
  #leftNav {
    background-color:transparent;
    position: fixed;
    left:3%;
    top:55%;
  }
  .menu {
    position: relative;
    padding: 5px 0;
    line-height: 35px;
    border-radius: 5px;
  }
  .menu a {
    display: block;
    color: midnightblue;
    text-decoration: none;
    text-shadow: 0 1px 0 #e0e0e0;
    font-size: 24px;
  }
  .menu li:hover a,
  .menu li:first-child a {
    color: #980202;
    text-shadow: 0 1px 0 rgba(0,0,0,.1);
  }
  .menu li:hover a{
    color: #ffff;
  }
  .menu li {
    position: relative;
    z-index: 2;
  }
  .ribbon_wrap {
    position: absolute;
    width: 110%;
    top: 5px;
    left: -10%;
    z-index: 1;
    transition: top 0.5s;
  }
  .ribbon_rail {
    position: relative;
    width: 110%;
    height: 30px;
    padding: 0 20px;
    color: #e3e3e3;
    text-shadow: 0 1px 0 #6b6b6b;
    box-shadow: 0 2px 5px rgba(0,0,0,.2);

  }
  .ribbon_rail:before,
  .ribbon_rail:after {
    position:absolute;
    content:"";
    top:100%;
    width:0;
    height:0;
    border: 5px solid transparent;
  }
  .ribbon_rail:before {
    left:0;
    border-color: #5d0f0f #5d0f0f transparent transparent;
  }
  .ribbon_rail:after {
    right:0;
    border-color: #5d0f0f transparent transparent #5d0f0f;
  }
  .ribbon_rail > div {
    width: 100%;
  }
  .ribbon_rail > div:before,
  .ribbon_rail > div:after {
    content:"";
    position: absolute;
    top:10px;
    z-index: -1;
    width: 0;
    height:0;
    border-width: 14px;
    border-style: solid;
    border-color: blueviolet blueviolet darkblue blueviolet;
  }
  .ribbon_rail > div:before {
    right: 100%;
    border-left-color: transparent;
    margin-right: -10px;
  }
  .ribbon_rail > div:after {
    left: 100%;
    border-right-color: transparent;
    margin-left: -10px;
  }
  .menu li:nth-child(1):hover ~ .ribbon_wrap{
    top: 8px;
  }
  .menu li:nth-child(2):hover ~ .ribbon_wrap{
    top: 43px;
  }
  .menu li:nth-child(3):hover ~ .ribbon_wrap{
    top: 78px;
  }
  .menu li:nth-child(4):hover ~ .ribbon_wrap{
    top: 113px;
  }
  .menu li:nth-child(5):hover ~ .ribbon_wrap{
    top: 148px;
  }




</style>
