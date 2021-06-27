<!-- **************************************************************
********************* HEADER LAYOUT *******************************
*******************************************************************

This page deals with displaying the HEADER on the Home page.
-->

<template>
  <header class="header">

    <h1>Schedule manager</h1>
    <router-link to="/">Schedule</router-link> |
    <router-link to="/News/user">News</router-link>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>
  
<style scoped>
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
}
</style>