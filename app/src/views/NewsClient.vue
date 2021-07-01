<template>
  <div class="chatroom">
    <div class="channels">
      <button v-bind:class="{ color : clicked == 'btn1'}" id="channel" @click="getMessagesList('channel1'), changeColor('btn1'), resetCurrentMsgList()" >
        <h2>Channel #1</h2>
      </button>
      <button v-bind:class="{ color : clicked == 'btn2'}" id="channel" @click="getMessagesList('channel2'), changeColor('btn2'), resetCurrentMsgList()">
        <h2>Channel #2</h2>
      </button>
    </div>
    <div class="chat">
      <DisplayAllMessages :key="componentKey" v-bind:messages="messages" v-bind:CurrentMsg="CurrentMsg" />
    </div>
  </div>
</template>

<script>
import DisplayAllMessages from "../components/DisplayAllMessages.vue";

// import axios for the communication with the server
import axios from "axios";

export default {
  components: {
    DisplayAllMessages,
  },
  mounted() {
    this.getMessagesList("channel1");
    this.changeColor('btn1');
  },
  // watch on messages
  data() {
    return {
      CurrentMsg: [],
      clicked: '',
      messages: [],
      SelectedChannel: "channel1",
      myMessage: "",
      username: "User",
      isConnected: true,
    };
  },
  watch: {
    isConnected: function () {
      if (!this.isConnected) {
        // TO DO: SHOW NO CONNECTION ERROR
        console.log("Connection lost..");
      }
    },
  },
  sockets: {
    connect() {
      console.log("socket connected");
      this.$socket.client.emit("online", { username: this.username });
    },
    // Fired when the server sends something on the "messageChannel" channel.
    newMessage(data) {
      if (this.SelectedChannel == data.channel) {
        this.CurrentMsg.push(data);
        console.log("Message received")
      }
    },
  },
  methods: {
    changeColor(btn){
      this.clicked = btn;
    },
    resetCurrentMsgList(){
      this.CurrentMsg = []
    },
    setChannel(channel) {
      this.SelectedChannel = channel;
    },
    getMessagesList(channel) {
      this.setChannel(channel);

      this.clicked = true;

      // variable to check if a connection to internet exists
      const isOnline = navigator.onLine;

      var oldMessages;

      if (isOnline) {
        // if we are connected to internet
        this.isConnected = true;

        // retrieve it from server and update the one that was stored
        // set the address for fetching the previous messages
        const resourse =
          "http://localhost:3001/getMessages/" + this.SelectedChannel;

        axios
          // send request to the server
          .get(resourse)

          .then((response) => {
            // fetch the JSON data sent back by the server
            oldMessages = response.data;

            this.messages = oldMessages;

            localStorage.setItem(
              this.SelectedChannel,
              JSON.stringify(oldMessages)
            );

            console.log("Messages retrieved from server");
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      } else {
        // if we are offline
        this.isConnected = false;

        oldMessages = localStorage.getItem(this.SelectedChannel);

        console.log("messages retrieve from localStorage");

        if (oldMessages == null) {
          console.log("Check internet connection");
        } else {
          // convert the string in JSON
          this.messages = JSON.parse(oldMessages);
        }
      }
    },
  },
};
</script>

<style scoped>
.color {
  background-color: rgba(0, 0, 0, 0.062);
}
.chatroom {
  background-color: #eceef0;
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
  background-color: rgba(0, 0, 0, 0.062);
  outline: none;
  border: none;
}

.channels {
  width: 20%;
  float: left;
}

.chat {
  min-height: 400px;
  margin-left: 20%;
  background: rgba(0, 0, 0, 0.062);
}
</style>