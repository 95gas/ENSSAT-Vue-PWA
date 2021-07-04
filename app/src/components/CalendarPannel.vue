<!-- ****************************************************************
********************* CALENDAR PANNEL *******************************
*********************************************************************
This page deals with displaying the calendar pannel by which the client can select which calendar needs displaying.
-->

<template>
  <div>
    <div v-if="warning != ''">
      <div class="warning">
      <h4>{{warning}}</h4>
      </div>
    </div>
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
      :key="componentKey"
    />
  </div>
</template>

<script>
// import database
import Db from "../Database/DB.json";

// import config.json
import config from "../../config.json";

// import the CalendarLayut page
import CalendarLayout from "./CalendarLayout.vue";

// import axios for the communication with the server
import axios from "axios";

export default {
  name: "Calendar",
  components: {
    CalendarLayout,
  },
  // ======================= MOUNTED ==============================
  // ===== as the page is rendered execute these functions ========
  mounted() { 
    this.isOnlineAsync()
  },
  // ======================== DATA ================================
  data() {
    return {
      SelectedFaculty: -1,    // keep track of the INDEX in the database of the selected faculty
      SelectedGroup: "",      // keep track of the INDEX in the database of the selected group for the selected faculty
      ScheduleSelected: "",   // keep track of the NAME of the group selected
      listFaculties: Db,      // pass the database
      calendarFile: "",       // for storing the file fetched from the server
      componentKey: 0,        // key for the component 'CalendarLayout'
      warning:"",             // Variable to prin a warning on the interface
      isConnected:''          // keeps track if a internet connection exists
    };
  },
  // ========================= METHOD =============================
  methods: {
    // ************************************ isOnlineAsync *************************************
    // Async function listener to the 'online' event of the system. 
    // As the connection is lost it 'removes' the warning and lets the app know it is online
    // ****************************************************************************************
    isOnlineAsync: function() {
        window.addEventListener('online', ()=> {
        console.log("You are now back online.");
        this.isConnected = true
        this.warning = ""
      })
    },

    /*************************** RELOAD COMPONENT *****************************
    **************************************************************************
    The function deals with changing the 'key' of the component 'CalendarLayour'.
    This causes a reload of the component that in turns delete the previous events in the 'CalendarLayout'.*/

    forceRerender: function () {
      this.componentKey += 1;
    },

    /*************************** FETCH CALENDAR *******************************
    **************************************************************************
    The function deals with fetching the calendar from server.*/

    fetchCalendar: function () {
      // update the status of the network
      this.isConnected = navigator.onLine;

      try {
        // set the name of the group selected
        this.ScheduleSelected = this.listFaculties.Faculty[this.SelectedFaculty].Groups[this.SelectedGroup].Name;

        // if we are connected to internet
        if (this.isConnected) {
          
          // ========================= START SERVER REQUEST ==============================

          // set the address for fetching the calendar
          const resourse = config.URL.domain + config.URL.getCalendar + this.SelectedFaculty + "/" + this.SelectedGroup;

          axios
            // send request to the server
            .get(resourse)

            .then((response) => {

              // fetch the ics file sent back by the server
              this.calendarFile = response.data;

              // store the ics file in the local storage
              localStorage.setItem(this.ScheduleSelected, this.calendarFile);

              console.log("calendar retrieve from server");
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });

          // reload the CalendarLayout to remove the previous events
          this.forceRerender();

          // ========================= END SERVER REQUEST ==============================
        } 
        
        // if we are offline
        else {
          
          // retrieve calendar from local storage
          this.calendarFile = localStorage.getItem(this.ScheduleSelected);

          console.log("calendar retrieve from localStorage");

          //this.forceRerender();  //---> TO DO: CHECK WHY OFFLINE THIS IS NOT WORKING

          // USE CASE: 
          // 1 - if the app is open for its first time offline, there will be no calendars stored in the local storage ( -> this.calendarFile == null )
          // 2 - if the user selects a calendar never requested before, it will be not in the local storage ( -> this.calendarFile == null )
          if (this.calendarFile == null) {
            this.warning = "Cannot fetch calendar. Check your internet connection. "
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.warning {
    padding-bottom: 30px;
    color: rgba(207, 41, 41, 0.986);
}
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
