<template>
  <div id="member-part">
    <b-navbar id="member-nav" type="dark" toggleable="lg">
      <b-navbar-brand :to="{name: 'member'}">
        <img src="" alt=""/>
        Yummy!
      </b-navbar-brand>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="{name: 'memberLogin'}">Take-out</b-nav-item>
          <b-nav-item :to="{name: 'merchantLogin'}">Deals</b-nav-item>
          <b-nav-item :to="{name: 'adminLogin'}">Info</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav id="member-nav-text">
          <b-nav-text right>Yummy take-out service</b-nav-text>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!--<b-nav-form>-->
            <!--<b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" />-->
            <!--<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
          <!--</b-nav-form>-->

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content"><em>SignOut</em></template>
            <b-dropdown-item :to="{name: 'home'}" @click="signOut">SignOut</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div id="member-main">
      <div id="member-left-nav">
        <router-view></router-view>
      </div>
      <div id="member-right-main">
        <router-view></router-view>
      </div>
      <div id="member-right-blank">

      </div>
    </div>
  </div>

</template>

<script>
    export default {
      name: "Member",
      data() {
        return {}
      },
      method:{
        signOut(){

        }
      }
    }
</script>

<style scoped>
  #member-part{
    color: ghostwhite;
  }
  #member-nav{
    background-color: lightsalmon;

  }
  #member-nav-text{
    margin-left: 28%;
    font-size: 18px;
    font-weight: bold;
    padding: 0;
  }

  #member-main{
    width: 100%;
    height: 700px;
  }
  #member-left-nav{
    height: auto;
    min-height: 300px;
    width: 15%;
    display: inline-block;
    vertical-align: top;
    border: 2px solid green;
  }
  #member-right-main{
    height: 700px;
    width: 68%;
    display: inline-block;
    vertical-align: top;
    border: 2px solid black;
  }
  #member-right-blank{
    width: 15%;
    height: 500px;
    display: inline-block;
    vertical-align: top;
    border: 2px solid darkcyan;
  }

</style>
