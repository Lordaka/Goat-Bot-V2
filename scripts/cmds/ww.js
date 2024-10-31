const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "ww",
    aliases: ["warworld", "war"],
    version: "1.0",
    author: "Heinel",
    countDown: 5,
    role: 0,
    shortDescription: {
      id: "Perintah War World"
    },
    longDescription: {
      id: "Command untuk memulai pertempuran, memeriksa status, dan mengelola sumber daya perang Anda."
    },
    category: "game",
    guide: {
      id: `
      {pn} ww battle <targetID> - Mulai pertempuran dengan target tertentu
      {pn} ww stats - Periksa status perang Anda
      {pn} ww resources - Lihat dan kelola sumber daya perang Anda
      `
    }
  },

  onStart: async function ({ api, event, args }) {
    const userID = event.senderID;
    const dataPath = path.join(__dirname, 'data', 'warData.json');

    // Ensure data folder exists
    const dirPath = path.dirname(dataPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Ensure data file exists
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, JSON.stringify({}));
    }

    let warData = JSON.parse(fs.readFileSync(dataPath));

    // Ensure user data exists
    if (!warData[userID]) {
      warData[userID] = {
        hp: 100,
        attack: 10,
        defense: 5,
        resources: 50,
      };
      fs.writeFileSync(dataPath, JSON.stringify(warData, null, 2));
    }

    const subCommand = args[0];

    if (subCommand === "battle") {
      const targetID = args[1];
      if (!targetID) return api.sendMessage("⚠️ | Anda harus menentukan target untuk pertempuran.", event.threadID);

      // Ensure target data exists
      if (!warData[targetID]) {
        return api.sendMessage("⚠️ | Target tidak ditemukan.", event.threadID);
      }

      // Simulate battle
      const user = warData[userID];
      const target = warData[targetID];
      const userDamage = user.attack - target.defense;
      const targetDamage = target.attack - user.defense;

      // Update HP after battle
      warData[userID].hp -= targetDamage;
      warData[targetID].hp -= userDamage;

      fs.writeFileSync(dataPath, JSON.stringify(warData, null, 2));

      const battleResult = `
🔫 | Pertempuran dimulai!
- Anda menyebabkan ${userDamage} damage kepada target.
- Target menyebabkan ${targetDamage} damage kepada Anda.
- HP Anda sekarang: ${warData[userID].hp}
- HP target sekarang: ${warData[targetID].hp}
`;

      api.sendMessage(battleResult, event.threadID);

    } else if (subCommand === "stats") {
      const user = warData[userID];

      const statsMessage = `
📊 | Status perang Anda:
- HP: ${user.hp}
- Attack: ${user.attack}
- Defense: ${user.defense}
- Resources: ${user.resources}
`;

      api.sendMessage(statsMessage, event.threadID);

    } else if (subCommand === "resources") {
      const user = warData[userID];

      const resourcesMessage = `
💰 | Sumber daya perang Anda:
- Resources: ${user.resources}
`;

      api.sendMessage(resourcesMessage, event.threadID);

    } else {
      return api.sendMessage("⚠️ | Sub-command tidak valid. Gunakan 'battle', 'stats', atau 'resources'.", event.threadID);
    }
  }
};
