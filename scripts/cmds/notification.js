const { getStreamsFromAttachment } = global.utils;

module.exports = {
	config: {
		name: "notification",
		aliases: ["notify", "noti"],
		version: "1.7",
		author: "NTKhang",
		countDown: 5,
		role: 2,
		description: {
			vi: "Gửi thông báo từ admin đến all box",
			en: "Send notification from admin to all box"
		},
		category: "owner",
		guide: {
			en: "{pn} <tin nhắn>"
		},
		envConfig: {
			delayPerGroup: 250
		}
	},

	langs: {
		vi: {
			missingMessage: "Vui lòng nhập tin nhắn bạn muốn gửi đến tất cả các nhóm",
			notification: "Thông báo từ admin bot đến tất cả nhóm chat (không phản hồi tin nhắn này)",
			sendingNotification: "Bắt đầu gửi thông báo từ admin bot đến %1 nhóm chat",
			sentNotification: "✅ Đã gửi thông báo đến %1 nhóm thành công",
			errorSendingNotification: "Có lỗi xảy ra khi gửi đến %1 nhóm:\n%2"
		},
		en: {
			missingMessage: "➬📜|𝐄𝐧𝐭𝐫𝐞 𝐮𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐩𝐨𝐮𝐫 𝐞𝐧𝐯𝐨𝐢𝐞𝐬 𝐝𝐚𝐧𝐬 𝐝𝐞𝐬 𝐠𝐫𝐨𝐮𝐩𝐞𝐬 ✨",
			notification: "웃➣✨『𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡』シ",
			sendingNotification: " 𝐥𝐚 𝐧𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐚 𝐞𝐭𝐞 𝐞𝐧𝐯𝐨𝐢𝐞 𝐝𝐚𝐧𝐬 ✨%1✨ 𝐠𝐫𝐨𝐮𝐩𝐞𝐬",
			sentNotification: "✅ 𝐥𝐚 𝐧𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐞𝐧𝐯𝐨𝐲𝐞́ 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜𝐞̀𝐬 𝐝𝐚𝐧𝐬 🍁%1🍁 𝐠𝐫𝐨𝐮𝐩𝐞𝐬",
			errorSendingNotification: "𝐄𝐫𝐫𝐞𝐮𝐫 𝐝𝐮 𝐞𝐧𝐯𝐨𝐢𝐞 𝐝𝐞 𝐥𝐚 𝐧𝐨𝐭𝐢𝐟𝐢𝐜𝐚𝐭𝐢𝐨𝐧 𝐝𝐚𝐧𝐬 💦%1💦 𝐠𝐫𝐨𝐮𝐩𝐞𝐬:\n%2"
		}
	},

	onStart: async function ({ message, api, event, args, commandName, envCommands, threadsData, getLang }) {
		const { delayPerGroup } = envCommands[commandName];
		if (!args[0])
			return message.reply(getLang("missingMessage"));
		const formSend = {
			body: `${getLang("notification")}\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n${args.join(" ")}\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏
			attachment: await getStreamsFromAttachment(
				[
					...event.attachments,
					...(event.messageReply?.attachments || [])
				].filter(item => ["photo", "png", "animated_image", "video", "audio"].includes(item.type))
			)
		};

		const allThreadID = (await threadsData.getAll()).filter(t => t.isGroup && t.members.find(m => m.userID == api.getCurrentUserID())?.inGroup);
		message.reply(getLang("sendingNotification", allThreadID.length));

		let sendSucces = 0;
		const sendError = [];
		const wattingSend = [];

		for (const thread of allThreadID) {
			const tid = thread.threadID;
			try {
				wattingSend.push({
					threadID: tid,
					pending: api.sendMessage(formSend, tid)
				});
				await new Promise(resolve => setTimeout(resolve, delayPerGroup));
			}
			catch (e) {
				sendError.push(tid);
			}
		}

		for (const sended of wattingSend) {
			try {
				await sended.pending;
				sendSucces++;
			}
			catch (e) {
				const { errorDescription } = e;
				if (!sendError.some(item => item.errorDescription == errorDescription))
					sendError.push({
						threadIDs: [sended.threadID],
						errorDescription
					});
				else
					sendError.find(item => item.errorDescription == errorDescription).threadIDs.push(sended.threadID);
			}
		}

		let msg = "";
		if (sendSucces > 0)
			msg += getLang("sentNotification", sendSucces) + "\n";
		if (sendError.length > 0)
			msg += getLang("errorSendingNotification", sendError.reduce((a, b) => a + b.threadIDs.length, 0), sendError.reduce((a, b) => a + `\n - ${b.errorDescription}\n  + ${b.threadIDs.join("\n  + ")}`, ""));
		message.reply(msg);
	}
};
