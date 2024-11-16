 const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "OtinXShiva",
    countDown: 5,
    role: 0,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["100080355760429", "100090405019929"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("𝐟𝐚𝐮𝐭 𝐞̂𝐭𝐫𝐞 𝐜𝐨𝐧 𝐩𝐨𝐮𝐫 𝐨𝐬𝐞 𝐭𝐨𝐮𝐜𝐡𝐞 𝐚̀ 𝐜𝐞𝐭𝐭𝐞 𝐟𝐨𝐧𝐜𝐭𝐢𝐨𝐧... 😒🖕", event.threadID, event.messageID);
    }
    
    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("𝐁𝐚𝐥𝐚𝐧𝐜𝐞 𝐥𝐞 𝐧𝐚𝐦𝐞 𝐝𝐮 𝐟𝐢𝐜𝐡𝐢𝐞𝐫 ❔.", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`𝐃𝐞𝐬𝐨𝐥𝐞́ 𝐛𝐨𝐬𝐬 𝐜𝐞𝐭𝐭𝐞 𝐜𝐦𝐝 𝐧'𝐞𝐱𝐢𝐬𝐭𝐞 𝐩𝐚𝐬 𝐝𝐚𝐧𝐬 𝐦𝐞𝐬 𝐜𝐦𝐝𝐬 [❌]: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};
