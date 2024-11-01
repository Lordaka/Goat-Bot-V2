const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
module.exports = {
	config: {
		name: "vitesse",
		aliases: ["vit"],
		version: "1.0",
		author: "Shïsûį Dånïęl",
		countDown: 5,
		role: 2,
		shortDescription: "bot will leave gc",
		longDescription: "",
		category: "admin",
		guide: {
			vi: "{pn} [tid,blank]",
			en: "{pn} [tid,blank]"
		}
	},

	onStart: async function ({ api,event,args, message }) {
 var id;
 if (!args.join(" ")) {
 id = event.threadID;
 } else {
 id = parseInt(args.join(" "));
 }
 return api.sendMessage("𝐃𝐢𝐱 𝐭𝐨𝐮𝐫𝐬 𝐝𝐞 𝐩𝐥𝐚𝐧𝐞𝐭𝐞⚪....𝐭𝐨𝐩....𝐜'𝐞𝐬𝐭 𝐩𝐚𝐫𝐭𝐢.....🏁", id, () => api.removeUserFromGroup(api.getCurrentUserID(), id))
		}
	
