const { MessageEmbed } = require("discord.js")
const moment = require(`moment`)

module.exports = {
    name: `user`, 
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

            const member = message.guild.members.cache.get(args[1]) || message.mentions.members.first() || message.member

            const embed = new MessageEmbed()
            .setThumbnail(`${member.user.avatarURL()}`)
            .addField(`Joined Discord:`, `** <t:${Math.floor(member.user.createdTimestamp / 1000) + 1}:R> **`, true)
            .addField(`Joined Server:`, `** <t:${Math.floor(member.joinedTimestamp / 1000) + 1}:R> **`, true)
            .setFooter({text: `${member.user.tag}`, iconURL: `${member.user.avatarURL()}`})
            .setColor("RANDOM")
            message.reply({embeds: [embed]})
    }
}