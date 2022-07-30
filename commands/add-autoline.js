const { MessageEmbed } = require("discord.js")


module.exports = {
    name: `add-autoline`, 
    description: `Shows the bot ping and latency.`,

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

        if(!args[1] || !args[2]) return message.reply({embeds: [errembed(`Set's up the channel and image of auto-line`).setTitle(`🔗 add-autoline Command!`).addField(`Usage:`, `${prefix}add-autoline (channel) (link)`).addField(`Examples:`, `${prefix}add-autoline <#${message.channel.id}> [link](${client.user.avatarURL()})\n${prefix}add-autoline ${message.channel.id} [link](${client.user.avatarURL()})`)]})

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
        if(!channel) return message.reply({embeds: [errembed(`Set's up the channel and image of auto-line`).setTitle(`🔗 add-autoline Command!`).addField(`Usage:`, `${prefix}add-autoline (channel) (link)`).addField(`Examples:`, `${prefix}add-autoline <#${message.channel.id}> [link](${client.user.avatarURL()})\n${prefix}add-autoline ${message.channel.id} [link](${client.user.avatarURL()})`)]})

        await db.set(`${message.guild.id}_channels`, [])
        await db.push(`${message.guild.id}_channels`, `${channel.id}`)
        await db.set(`line_${channel.id}`, `${args[2]}`)

        message.reply(`**✅ Done setup <#${channel.id}> with link \`${args[2]}\`**`)
    }
}