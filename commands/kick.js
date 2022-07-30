const { MessageEmbed, Permissions } = require("discord.js")

module.exports = {
    name: `kick`, 
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
            if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply({embeds: [errembed(`You do not have the **\`KICK_MEMBERS\`** permission!`)]});
            const member = message.guild.members.cache.get(args[1]) || message.mentions.members.first()

            if(!member) return message.reply({embeds: [errembed(`kicks a discord guild member.`).addField(`Usage:`, `${prefix}kick [member] (reason)`).addField(`Examples:`, `${prefix}kick ${message.author}\n${prefix}kick ${message.author.id}\n${prefix}kick ${message.author} Toxic`).setTitle(`🤚🏻 kick command!`)]});
        if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply({embeds: [errembed(`I'm unable due to ${member.displayName} having a higher role than you!`)]})
        if(member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply({embeds: [errembed(`I'm unable due to ${member.displayName} having a higher role than me!`)]})
        if(!member.kickable) return message.reply({embeds: [errembed(`You can't kick the owner bruhh..`)]})
        let reason = `${args[2]}` || `none`
        try {
            member.kick(`${reason}`)
            message.reply({embeds: [errembed(`Successfully kicked @**${member.user.tag}** due to **${args[2] || `no reason specified.`}**`).setTitle(`🤚🏻 Kicked member!`)]})
        } catch (err) {
            message.reply({embeds: [errembed(`An error occured when trying to ban ${member.displayName}!`)]})
        }
    }
}