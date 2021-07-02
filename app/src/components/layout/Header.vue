<!-- **************************************************************
********************* HEADER LAYOUT *******************************
*******************************************************************
This page deals with displaying the HEADER on the Home page.
-->

<template>
  <header class="header">
    <h1>{{ title }}</h1>
    <div class="Navbar">
      <div @click="setTitle('SCHEDULE VIEWER')">
        <router-link to="/">Schedule</router-link>
      </div>
      |
      <div @click="setTitle('NEWS PAGE')">
        <router-link to="/News/admin"> News</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",

  // ======================== DATA ================================
  data() {
    return {
      title: "SCHEDULE VIEWER",
    };
  },
  // ========================= METHOD =============================
  methods: {
  // ************************* setTitle ******************************
  // It reinializes the title variable
  // *****************************************************************

    setTitle(Name) {
      this.title = Name;
    },
  },
};
</script>
  
<style scoped>
.Navbar {
  display: inline-flex;;
}

.header {
  background-color: black;
  color: white;
  text-align: center;
  padding: 10px;
  padding-bottom: 20px;
  margin-bottom: 50px;
}

.header a {
  color: white;
  padding-right: 5px;
  padding-left: 5px;
}
</style>