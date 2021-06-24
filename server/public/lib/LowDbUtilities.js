const Message = require("./Messages.js");
const LowDB = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

class MessageService{
	constructor(data){
		this.idCpt = 0;
		this.db = {};
	}

	static async create(fileName){ 
		const service = new MessageService();
		const adapter = new FileAsync(fileName + '.json');
		service.db = await LowDB(adapter);
		return service;
	}

	addMsg(user, msg){
		const id = this.idCpt;
  		let newMsg;
  		if(undefined !== (newMsg = new Message({id:id,user:user,msg:msg}))){
  			console.log("just inserted a msg"+newTask);
			this.db.get('Chat').push(newTask).write();
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
