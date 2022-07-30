const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `set-autoline`, 
    description: `Disables or enables the autoline!`,

    async run(client, message, args, db) {
        function errembed(description) {
            const noembed = new MessageEmbed()
            .setTitle(':x: Error occured')
            .setDescription(`${description}`)
            .setColor("BLURPLE")
            .setFooter({text: `${client.user.username}`, iconURL: `${client.user.avatarURL()}`})
            return noembed
            }
            const truefalse = `${args[1]}`.toLowerCase()
        const prefix = await db.get(`prefix_${message.guild.id}`)
        if(!truefalse) return message.reply({embeds: [errembed(`Disables or enables the autoline function!`).setTitle(`🔗 Auto-line command!`).addField(`Usage:`, `${prefix}set-autoline [On/Off]`).addField(`Examples:`, `${prefix}set-autoline on\n${prefix}set-autoline off`)]})
        if(truefalse === `on`) {
            await db.set(`autoline_${message.guild.id}`, `${truefalse}`)
        message.reply(`**✅ Done set autoline to \`${truefalse}\`**`)
        }
        if(truefalse === `off`) {
            await db.set(`autoline_${message.guild.id}`, `${truefalse}`)
            message.reply(`**✅ Done set autoline to \`${truefalse}\`**`)
        }
        else return message.reply({embeds: [errembed(`Disables or enables the autoline function!`).setTitle(`🔗 Auto-line command!`).addField(`Usage:`, `${prefix}set-autoline [On/Off]`).addField(`Examples:`, `${prefix}set-autoline **on**\n${prefix}set-autoline **off**`)]})
    }
}