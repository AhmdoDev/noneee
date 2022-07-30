const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `unban`, 
    description: `✈ Unbans a member`,

    async run(client, message, args, db) {
        function errembed(description) {
            const noembed = new MessageEmbed()
            .setTitle(':x: Error occured')
            .setDescription(`${description}`)
            .setColor("BLURPLE")
            .setFooter({text: `${client.user.username}`, iconURL: `${client.user.avatarURL()}`})
            return noembed
            }
        

        if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply({embeds: [errembed(`You do not have **\`BAN_MEMBERS\`** permission!`)]}).then(async msg => { setTimeout(() => { msg.delete(); message.delete() }, 3000) })
        
        if(!args[1]) return message.reply({embeds: [errembed(`Please provide a user to unban!`)]})
        const bans = await message.guild.bans.fetch()
        const member = bans.get(`${args[1]}`)

        if(!member) return message.reply({embeds: [errembed(`I can't find (**${args[1]}**) in \`${message.guild.name}\` ban list!`)]})

        const reason = args[2] || `no reason specified`
        try {
        message.guild.members.unban(member.user.id, reason)

        message.reply({embeds: [errembed(`Successfully unbanned ${member.user.username} from ${message.guild.name}\nBan reason: **${member.reason}**\nUnban Reason: ${reason}`).setTitle(`✈ Unbanned member!`)]})
        } catch (err) {
            message.reply({embeds: [errembed(`An error has occured when unbanning ${member.user.username}`)]})
        }
    }
}