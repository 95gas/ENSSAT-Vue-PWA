<template>
  <div class="chatroom">
    <div class="channels">
      <button id="channel" @click="setChannel('channel1')">
        <h2>Channel #1</h2>
      </button>
      <button id="channel" @click="setChannel('channel2')">
        <h2>Channel #2</h2>
      </button>
    </div>
    <div class="chat">
      <!-- Here we show the messages 
      TO DO : 
        1 - fetch the old one from the server 
        2 - queue the new one
      -->
    </div>
    <div class="sendMessage">
      <div class="center">
        <input
          type="text"
          v-model="message"
          placeholder="  Send message ... "
        />
        <div class="btn">
          <button id="send" @click="sendMsg">SEND</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import MessageUtility from "../assets/lib/main.js"


export default {

  data() {
    return {
      SelectedChannel: "",
      message: "",
      username: "Admin",
    };
  },
  sockets: {
    connect() {
      console.log("socket connected");
       this.$socket.client.emit("online", {username: this.username});
    },
  },
  methods: {
    sendMsg() {
      // TO DO : add message to the list
      const data = { username: "", message: this.message };

      // this.$socket.client is `socket.io-client` instance
      this.$socket.client.emit(this.SelectedChannel, data);
    },
    setChannel(channel) {
      this.SelectedChannel = channel;
    },
  },
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
  border: none;
}

.channels {
  min-height: 400px;
  width: 20%;
  background: rgba(202, 198, 198, 0.781);
  float: left;
}

.chat {
  min-height: 350px;
  margin-left: 20%;
  background: rgba(0, 0, 0, 0.062);
}

.sendMessage {
  min-height: 50px;
  background: rgba(53, 46, 46, 0.253);
  margin-left: 20%;
}

input {
  width: 80%;
  height: 40px;
  margin-top: 2px;
  border-radius: 3px;
  float: left;
}

input:focus {
  outline: none;
  border-radius: 3px;
}

.btn {
  margin-left: 81%;
  border: none;
}

.btn:active {
  border: none;
}

#send {
  width: 95%;
  height: 40px;
  border-radius: 3px;
  margin-top: 6px;
}
</style>