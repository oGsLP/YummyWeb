<template>
  <div id="merchant-part">
    <b-navbar id="merchant-nav" type="light" toggleable="lg">
      <b-navbar-brand :to="{name: 'merchantInfo'}">
        <img src="" alt=""/>
        Yummy!
      </b-navbar-brand>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="{name: 'merchantMenu'}">Menu</b-nav-item>
          <b-nav-item :to="{name: 'merchantDeal'}">Deals</b-nav-item>
          <b-nav-item :to="{name: 'merchantInfo'}">Info</b-nav-item>
        </b-navbar-nav>

        <!--<b-navbar-nav id="member-nav-text">-->
          <!--<b-nav-text right>Yummy take-out service</b-nav-text>-->
        <!--</b-navbar-nav>-->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content"><em>Account</em></template>
            <b-dropdown-item :to="{name: 'merchantStat'}">Stat</b-dropdown-item>
            <b-dropdown-item @click="signOut">SignOut</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div id="merchant-main">
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Merchant",
      data() {
        return {}
      },
      created(){

      },
      computed:{

      },
      methods:{
        signOut(){
          alert('Sign out !');
          this.$store.dispatch('setUser',null);
          this.$store.dispatch('setToken',null);
          this.$router.push({name: 'home'});
        }
      }
    }
</script>

<style scoped>
  #merchant-nav{
    background-color: skyblue;
  }
  #merchant-nav-text{
    margin-left: 28%;
    font-size: 18px;
    font-weight: bold;
    padding: 0;
  }

  #merchant-main{
    margin-top: 1%;
    width: 100%;
    height: auto;
    min-height: 550px;
    color: darkslategrey;
  }
</style>
