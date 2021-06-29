<template>
  <div class="chatroom">
    <div class="channels">
      <button id="channel" @click="setChannel('channel1')"><h2>Channel #1</h2></button>
      <button id="channel" @click="setChannel('channel2')"><h2>Channel #2</h2></button>
    </div>
    <div class="chat">
      <!-- Here we show the messages 
      TO DO : 
        1 - fetch the old one from the server 
        2 - queue the new one
      -->

    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      channel: '',
      message: ''
    };
  },
  sockets: {
    connect() {
      console.log('socket connected')
    }
  },
  methods: {
    
  }
};
</script>

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

#channel {
  width: 100%;
  border: none;
  border-bottom: 3px solid rgb(0, 0, 0);
}

button:hover {
  color: rgb(117, 108, 108);
  cursor: pointer;
}

button:active {
  background-color: rgba(255, 255, 255, 0.952);
  outline: none;
  border:none;
}

.channels {
  min-height: 400px;
  width: 20%;
  background: rgba(202, 198, 198, 0.781);
  float: left;
}

.chat {
  min-height: 400px;
  margin-left: 20%;
  background: rgba(0, 0, 0, 0.062);
}

</style>