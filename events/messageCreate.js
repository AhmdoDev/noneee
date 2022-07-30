const { MessageEmbed } = require('discord.js')

module.exports = {
	once: false,
	async execute(message, db, client) {
		if(message.author.bot) return;
		const channs = await db.get(`${message.guild.id}_channels`)
		const autolinevalid = await db.get(`autoline_${message.guild.id}`)
		if(!channs || !autolinevalid || autolinevalid == `off`) return;
		if(!channs.includes(`${message.channel.id}`)) return;
		else {
			const line = await db.get(`line_${message.channel.id}`)
			message.channel.send(`${line}`)
		}
	},
};