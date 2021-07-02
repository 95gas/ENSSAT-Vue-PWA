<!-- ****************************************************************
********************* CURRENT MESSAGES *******************************
*********************************************************************
This page deals with rendering the new messages.
-->

<template>
  <div class="current-message-body">
    <div class="message-content">
      <div class="message-text">
        <p class="message-username">{{ CurrentMsg.user }}</p>
        <p ref="message-content">{{ CurrentMsg.content }}</p>
      </div>
      <div class="message-timestamp" :style="{ 'justify-content': 'baseline' }">
        {{CurrentMsg.date}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["CurrentMsg"],
};
</script>

<style >
.current-message-body {
  display: flex;
  align-items: flex-end;
  padding-left: 10px;
}
.message-content {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  flex-grow: 1;
}

.message-timestamp {
  padding: 2px 7px;
  border-radius: 15px;
  margin: 0;
  max-width: 50%;
  overflow-wrap: break-word;
  text-align: left;
  font-size: 10px;
  color: #a9a2a2;
  width: 100%;
  display: flex;
  align-items: center;
}

.message-text {
  background: #fff;
  padding: 6px 10px;
  line-height: 14px;
  border-radius: 15px;
  margin: 5px 0 5px 0;
  max-width: 70%;
  overflow-wrap: break-word;
  text-align: left;
  white-space: pre-wrap;
  border-bottom-left-radius: 0px;
  word-break: break-word;
}
</style>