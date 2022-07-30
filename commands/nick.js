const { MessageEmbed, Permissions } = require("discord.js")

module.exports = {
    name: `nick`, 
    description: `Change your/a members nickname.`,

    async run(client, message, args) {
        try {
        function errembed(description) {
            const noembed = new  MessageEmbed()
            .setTitle(':x: Error occured')
            .setDescription(`${description}`)
            .setColor("BLURPLE")
            .setFooter({text: `${client.user.username}`, iconURL: `${client.user.avatarURL()}`})
            return noembed
            }
            const member = message.guild.members.cache.get(args[1]) ?? message.mentions.members.first()
                if(!member) {
                    const member = message.guild.members.cache.get(message.author.id)
                    if(!args[1]) return message.reply({embeds: [errembed(`Please specify what your nickname should be.`)] })
                    if(!message.member.permissions.has("CHANGE_NICKNAME")) return message.reply({embeds: [errembed(`You don't have the **\`CHANGE_NICKNAME\`** permission.`)]})
                    if(message.author.id === message.guild.ownerId) return message.reply({embeds: [errembed(`I'm unable to update your nickname, mostly because you have a higher role than me.`)]})
                    if(member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply({embeds: [errembed(`I'm unable to update your nickname, mostly because you have a higher role than me.`)]})
                    member.setNickname(`${args[1]}`)
                }
                else {
                    if(!message.member.permissions.has("MANAGE_NICKNAMES")) return message.reply({embeds: [errembed(`Please Make sure you have \`MANAGE_NICKNAMES\` permission when changing a users nickname.`)]})
                    if(member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply({embeds: [errembed(`I'm unable to update your nickname, mostly because **${member.displayName}** has a higher role than me.`)]})

                    if(!args[2]) {
                        member.setNickname(` `)
                        message.reply(`**✅ Reseted ${member.user.username} nickname!**`)
                    }
                    else {
                        member.setNickname(`${args[2]}`)
                        message.reply(`✅ **${member.displayName}**'s nick has been changed to \`${args[2]}\``)
                    }
                }
            } catch (err) {
                message.reply(`**:x: An error has occured, Please try again later or contact support for more help. Thanks!**`)

                // throw 
                const errchannel = client.channels.cache.get(`972537938292391986`)
        const embed = new MessageEmbed()
        .setTitle(`${err.name}`)
        .setDescription(`${err.message}`)

        console.error(err)

        errchannel.send({content: `<@&983976732216397844>`, embeds: [embed]})
        client.login(process.env.token)
        
            }
    }
}