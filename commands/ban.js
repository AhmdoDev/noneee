const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `ban`, 
    description: `✈ Bans a member.`,

    async run(client, message, args, db) {
        const prefix = await db.get(`prefix_${message.guild.id}`)
        function errembed(description) {
        const noembed = new MessageEmbed()
        .setTitle(':x: Error occured')
        .setDescription(`${description}`)
        .setColor("BLURPLE")
        .setFooter({text: `${client.user.username}`, iconURL: `${client.user.avatarURL()}`})
        return noembed
        }
        
        if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply({embeds: [errembed(`You do not have the **\`BAN_MEMBERS\`** permission!`)]});
        const member = message.guild.members.cache.get(args[1]) || message.mentions.members.first()
        const owner = (message.guild.members.cache.get(message.guild.ownerID))
        if(!member) return message.reply({embeds: [errembed(`Bans a discord guild member.`).addField(`Usage:`, `${prefix}ban [member] (reason)`).addField(`Examples:`, `${prefix}ban ${message.author}\n${prefix}ban ${message.author.id}\n${prefix}ban ${message.author} Toxic`).setTitle(`✈ Ban command!`)]});
        if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply({embeds: [errembed(`I'm unable due to ${member.displayName} having a higher role than you!`)]})
        if(member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply({embeds: [errembed(`I'm unable due to ${member.displayName} having a higher role than me!`)]})
        if(!member.bannable) return message.reply({embeds: [errembed(`You can't ban the owner bruhh..`)]})
        else {
            member.ban({reason: `${args[2] || `None`}`})
            message.reply({embeds: [errembed(`Successfully banned @**${member.user.tag}** due to **${args[2] || `no reason specified.`}**`).setTitle(`✈ Banned member!`)]})
        }

    }
}