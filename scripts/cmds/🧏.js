module.exports = {
    config: {
        name: "🧏",
        version: "1.0",
        author: "ʬɸʬ Blåzė Nøvã ʬɸʬ",
        countDown: 5,
        role: 0,
        shortDescription: "sarcasm",
        longDescription: "sarcasm",
        category: "reply",
    },
    onStart: async function(){}, 
    onChat: async function({
        event,
        message,
        getLang
    }) {
        if (event.body && event.body.toLowerCase() == "🧏") return message.reply("𝑓𝑎𝑢𝑡 𝑗𝑎𝑚𝑎𝑖𝑠 𝑣𝑜𝑙𝑒𝑟 𝑙𝑎 𝑛𝑜𝑢𝑟𝑟𝑖𝑡𝑢𝑟𝑒 𝑑𝑎𝑛𝑠 𝑙𝑎 𝐦𝑎𝑟𝑚𝐢𝑡𝑒 𝐝𝑒 𝑣𝑜𝑠 𝐦𝑒̀𝑟𝑒𝑠 𝑙𝑒𝑠 𝑔𝑎𝑟𝑠 🧏");
    }
      }
