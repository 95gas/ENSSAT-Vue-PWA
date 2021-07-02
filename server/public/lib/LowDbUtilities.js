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

	addMsg(user, msg, channel, Date, FullDate){
  		let newMsg;
  		if(undefined !== (newMsg = new Message({ user:user, content:msg, channel: channel, date:Date , FullDate: FullDate}))){
			this.db.get(channel).push(newMsg).write();
		}else{
			throw Error("cannot insert null msg");
		}
	}

	getMsgs(channel){
		const NumMessages = 100;
		const lastMessages = this.db.get(channel).filter({}).orderBy('FullDate', 'desc').take(NumMessages).value();
		return lastMessages.reverse();
	}
}

module.exports = MessageService;
