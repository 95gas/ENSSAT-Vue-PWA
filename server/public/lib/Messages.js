class Message{
    constructor(data){   //id,title,comment,tags

      if(undefined != data.user) {
        this.user = data.user;
      } else {
        console.log("ERROR : Must specified Username")
      }
      if(undefined != data.content) {
        this.content = data.content;
      } else {
        console.log("ERROR : Msg cannot be null")
      }
      if(undefined != data.channel) {
        this.channel = data.channel;
      } else {
        console.log("ERROR : Channel cannot be null")
      }
      if(undefined != data.date) {
        this.date = data.date;
      } else {
        console.log("ERROR : Date cannot be null")
      }
      if(undefined != data.FullDate) {
        this.FullDate = data.FullDate;
      } else {
        console.log("ERROR : FullDate cannot be null")
      }
    }
  }
  
  module.exports = Message;