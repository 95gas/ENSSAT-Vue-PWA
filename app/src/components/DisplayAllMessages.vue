<template>
  <div ref="containerMessageDisplay" class="container-message-display">
    <div v-if="loading" class="loader">
      <div class="message-loading"></div>
    </div>
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="message-container"
    >
      <OtherMessage v-bind:messages="message" />
    </div>
  </div>
</template>

<script>
import OtherMessage from "./otherMessages.vue";
export default {
  components: {
    OtherMessage,
  },
  props: ["messages"],
};
</script>

<style >
.quick-chat-container .container-message-display {
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  max-height: 100%;
}

.message-text > p {
  margin: 5px 0 5px 0;
  font-size: 14px;
}

.my-message > .message-timestamp {
  text-align: right;
}

.other-message {
  justify-content: flex-start;
  padding-left: 15px;
  align-items: flex-start;
}

.other-message > .message-text {
  color: #fff;
  border-bottom-left-radius: 0;
}

.my-message > .message-text {
  border-bottom-right-radius: 0;
}

.message-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.message-username {
  font-size: 10px;
  font-weight: bold;
}

.icon-sent {
  padding-left: 5px;
  color: rgb(129, 127, 127);
}

.message-loading {
  height: 8px;
  width: 8px;
  border: 1px solid rgb(187, 183, 183);
  border-left-color: rgb(59, 59, 59);
  border-radius: 50%;
  margin-left: 5px;
  display: inline-block;
  animation: spin 1.3s ease infinite;
}

.loader .message-loading {
  width: 16px;
  height: 16px;
  margin: 5px 0 0 0;
}


@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
