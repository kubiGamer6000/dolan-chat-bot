const Discord = require('discord.js');
const wash = require('washyourmouthoutwithsoap');
const bot = new Discord.Client();

bot.on('message', async (msg) => {
	if (msg.author.bot) return;
	if (wash.check('en', msg.content) || wash.check('bg', msg.content)) {
		const reply = await msg.channel.send(`<@${msg.author.id}> No swearing!`);
		msg.delete();
		setTimeout(() => {
			reply.delete();
		}, 5000);
	} else if (msg.content.startsWith('-purge') && msg.member.roles.cache.find((r) => r.name === 'Staff')) {
		if (msg.content.length < 8) msg.channel.send('Not enough arguments');
		else {
			try {
				await msg.channel.bulkDelete(parseInt(msg.content.slice(7), 10));
			} catch (e) {
				msg.channel.send('Wrong input by user');
			}
		}
	}
});

bot.login(process.env.BOT_TOKEN);
