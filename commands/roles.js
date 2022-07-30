const { MessageEmbed, Message } = require("discord.js")


module.exports = {
    name: `roles`, 
    description: `Changes the bot prefix.`,

    async run(client, message, args, db) {
        function errembed(description) {
            const noembed = new MessageEmbed()
            .setTitle(':x: Error occured')
            .setDescription(`${description}`)
            .setColor("BLURPLE")
            .setFooter({text: `${client.user.username}`, iconURL: `${client.user.avatarURL()}`})
            return noembed
            }
            const embed = new MessageEmbed()
            .setTitle(`${message.guild.name} roles:`)
           message.guild.roles.cache.forEach((role) => {
            embed.addField(`${role.name}:`,`**Id**: ${role.id},\n**Mentionable**: ${role.mentionable},\n**Members**: ${role.members.size},\n**Position:** ${role.rawPosition}, **HexColor:** #${role.color}`, true)
           })

           message.reply({embeds: [embed]})
    }
}