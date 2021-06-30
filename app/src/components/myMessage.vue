<template>
  <div class="myself-message-body">
    <div class="message-content">
        <div
          class="message-text"
        >
          <p class="message-username">{{ MyMsg.username }}</p>
          <p ref="message-content">{{ MyMsg.content }}</p>
        </div>
      <div
        class="message-timestamp"
        :style="{ 'justify-content': 'flex-end' }"
      >date</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["MyMsg"],
};
</script>

<style >
.container-message-display .myself-message-body {
  display: flex;
  align-items: flex-end;
  padding-right: 10px;
  justify-content: flex-end;
}
  .message-content {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    flex-direction: column;
    flex-grow: 1;
  }

  .participant-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-left: 10px;
  }

  .message-timestamp {
    padding: 2px 7px;
    border-radius: 15px;
    margin: 0;
    max-width: 50%;
    overflow-wrap: break-word;
    text-align: left;
    font-size: 10px;
    color: #bdb8b8;
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
    border-bottom-right-radius: 0px;
    word-break: break-word;
  }

</style>