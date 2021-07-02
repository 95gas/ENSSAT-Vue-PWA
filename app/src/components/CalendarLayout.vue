<!-- ****************************************************************
********************* CALENDAR LAYOUT *******************************
*********************************************************************
This page deals with displaying the selected calendar.
-->

<template>
  <div class="text-center section">
    <h2 class="h2">Schedule: {{ ScheduleSelected }} </h2>
    <v-calendar
      class="custom-calendar max-w-full"
      :masks="masks"
      :attributes="attributes"
      disable-page-swipe
      is-expanded
      is-dark
    >
      <template v-slot:day-content="{ day, attributes }">
        <div class="flex flex-col h-full z-10 overflow-hidden">
          <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <p
              v-for="attr in attributes"
              :key="attr.key"
              class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
              :class="attr.customData.class"
            >
              {{ attr.customData.summary }}
              <br />{{ attr.customData.location }} <br />START :
              {{ attr.customData.StartTime }} <br />END :
              {{ attr.customData.EndTime }}
            </p>
          </div>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script>
// import node-ical for parsing the .ics calendar
import ical from "node-ical";
//import { saveAs } from 'file-saver';

export default {
  // ======================== PROPS ================================
  // fetch data from the parent component ( that is CalendarPannel.vue)
  props: ["ScheduleSelected", "calendarFile"],

  // ======================== DATA ================================
  data() {
    return {
      masks: {               // settings for the v-calendar
        weekdays: "WWW",
      },
      attributes: [],       // empty array to be filled in with the events of the .ics files
    };
  },
  // ========================= WATCH ==============================
  watch: {
  // =========== as soon as calendarFile changes, execute ===========
    calendarFile: function () {
      
      // delete previous calendar stored
      this.emptyCalendar();
      // build new calendar
      this.populateCalendar();
    },
  },
  // ========================= METHOD =============================
  methods: {
    // ************************* emptyCalendar ******************************
    // It reinializes the attributes[] for storing the new events
    // **********************************************************************

    emptyCalendar(){
      this.attributes = [];
    },

    /*************************** populateCalendar *******************************
    The function deals with fetching the events from the ics file and insert them into the calendar layout.
    ****************************************************************************/

    populateCalendar() {

      // parse the ics file 
      const events = ical.sync.parseICS(this.calendarFile);

      // Fill in 'attributes[]' with the events
      for (const event of Object.values(events)) {
        this.attributes.push({
          key: event.key,
          customData: {
            summary: event.summary,
            location: event.location,
            StartTime: event.start.toLocaleTimeString("en-GB"),
            EndTime: event.end.toLocaleTimeString("en-GB"),
          },
          dates: new Date(
            parseInt(event.start.getFullYear()),
            parseInt(event.start.getMonth()),
            parseInt(event.start.getDate())
          ),
        });
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  display: none;
}

/deep/ .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #0467ca;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;

  border-radius: 0;
  width: 100%;

  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>
