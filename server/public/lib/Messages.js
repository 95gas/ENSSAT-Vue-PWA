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
      if(undefined != data.msg) {
        this.msg = data.msg;
      } else {
        console.log("ERROR : Msg cannot be null")
      }
      this.date = data.date;
    }
  }
  
  module.exports = Message;