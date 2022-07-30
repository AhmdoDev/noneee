const { MessageEmbed, Permissions } = require("discord.js")

module.exports = {
    name: `hide`, 
    async run(client, message, args, db) {
        function errembed(description) {
            const noembed = new MessageEmbed()
            .setTitle(':x: Error occured')
            .setDescription(`${description}`)
            .setColor("BLURPLE")
            .setFooter({text: `${client.user.username}`, iconURL: `${client.user.avatarURL()}`})
            return noembed
            }
        
            if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply({embeds: [errembed(`You do not have the **\`MANAGE_CHANNELS\`** permission!`)]})

            const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel

            try {
                if(!channel.permissionsFor(message.guild.roles.everyone).has("VIEW_CHANNEL")){ 
                    message.reply({embeds: [errembed(`This channel is already hidden!`)]}).then((msg) => {
                        setTimeout(() => {
                            message.delete()
                            msg.delete()
                        }, 3000)
                    })
                } else {
                    channel.permissionOverwrites.create(channel.guild.roles.everyone, { VIEW_CHANNEL: false }).then(() => {
                        message.reply(`**🔓 <#${channel.id}> has been hidden!**`)
                })
                }
            } catch (err) {
                message.reply(`**:x: I'm unable to hide this channel!**`)
            }

    }
}