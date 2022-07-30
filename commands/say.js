const { MessageEmbed } = require("discord.js")


module.exports = {
    name: `say`, 
    description: `Shows the bot ping and latency.`,

    async run(client, message, args, db) {
        function errembed(description) {
            const noembed = new MessageEmbed()
            .setTitle(':x: Error occured')
            .setDescription(`${description}`)
            .setColor("BLURPLE")
            .setFooter({text: `${client.user.username}`, iconURL: `${client.user.avatarURL()}`})
            return noembed
            }

        const prefix = await db.get(`prefix_${message.guild.id}`)
        const saymsg = message.content.split(`${prefix}say `)[1]
        if(!saymsg) return message.reply({embeds: [errembed(`Send's a message of your desire by **@${client.user.tag}**'s `).setTitle(`🗣 Say command!`).addField(`Usage:`, `${prefix}say [Message]`).addField(`Example:`, `${prefix}say Hey, I'm a bot lol.`)]})
        message.channel.send(`${saymsg}`)
        message.delete()
    }
}