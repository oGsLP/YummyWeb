<template>
  <div id="admin-part">
    <b-navbar id="admin-nav" type="dark" toggleable="lg">
      <b-navbar-brand :to="{name: 'adminApply'}">
        <img src="" alt=""/>
        Yummy!
      </b-navbar-brand>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="{name: 'adminApply'}">Applies</b-nav-item>
          <b-nav-item :to="{name: 'adminSetting'}">Settings</b-nav-item>
          <b-nav-item :to="{name: 'adminStat'}">Stat</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav id="admin-nav-text">
          <b-nav-text right>Yummy take-out service</b-nav-text>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content"><em>Account</em></template>
            <b-dropdown-item @click="signOut">SignOut</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div id="admin-main">
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Admin",
      data() {
        return {

        }
      },
      created(){

      },
      computed:{

      },
      methods:{
        signOut(){
          this.$store.dispatch('setUser',null);
          this.$store.dispatch('setToken',null);
          this.$router.push({name: 'adminLogin'});
        }
      }
    }
</script>

<style scoped>
  #admin-nav{
    background-color: #268c6a;

  }
  #admin-nav-text{
    margin-left: 32%;
    font-size: 18px;
    font-weight: bold;
    padding: 0;
  }

  #admin-main{
    margin-top: 1%;
    width: 100%;
    height: auto;
    min-height: 550px;
    color: darkslategrey;
  }
</style>
