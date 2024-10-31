const fs = require('fs');

module.exports = {
  config: {
    name: "prefix",
    version: "1.0",
    author: "𝐁𝐋𝐀𝐙𝐄𝐑 𝐍𝐎𝐕𝐀", // this cmd will expire if you change this credits (NEW VERSION)
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "system",
  },
 
  onStart: async function() {},
 
  onChat: async function({ event, message, getLang, api }) {
   const link = [
"https://i.ibb.co/94GF03N/image.jpg",
]
  let img =
link[Math.floor(Math.random()*link.length)]
    if (event.body) {
      const word = event.body.toLowerCase();
      switch (word) {
        case "prefix":
          const replies = [
            "╭━──━─≪✠≫─━──━╮\n🤍𝑃𝑅𝐸𝐹𝐼𝑋☣𝑁𝑂𝑉𝐴🤍\n            🩺✨¥✨🩺\n╰━──━─≪✠≫─━──━╯\n════•『🎗』•════\n🍂✨𝑀𝑌 𝐶𝑅𝐸𝐴𝑇𝑂𝑅𝑆✨🍂\n════•『🎗』•════\n╭━──━─≪✠≫─━──━╮\n彡☆𝗕𝗟𝗔𝗭𝗘皿𝗡𝗢𝗩𝗔☆彡\n╰━──━─≪✠≫─━──━╯",
          ];
          api.setMessageReaction("🤾", event.messageID, event.messageID, api); 
          const randomIndex = Math.floor(Math.random() * replies.length);
          message.reply({
            body: replies[randomIndex],
attachment: await global.utils.getStreamFromURL(img)})
          break;
        default:
          return; 
      }
    }
  },
};
