<!-- ********************************************************************
********************* CHAT USER INTERFACE *******************************
*************************************************************************
This page deals with displaying the chat for the a normal user.
-->

<template>
  <div class="chatroom">
    <div v-if="warning != ''">
      <div class="warning">
      <h4>{{warning}}</h4>
      </div>
    </div>
    <div class="channels">
      <button v-bind:class="{ color : clicked == 'btn1'}" id="channel" @click="getMessagesList('channel1'), changeColor('btn1'), resetCurrentMsgList()" >
        <h2>Channel #1</h2>
      </button>
      <button v-bind:class="{ color : clicked == 'btn2'}" id="channel" @click="getMessagesList('channel2'), changeColor('btn2'), resetCurrentMsgList()">
        <h2>Channel #2</h2>
      </button>
    </div>
    <div class="chat">
      <DisplayAllMessages v-bind:messages="messages" v-bind:CurrentMsg="CurrentMsg" />
    </div>
  </div>
</template>

<script>

// import the component DisplayAllMessages.vue
import DisplayAllMessages from "../components/DisplayAllMessages.vue";

// import axios for the communication with the server
import axios from "axios";

// import config.json
import config from "../../config.json";

export default {
  components: {
    DisplayAllMessages,
  },
  // ======================= MOUNTED ==============================
  // ===== as the page is rendered execute these functions ========
  mounted() { 
    this.getMessagesList("channel1")
    this.changeColor('btn1')
  },
 // ======================== DATA ================================
  data() {
    return {
      CurrentMsg: [],                 // stores the new message(s) the admin will write
      clicked: '',                    // keep track which button has been clicked on
      messages: [],                   // stores the previous messages written by all the admins in a specific channel
      SelectedChannel: "channel1",    // keeps track of the selected channel
      myMessage: "",                  // stores the messages written in the input field
      username: "Admin",              // stores the username of the Admin connected to the webSocket ( connection is done in the App.vue, hence as the app is launched )
      isConnected: true,              // keeps track if a internet connection exists
      warning:""                      // Variable to prin a warning on the interface
    }
  },
  // ========================= WATCH ==============================
  // =========== as soon as isConnected changes execute ===========
  watch: {
    isConnected: function () {
      if (!this.isConnected) {
        console.log("Connection lost..");
        // TO DO : 'YOU ARE OFFLINE '
      }
    }
  },
  // ========================= SOCKET =============================
  // ================== WebSocket management ======================
  sockets: {
    connect() {  // TO DO : remove this once a login implementation is done ( this will be redundant since it is execute in App.vue )
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
  // ========================= METHOD =============================
  methods: {

    // ************************* ChangeColor ******************************
    // Changes the background color of the btn as they are clicked
    // ********************************************************************
    changeColor(btn){
      this.clicked = btn;
    },

    // ************************* ResetCurretMsgList ******************************
    // It reinializes the CurrentMsg[] for storing the new current messages
    // ***************************************************************************
    resetCurrentMsgList(){
      this.CurrentMsg = []
    },

    // ***************************** setChannel ******************************
    // Stores the selected channel on SelectedChannel
    // ***********************************************************************
    setChannel(channel) {
      this.SelectedChannel = channel;
    },

    // ********************************* getMessagesList **********************************
    // Retrieve from the server the list of the last 100 messages to show on the interface
    // ************************************************************************************
    getMessagesList(channel) {

      // Set the Selected channel
      this.setChannel(channel);

      // variable to check if a connection to internet exists
      const isOnline = navigator.onLine;

      // temp variable to store the last msgs
      var oldMessages;

      if (isOnline) {    // if we are connected to internet

        this.isConnected = true;

        // ========================= START SERVER REQUEST ==============================

        // set the address for fetching the previous messages
        const resourse = config.URL.domain + config.URL.getMessages + this.SelectedChannel;

        axios
          // send request to the server
          .get(resourse)

          .then((response) => {

            // fetch the JSON data sent back by the server
            oldMessages = response.data;

            this.messages = oldMessages;

            // stores it on the local storage
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
        // ========================= END SERVER REQUEST ==============================
      } 
      
      else {   // if we are offline

        this.isConnected = false;
        
        // get last messages from the local storage
        oldMessages = localStorage.getItem(this.SelectedChannel);

        console.log("messages retrieve from localStorage");
        
        // USE CASE: if app is opened offline and no previous messages are stored on local storage, oldMessages will be NULL
        if (oldMessages == null) {
            this.warning = "Cannot fetch messages list. Check internet connection. "
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
.warning {
    color: rgba(207, 41, 41, 0.986);
}
.color {
  background-color: rgba(0, 0, 0, 0.062);
}
.chatroom {
  background-color: #f0f0f0;
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