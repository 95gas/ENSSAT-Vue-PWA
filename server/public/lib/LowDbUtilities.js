const Message = require("./Messages.js");
const LowDB = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

class MessageService{
	constructor(){
		this.idC1 = 1;
		this.idC2 = 1;
		this.db = {};
	}

	static async createDB(fileName){ 
		const service = new MessageService();
		const adapter = new FileAsync(fileName);
		service.db = await LowDB(adapter);
		return service;
	}

	addMsg(user, msg, channel){
		const id1 = this.idC1;
		const id2 = this.idC2;
		var id;
		if (channel == "channel1"){
			id = id1;
			this.idC1++;
		}
		else if (channel == "channel2"){
			id = id2;
			this.idC2++;
		}
		const now = new Date();
		const thisMoment = now.toLocaleString('en-GB', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' })
  		let newMsg;
  		if(undefined !== (newMsg = new Message({id:id, user:user, content:msg, channel: channel, date:thisMoment}))){
			this.db.get(channel).push(newMsg).write();
		}else{
			throw Error("cannot insert null msg");
		}
	}

	getMsgs(channel){
		return this.db.get(channel).value();

        // return here the first 100 messages 
	}
}

module.exports = MessageService;
