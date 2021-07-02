/* **********************************************************************************************
*************************** UTILITY FOR MANAGING THE LOWDB DATABASE *****************************
*************************************************************************************************
*/

const Message = require("./Messages.js");
const LowDB = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

class MessageService{

	constructor(){
		this.db = {};
	}

	/* ==================== CREATE DATABASE =====================
	=============================================================*/
	// Creates database instance and links it to the 'fileName'.json file
	static async createDB(fileName){ 
		const service = new MessageService();
		const adapter = new FileAsync(fileName);
		service.db = await LowDB(adapter);
		return service;
	}

	/* ====================== ADD MESSAGE =======================
	=============================================================*/
	addMsg(user, msg, channel, Date, FullDate){
  		let newMsg;
  		if(undefined !== (newMsg = new Message({user:user, content:msg, channel: channel, date:Date , FullDate: FullDate}))){
			this.db.get(channel).push(newMsg).write();
		}else{
			throw Error("cannot insert null msg");
		}
	}

	/* ================= GET LAST 100 MESSAGES ===================
	==============================================================*/
	getMsgs(channel){
		const NumMessages = 100;

		// order the messages in a descending order (from the oldest to the newest) based on the 'FullDate' attribute and pick the first 'NumMessages' messages
		const lastMessages = this.db.get(channel).filter({}).orderBy('FullDate', 'desc').take(NumMessages).value();

		// Return the reversed array of messages
		// We reverse the lastMessages array so that on the interface the oldest messages are shown at the top and the newest at the bottom
		return lastMessages.reverse();	
	}
}

// export the class
module.exports = MessageService;
