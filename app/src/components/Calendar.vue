<template>
  <div class="schedule">
    <form id="CalendarForm" v-on:submit="send" method="post">
      <fieldset>
        <p>
          <label> Insert name of faculty </label>
          <input type="text" name="faculty" placeholder="Insert faculty name" />
        </p>
        <p>
          <label> Insert year of study </label>
          <input type="text" name="year" placeholder="Insert year of study" />
        </p>
        <p>
          <label> Insert group number </label>
          <input type="text" name="group" placeholder="Insert group" />
        </p>
        <button type="submit" class="btn">Search</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  methods: {
    send: function () {
      
      var action_src =
        "http://localhost:3001/schedule/" +
        document.getElementsByName("faculty")[0].value +
        "/" +
        document.getElementsByName("year")[0].value +
        "/" +
        document.getElementsByName("group")[0].value;

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
  width: 400px;
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
}

fieldset input {
  text-align: right;
  display: table-cell;
  position: relative;
}
</style>
