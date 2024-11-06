 module.exports = {
  config: {
    name: "upt",
    aliases: ["up"],
    version: "1.0",
    author: "Ronald",
    role: 2,
    shortDescription: {
      en: "Displays the total number of users of the bot and check uptime "
    },
    longDescription: {
      en: "Displays the total number of users who have interacted with the bot and check uptime."
    },
    category: "system",
    guide: {
      en: "Use {p}totalusers to display the total number of users of the bot and check uptime."
    }
  },
  onStart: async function ({ api, event, args, usersData, threadsData }) {
    try {
      const allUsers = await usersData.getAll();
      const allThreads = await threadsData.getAll();
      const uptime = process.uptime();
      
const days = 
Math.floor(uptime / (3600 * 24));
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      
      const uptimeString = `${month}𝐌𝐨𝐢𝐬 ♱ ${days}𝐣𝐨𝐮𝐫𝐬 ♱ ${hours}𝐡𝐞𝐮𝐫𝐞𝐬 ♱ ${minutes}𝐦𝐢𝐧𝐮𝐭𝐞𝐬 ♱ ${seconds}𝐬𝐞𝐜𝐨𝐧𝐝𝐞𝐬`;
      
      api.sendMessage(`[⌛] 𝙏𝙞𝙢𝙚\n\n✪➩ ${uptimeString}\n
[👨🏽‍🦱] 𝙉𝙪𝙢𝙗𝙚𝙧 𝙛𝙤𝙧 𝙪𝙨𝙚𝙧𝙨\n\n✪➩ ${allUsers.length}\n
[💬] 𝙉𝙪𝙢𝙗𝙚𝙧 𝙛𝙤𝙧 𝙙𝙞𝙨𝙘𝙪𝙨𝙨𝙞𝙤𝙣\n\n✪➩ ${allThreads.length}`, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while retrieving data.", event.threadID);
    }
  }
};
