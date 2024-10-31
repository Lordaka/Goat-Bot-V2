const { getStreamsFromAttachment, log } = global.utils;
const mediaTypes = ["photo", 'png', "animated_image", "video", "audio"];

module.exports = {
	config: {
		name: "callad",
		version: "1.7",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			vi: "gửi báo cáo, góp ý, báo lỗi,... của bạn về admin bot",
			en: "send report, feedback, bug,... to admin bot"
		},
		category: "contacts admin",
		guide: {
			vi: "   {pn} <tin nhắn>",
			en: "   {pn} <message>"
		}
	},

	langs: {
		vi: {
			missingMessage: "Vui lòng nhập tin nhắn bạn muốn gửi về admin",
			sendByGroup: "\n- Được gửi từ nhóm: %1\n- Thread ID: %2",
			sendByUser: "\n- Được gửi từ người dùng",
			content: "\n\nNội dung:\n─────────────────\n%1\n─────────────────\nPhản hồi tin nhắn này để gửi tin nhắn về người dùng",
			success: "Đã gửi tin nhắn của bạn về %1 admin thành công!\n%2",
			failed: "Đã có lỗi xảy ra khi gửi tin nhắn của bạn về %1 admin\n%2\nKiểm tra console để biết thêm chi tiết",
			reply: "📍 Phản hồi từ admin %1:\n─────────────────\n%2\n─────────────────\nPhản hồi tin nhắn này để tiếp tục gửi tin nhắn về admin",
			replySuccess: "Đã gửi phản hồi của bạn về admin thành công!",
			feedback: "📝 Phản hồi từ người dùng %1:\n- User ID: %2%3\n\nNội dung:\n─────────────────\n%4\n─────────────────\nPhản hồi tin nhắn này để gửi tin nhắn về người dùng",
			replyUserSuccess: "Đã gửi phản hồi của bạn về người dùng thành công!",
			noAdmin: "Hiện tại bot chưa có admin nào"
		},
		en: {
			missingMessage:"🔖| 𝐬𝐭𝐩 𝐞́𝐜𝐫𝐢𝐭 𝐭𝐨𝐧 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐝𝐞𝐬𝐭𝐢𝐧𝐞́ 𝐚̀ 𝐥'𝐚𝐝𝐦𝐢𝐧.",
			sendByGroup: "\n- Sent from group: %1\n- Thread ID: %2",
			sendByUser: "\n- Sent from user",
			content: "\n\nContent:\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n%1\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n📜| 𝐕𝐞𝐮𝐢𝐥𝐥𝐞𝐳 𝐫𝐞́𝐩𝐨𝐧𝐝𝐫𝐞 𝐚𝐮 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐩𝐨𝐮𝐫 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐞 𝐚̀ 𝐝𝐢𝐬𝐜𝐮𝐭𝐞 𝐚𝐯𝐞𝐜 𝑙'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫",
			success: "🏂| 𝐥𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐞𝐬𝐭 𝐩𝐚𝐫𝐯𝐞𝐧𝐮 𝐚̀ 🔖%1🔖  𝐚𝐝𝐦𝐢𝐧 (𝐬) 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜𝐞̀𝐬!\n%2",
			failed: "⚠️ |𝐮𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐬𝐞 𝐩𝐫𝐨𝐝𝐮𝐢𝐭𝐞 𝐥'𝐡𝐨𝐫𝐬 𝐝𝐞 𝐥'𝐞𝐧𝐯𝐨𝐢𝐞 𝐝𝐞 𝐯𝐨𝐭𝐫𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝐬 𝐚̀ 🏷️%1🏷️ 𝐚𝐝𝐦𝐢𝐧 (𝐬)\n%2\n 𝐯𝐞́𝐫𝐢𝐟𝐢𝐞𝐫𝐚 𝐯𝐨̂𝐭𝐫𝐞 𝐜𝐨𝐧𝐬𝐨𝐥𝐞 𝐩𝐨𝐮𝐫 𝐫𝐞̀𝐠𝐥𝐞𝐬 𝐜𝐞 𝐝𝐞́𝐭𝐚𝐢𝐥 ",
			reply: "🍁| 𝐫𝐞́𝐩𝐨𝐧𝐬𝐞 𝐝𝐞 𝐥'𝐚𝐝𝐦𝐢𝐧 %1:\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n%2\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n 📓|𝐕𝐞𝐮𝐢𝐥𝐥𝐞𝐳 𝐫𝐞́𝐩𝐨𝐧𝐝𝐫𝐞 𝐚𝐮 𝐦𝐞𝐬𝐬𝐚𝐠𝐞𝑒 𝐩𝐨𝐮𝐫𝑟 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐞 𝐥𝐚 𝐜𝐨𝐧𝐯𝐞𝐧𝐭𝐢𝐨𝐧 𝐚𝐯𝐞𝐜𝑒𝑐 𝑙'𝐚𝐝𝐦𝐢𝐧",
			replySuccess: "💌| 𝐥𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐚 𝐞́𝐭𝐞́ 𝐞𝐧𝐯𝐨𝐲𝐞́ 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜𝐞̀𝐬 !",
			feedback: "📜|𝐥𝐞 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐝'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 %1:\n- User ID: %2%3\n\nContent:\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n%4\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n🏌️|𝐕𝐞𝐮𝐢𝐥𝐥𝐞𝐳 𝐫𝐞́𝐩𝐨𝐧𝐝 𝐚𝐮 𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐩𝐨𝐮𝐫 𝐫𝐞́𝐩𝐨𝐧𝐝𝐫𝐞 𝐚̀ 𝐥'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫",
			replyUserSuccess: " 🔮|  𝐦𝐞𝐬𝐬𝐚𝐠𝐞 𝐞𝐧𝐯𝐨𝐲𝐞́ 𝐚𝐯𝐞𝐜 𝐬𝐮𝐜𝐜𝐞̀𝐬 𝐚̀ 𝐥'𝐮𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫 ",
			noAdmin: "𝐁𝐨𝐭 𝐡𝐚𝐬 𝐧𝐨 𝐚𝐝𝐦𝐢𝐧 𝐚𝐭 𝐭𝐡𝐞 𝐦𝐨𝐦𝐞𝐧𝐭"
		}
	},

	onStart: async function ({ args, message, event, usersData, threadsData, api, commandName, getLang }) {
		const { config } = global.GoatBot;
		if (!args[0])
			return message.reply(getLang("missingMessage"));
		const { senderID, threadID, isGroup } = event;
		if (config.adminBot.length == 0)
			return message.reply(getLang("noAdmin"));
		const senderName = await usersData.getName(senderID);
		const msg = "📬𝐂𝐀𝐋𝐋📩𝐍𝐎𝐕𝐀📤"
			+ `\n- User Name: ${senderName}`
			+ `\n- User ID: ${senderID}`
			+ (isGroup ? getLang("sendByGroup", (await threadsData.get(threadID)).threadName, threadID) : getLang("sendByUser"));

		const formMessage = {
			body: msg + getLang("content", args.join(" ")),
			mentions: [{
				id: senderID,
				tag: senderName
			}],
			attachment: await getStreamsFromAttachment(
				[...event.attachments, ...(event.messageReply?.attachments || [])]
					.filter(item => mediaTypes.includes(item.type))
			)
		};

		const successIDs = [];
		const failedIDs = [];
		const adminNames = await Promise.all(config.adminBot.map(async item => ({
			id: item,
			name: await usersData.getName(item)
		})));

		for (const uid of config.adminBot) {
			try {
				const messageSend = await api.sendMessage(formMessage, uid);
				successIDs.push(uid);
				global.GoatBot.onReply.set(messageSend.messageID, {
					commandName,
					messageID: messageSend.messageID,
					threadID,
					messageIDSender: event.messageID,
					type: "userCallAdmin"
				});
			}
			catch (err) {
				failedIDs.push({
					adminID: uid,
					error: err
				});
			}
		}

		let msg2 = "";
		if (successIDs.length > 0)
			msg2 += getLang("success", successIDs.length,
				adminNames.filter(item => successIDs.includes(item.id)).map(item => ` <@${item.id}> (${item.name})`).join("\n")
			);
		if (failedIDs.length > 0) {
			msg2 += getLang("failed", failedIDs.length,
				failedIDs.map(item => ` <@${item.adminID}> (${adminNames.find(item2 => item2.id == item.adminID)?.name || item.adminID})`).join("\n")
			);
			log.err("CALL ADMIN", failedIDs);
		}
		return message.reply({
			body: msg2,
			mentions: adminNames.map(item => ({
				id: item.id,
				tag: item.name
			}))
		});
	},

	onReply: async ({ args, event, api, message, Reply, usersData, commandName, getLang }) => {
		const { type, threadID, messageIDSender } = Reply;
		const senderName = await usersData.getName(event.senderID);
		const { isGroup } = event;

		switch (type) {
			case "userCallAdmin": {
				const formMessage = {
					body: getLang("reply", senderName, args.join(" ")),
					mentions: [{
						id: event.senderID,
						tag: senderName
					}],
					attachment: await getStreamsFromAttachment(
						event.attachments.filter(item => mediaTypes.includes(item.type))
					)
				};

				api.sendMessage(formMessage, threadID, (err, info) => {
					if (err)
						return message.err(err);
					message.reply(getLang("replyUserSuccess"));
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						messageIDSender: event.messageID,
						threadID: event.threadID,
						type: "adminReply"
					});
				}, messageIDSender);
				break;
			}
			case "adminReply": {
				let sendByGroup = "";
				if (isGroup) {
					const { threadName } = await api.getThreadInfo(event.threadID);
					sendByGroup = getLang("sendByGroup", threadName, event.threadID);
				}
				const formMessage = {
					body: getLang("feedback", senderName, event.senderID, sendByGroup, args.join(" ")),
					mentions: [{
						id: event.senderID,
						tag: senderName
					}],
					attachment: await getStreamsFromAttachment(
						event.attachments.filter(item => mediaTypes.includes(item.type))
					)
				};

				api.sendMessage(formMessage, threadID, (err, info) => {
					if (err)
						return message.err(err);
					message.reply(getLang("replySuccess"));
					global.GoatBot.onReply.set(info.messageID, {
						commandName,
						messageID: info.messageID,
						messageIDSender: event.messageID,
						threadID: event.threadID,
						type: "userCallAdmin"
					});
				}, messageIDSender);
				break;
			}
			default: {
				break;
			}
		}
	}
};
