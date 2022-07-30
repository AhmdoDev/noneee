const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `announce`, 
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

            if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply({embeds: [errembed(`You don't have \`ADMINISTRATOR\` permission to run this command!`)]})

        const prefix = await db.get(`prefix_${message.guild.id}`)
        const announcemsg = message.content.split(`${prefix}announce `)[1]

        if(!announcemsg) return message.reply({embeds: [errembed(`Announce a message of your choice.`).addField(`Usage:`, `${prefix}announce [Message]`).addField(`Examples:`, `${prefix}announce Added <@!${client.user.id}> to help making moderation easier!`).setTitle(`📢 Announce command!`)]});
        const embed = new MessageEmbed()
        .setTitle("📢 New Announcement!")
        .setDescription(`${announcemsg}`)
        .setAuthor({name: `${message.author.username}`, iconURL: `${message.author.avatarURL()}`})
        .setColor("BLURPLE")
        message.channel.send({embeds: [embed]})
        message.delete()
    }
}