<!-- ****************************************************************
********************* CALENDAR PANNEL *******************************
*********************************************************************

This page deals with displaying the calendar pannel by which the client select which calendar needs displaying.
-->

<template>
  <div>
    <div class="schedule">
      <fieldset>
        <p>
          <label> Choose the faculty: </label>
          <select v-model="SelectedFaculty">
            <option
              name="faculty"
              v-for="(faculty, index) in listFaculties.Faculty"
              :value="index"
              :key="faculty.Name"
            >
              {{ faculty.Name }}
            </option>
          </select>
        </p>
        <p>
          <label v-if="SelectedFaculty != -1"> Choose your group: </label>
          <select v-model="SelectedGroup" v-if="SelectedFaculty != -1">
            <option
              name="group"
              v-for="(options, index) in listFaculties.Faculty[SelectedFaculty]
                .Groups"
              :value="index"
              :key="options.Name"
            >
              {{ options.Name }}
            </option>
          </select>
        </p>
        <p>
          <button @click="fetchCalendar" class="btn">Search</button>
        </p>
        <p></p>
      </fieldset>
    </div>
    <!-- display the CalendarLayout page and send to it the calendarFile and the name of the selected group -->
    <CalendarLayout
      v-bind:ScheduleSelected="ScheduleSelected"
      v-bind:calendarFile="calendarFile"
    />
  </div>
</template>

<script>
// import database
import Db from "../Database/DB.json";

// import the CalendarLayut page
import CalendarLayout from "../components/CalendarLayout.vue";

// import axios for the communication with the server
import axios from "axios";

export default {
  name: "Calendar",
  components: {
    CalendarLayout,
  },
  data() {
    return {
      // keep track of the INDEX in the database of the selected faculty
      SelectedFaculty: -1,
      // keep track of the INDEX in the database of the selected group for the selected faculty
      SelectedGroup: "",
      // keep track of the NAME of the group selected
      ScheduleSelected: "",
      // pass database
      listFaculties: Db,
      // for storing the file fetched from the server
      calendarFile: "",
    };
  },
  methods: {
    /* ***********************************************************************
    *************************** FETCH CALENDAR *******************************
    **************************************************************************

    The function deals with fetching the calendar from server.*/

    fetchCalendar: function () {
      try {
        const resourse = "http://localhost:3001/schedule/" + this.SelectedFaculty + "/" + this.SelectedGroup;

        axios
          // send request to the server
          .get(resourse)

          .then((response) => {

            // fetch the ics file sent back by the server
            this.calendarFile = response.data;

            // set the name of the group selected
            this.ScheduleSelected = this.listFaculties.Faculty[this.SelectedFaculty].Groups[this.SelectedGroup].Name;

          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.schedule {
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 1px solid #999;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  outline: 0;
  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  margin: auto;
  width: 300px;
  border: 3px solid green;
  padding: 10px;
  text-align: center;
}

fieldset {
  border-style: none;
}

label {
  text-align: left;
  display: inline-block;

  width: 160px;
}

select {
  text-align: right;
  display: inline-block;
  width: 100px;
}
</style>
