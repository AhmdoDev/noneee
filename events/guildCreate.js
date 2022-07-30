const { MessageEmbed } = require('discord.js')

module.exports = {
	once: true,
	execute(client, guild, db) {
		const newguild = new MessageEmbed
		
		if(!guild.me.permissions.has("ADMINISTRATOR")) {
			guild.owner.send({embeds: [newguild().setTitle(`:x: Error Occured!`).setDescription(`Due to invalid permissions I'm unable to configure my settings in your server!`).addField(`Database:`, `Can't add ${guild.name} in my database :(`).addField(`Prefix:`, `Unable to add my prefix! [${process.env.token}]`)]})
			guild.leave()
		} else {
			guild.channels.create(`${client.user.username}`, {type: "text"}).then(channel => {
				channel.send({embeds: [newguild().setTitle(`${client.user.username} Added!`).setDescription(`Hey! nice to meet you. I'm ${client.user.username} a multipurpose bot to help you and your members enjoy action, play games, battle out, and more!`).addField(`Functions:`, `\`#~\` Easy to use commands\n\`#~\` Manage your Server professionally\n\`#~\`Open Source [SOON]!\n\`#~\`More comming Soon!!`)]})
				db.set(`prefix_${guild.id}`, `${process.env.token}`)
			})
	
		}
	},
};