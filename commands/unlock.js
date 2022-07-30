const { MessageEmbed, Permissions } = require("discord.js")

module.exports = {
    name: `unlock`, 
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
                if(channel.permissionsFor(message.guild.roles.everyone).has("SEND_MESSAGES")){ 
                    message.reply({embeds: [errembed(`This channel is already unlocked!`)]}).then((msg) => {
                        setTimeout(() => {
                            message.delete()
                            msg.delete()
                        }, 3000)
                    })
                } else {
                    channel.permissionOverwrites.create(channel.guild.roles.everyone, { SEND_MESSAGES: true }).then(() => {
                        message.reply(`**🔓 <#${channel.id}> has been unlocked!**`)
                })
                }
            } catch (err) {
                message.reply(`**:x: I'm unable to unlock this channel!**`)
            }

    }
}