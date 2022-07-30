const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `avatar`, 
    description: `Gives the avatar of a user.`,

    async run(client, message, args) {
        const member = client.users.cache.get(args[1]) || message.mentions.users.first() || message.author

        const embed = new MessageEmbed()
        .setTitle(`Image URL`)
        .setURL(await member.avatarURL() + `?size=1024`)
        .setImage(await member.avatarURL() + `?size=1024`)
        .setAuthor({name: `${member.tag}`, iconURL: `${await member.avatarURL()}`})
        .setFooter({text: `Requested by ${message.author.tag}`, iconURL: `${await message.author.avatarURL()}`})

        message.reply({embeds: [embed]})
    }
}