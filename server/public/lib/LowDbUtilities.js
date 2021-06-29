const Message = require("./Messages.js");
const LowDB = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

class MessageService{
	constructor(){
		this.idCpt = 1;
		this.db = {Chat:[]};
	}

	static async createDB(fileName){ 
		const service = new MessageService();
		const adapter = new FileAsync(fileName);
		service.db = await LowDB(adapter);
		return service;
	}

	addMsg(user, msg){
		const id = this.idCpt;
		const now = new Date();
  		let newMsg;
  		if(undefined !== (newMsg = new Message({id:id,user:user,msg:msg,date:now}))){
			this.db.get('Chat').push(newMsg).write();
			this.idCpt++;
		}else{
			throw Error("cannot insert null msg");
		}
	}

	getTasks(){
		return this.db.get('Chat').value();

        // return here the first 100 messages 
	}
}

module.exports = MessageService;
