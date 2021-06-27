<template>
  <div class="chatroom">
    <div class="channels">
      <div class="channel1">
        <button><h2>Channel 1</h2></button> 
      </div>
      <div class="channel2">
        <h2> Channel 2</h2>
      </div>
    </div>
    <div class="chat">
        <div class="sendMessage">

        </div>
      </div>
  </div>
</template>

<style scoped>
.chatroom {
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  outline: 0;
  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  margin: auto;
  width: 70%;
  min-height: 400px;
  border: 3px solid rgb(0, 0, 0);
  padding: 10px;
  text-align: center;
}

.channels {
min-height: 400px;
  width: 20%;
  height: 200px;
  background: rgba(202, 198, 198, 0.781);
  float: left;
}

.chat {
  min-height: 400px;
  margin-left: 20%;
  height: 200px;
  background: rgba(0, 0, 0, 0.062);
}

</style>