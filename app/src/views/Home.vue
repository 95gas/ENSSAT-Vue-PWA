<!-- **********************************************************
********************* HOME PAGE *******************************
***************************************************************
This page deals with displaying the home page. In our case, the home page is the one displaying the calendar.
-->

<template>
  <div class="home">
    <Calendar />
  </div>
</template>

<script>

import Calendar from '../components/CalendarPannel.vue'

export default {
  name: 'Home',
  components: {
    Calendar
  }
}
</script>
