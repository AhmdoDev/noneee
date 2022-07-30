const { MessageEmbed, Permissions } = require("discord.js")

module.exports = {
    name: `id`, 
    async run(client, message, args, db) {
        function errembed(description) {
            const noembed = new MessageEmbed()
            .setTitle(':x: Error occured')
            .setDescription(`${description}`)
            .setColor("BLURPLE")
            .setFooter({text: `${client.user.username}`, iconURL: `${client.user.avatarURL()}`})
            return noembed
            }

            if(!message.mentions.members.first()) return message.reply({embeds: [errembed(`Please mention a member to get their id.`)]})
            else {
                message.reply(`**${await (message.mentions.members.first()).displayName}'s id:** \`\`\`${(await message.mentions.members.first()).id}\`\`\``)
            }
    }
}