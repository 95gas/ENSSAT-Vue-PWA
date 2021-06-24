<template>
  <div class="schedule">
    <form id="CalendarForm" v-on:submit="send" method="post">
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
              {{ index }}{{ faculty.Name }}
            </option>
          </select>
        </p>
        <p>
          <label> Choose your group: </label>
          <select v-model="SelectedGroup" v-if="SelectedFaculty != -1">
            <option
              name="group"
              v-for="(options, index) in listFaculties.Faculty[SelectedFaculty]
                .value"
              :value="index"
              :key="options.Name"
            >
              {{ index }}{{ options.Name }}
            </option>
          </select>
        </p>
        <p>
          <button type="submit" class="btn">Search</button>
        </p>
      </fieldset>
    </form>
  </div>
</template>

<script>
import Db from "../config.json";

export default {
  name: "Calendar",
  data() {
    return {
      SelectedFaculty: -1,
      SelectedGroup: '',
      listFaculties: Db
    };
  },
  methods: {
    send: function () {
      var action_src =
        "http://localhost:3001/schedule/" + this.SelectedFaculty + "/" + this.SelectedGroup;

      var form = document.getElementById("CalendarForm");

      form.action = action_src;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.schedule {
  position: relative;
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 1px solid #999;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  outline: 0;
  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  margin-bottom: 35px;
  margin-right: 10%;
  display: table-cell;
  width: 300px;
}

fieldset {
  display: table;
  border-style: none;
}
fieldset p {
  display: table-row;
}

fieldset label {
  text-align: left;
  display: table-cell;
  padding-right: 20px;
}

fieldset select {
  text-align: right;
  display: table-cell;
  position: relative;
  width: 70px;
}
</style>
