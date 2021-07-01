<!-- *****************************************************************
************************* MAIN APP PAGE ******************************
**********************************************************************

This page is the first to be displayed as the app is launched.
-->

<template>
  <div class="app">
    <Header />
    <!-- the HEADER displays also the HOME.vue page -->
    <router-view />
  </div>
</template>

<script>
import Header from "./components/layout/Header.vue";

export default {
  name: "app",
  components: {
    Header,
  },
  data() { return {username: "Admin"} },
  sockets: {
    connect() {
      console.log("socket connected");
      this.$socket.client.emit("online", { username: this.username });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
