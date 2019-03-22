<template>
  <div id="member-part">
    <b-navbar id="member-nav" type="dark" toggleable="lg">
      <b-navbar-brand :to="{name: 'memberMain'}">
        <img src="" alt=""/>
        Yummy!
      </b-navbar-brand>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="{name: 'memberMain'}">Main</b-nav-item>
          <b-nav-item :to="{name: 'memberDeal'}">Deals</b-nav-item>
          <b-nav-item :to="{name: 'memberInfo'}">Info</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav id="member-nav-text">
          <b-nav-text right>Yummy take-out service</b-nav-text>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content"><em>Account</em></template>
            <b-dropdown-item :to="{name: 'memberStat'}">Stat</b-dropdown-item>
            <b-dropdown-item @click="signOut">SignOut</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div id="member-main">
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Member",
      data() {
        return {
        }
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
  #member-nav{
    background-color: #8c5b36;

  }
  #member-nav-text{
    margin-left: 28%;
    font-size: 18px;
    font-weight: bold;
    padding: 0;
  }

  #member-main{
    margin-top: 1%;
    width: 100%;
    height: auto;
    min-height: 550px;
    color: darkslategrey;
  }


</style>
