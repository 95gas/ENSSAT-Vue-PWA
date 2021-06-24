<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Calendar />
  </div>
</template>

<script>

import Calendar from '../components/Calendar.vue'

export default {
  name: 'Home',
  components: {
    Calendar
  }
}
</script>
