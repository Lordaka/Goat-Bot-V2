const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
	global.temp.welcomeEvent = {};

module.exports = {
	config: {
		name: "welcome",
		version: "1.7",
		author: "NTKhang",
		category: "events"
	},

	langs: {
		vi: {
			session1: "sáng",
			session2: "trưa",
			session3: "chiều",
			session4: "tối",
			welcomeMessage: "Cảm ơn bạn đã mời tôi vào nhóm!\nPrefix bot: %1\nĐể xem danh sách lệnh hãy nhập: %1help",
			multiple1: "bạn",
			multiple2: "các bạn",
			defaultWelcomeMessage: "Xin chào {userName}.\nChào mừng bạn đến với {boxName}.\nChúc bạn có buổi {session} vui vẻ!"
		},
		en: {
			session1: "𝐦𝐨𝐫𝐧𝐢𝐧𝐠",
			session2: "𝐧𝐨𝐨𝐧",
			session3: "𝐚𝐟𝐭𝐞𝐫𝐧𝐨𝐨𝐧",
			session4: "𝐞𝐯𝐞𝐧𝐢𝐧𝐠",
			welcomeMessage: "🔖 𝐌𝐞𝐫𝐜𝐢 𝐩𝐨𝐮𝐫 𝐥'𝐢𝐧𝐯𝐢𝐭 𝐝𝐚𝐧𝐬 𝐯𝐨𝐭𝐫𝐞 𝐠𝐫𝐨𝐮𝐩𝐞!\n𝐌𝐨𝐧 𝐩𝐫𝐞𝐟𝐢𝐱 𝐞𝐬𝐭: 『%1』\n𝐏𝐨𝐮𝐫 𝐯𝐨𝐢𝐫 𝐦𝐞𝐬 𝐜𝐦𝐝𝐬, 𝐬𝐭𝐩 𝐭𝐚𝐩𝐞́: %1𝐡𝐞𝐥𝐩",
			multiple1: "𝐦𝐞𝐜",
			multiple2: "𝐲𝐨 𝐦𝐞𝐮𝐟",
			defaultWelcomeMessage: ` 🔖 𝐒𝐚𝐥𝐮𝐭  {userName}.\n𝐁𝐢𝐞𝐧𝐯𝐞𝐧𝐮 (𝐞𝐬)  {multiple} 𝐝𝐚𝐧𝐬 𝐧𝐨̂𝐭𝐫𝐞 𝐠𝐫𝐨𝐮𝐩𝐞: {boxName}\n𝐏𝐚𝐬𝐬𝐞́𝐞 𝐮𝐧𝐞 𝐦𝐚𝐠𝐧𝐢𝐟𝐢𝐪𝐮𝐞 𝐣𝐨𝐮𝐫𝐧𝐞́𝐞 😊🔮`
		}
	},

	onStart: async ({ threadsData, message, event, api, getLang }) => {
		if (event.logMessageType == "log:subscribe")
			return async function () {
				const hours = getTime("HH");
				const { threadID } = event;
				const { nickNameBot } = global.GoatBot.config;
				const prefix = global.utils.getPrefix(threadID);
				const dataAddedParticipants = event.logMessageData.addedParticipants;
				// if new member is bot
				if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
					if (nickNameBot)
						api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
					return message.send(getLang("welcomeMessage", prefix));
				}
				// if new member:
				if (!global.temp.welcomeEvent[threadID])
					global.temp.welcomeEvent[threadID] = {
						joinTimeout: null,
						dataAddedParticipants: []
					};

				// push new member to array
				global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);
				// if timeout is set, clear it
				clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

				// set new timeout
				global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
					const threadData = await threadsData.get(threadID);
					if (threadData.settings.sendWelcomeMessage == false)
						return;
					const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
					const dataBanned = threadData.data.banned_ban || [];
					const threadName = threadData.threadName;
					const userName = [],
						mentions = [];
					let multiple = false;

					if (dataAddedParticipants.length > 1)
						multiple = true;

					for (const user of dataAddedParticipants) {
						if (dataBanned.some((item) => item.id == user.userFbId))
							continue;
						userName.push(user.fullName);
						mentions.push({
							tag: user.fullName,
							id: user.userFbId
						});
					}
					// {userName}:   name of new member
					// {multiple}:
					// {boxName}:    name of group
					// {threadName}: name of group
					// {session}:    session of day
					if (userName.length == 0) return;
					let { welcomeMessage = getLang("defaultWelcomeMessage") } =
						threadData.data;
					const form = {
						mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null
					};
					welcomeMessage = welcomeMessage
						.replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
						.replace(/\{boxName\}|\{threadName\}/g, threadName)
						.replace(
							/\{multiple\}/g,
							multiple ? getLang("multiple2") : getLang("multiple1")
						)
						.replace(
							/\{session\}/g,
							hours <= 10
								? getLang("session1")
								: hours <= 12
									? getLang("session2")
									: hours <= 18
										? getLang("session3")
										: getLang("session4")
						);

					form.body = welcomeMessage;

					if (threadData.data.welcomeAttachment) {
						const files = threadData.data.welcomeAttachment;
						const attachments = files.reduce((acc, file) => {
							acc.push(drive.getFile(file, "stream"));
							return acc;
						}, []);
						form.attachment = (await Promise.allSettled(attachments))
							.filter(({ status }) => status == "fulfilled")
							.map(({ value }) => value);
					}
					message.send(form);
					delete global.temp.welcomeEvent[threadID];
				}, 1500);
			};
	}
};
