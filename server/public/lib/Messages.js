class Message{
    constructor(data){   //id,title,comment,tags
      if(undefined != data.id) {
        this.id = data.id;
      } else {
        console.log("ERROR : Must specified id")
      }
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
      this.date = data.date;
    }
  }
  
  module.exports = Message;