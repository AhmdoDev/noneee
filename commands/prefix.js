const { MessageEmbed, Message } = require("discord.js")


module.exports = {
    name: `prefix`, 
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
        const newpre = `${message.content.split(`prefix `)[1]}`
       const prefix = await db.get(`prefix_${message.guild.id}`)
        if(!args[1]) return message.reply({embeds: [errembed(`${message.guild.name}'s prefix is: \`${prefix}\``).setTitle(`❓ Your Prefix.`)]})
        if(newpre.length > 5) return message.reply(`**:x: Hey! my prefix can't be more than 5 or less than 1 :P!**`)
        if(newpre == await db.get(`prefix_${message.guild.id}`)) return message.reply(`**:x: Hey! Please define a new prefix.**`)
        if(newpre == `:`) return message.reply(`**:x: Sorry \`:\` can't be set as a prefix :P!**`)
        message.reply(`Changing your prefix, please wait..`).then(async(msg) => {
        await db.delete(`prefix_${message.guild.id}`)
        await db.set(`prefix_${message.guild.id}`, `${newpre}`)
        const dnchange = new MessageEmbed()
        .setTitle(`✅ New prefix`)
        .addField(`New Prefix:`, `Prefix is changed from ${prefix} to: **\`${await db.get(`prefix_${message.guild.id}`)}\`**`)
        .setColor("GREEN")

        msg.edit({content: `_ _`, embeds: [dnchange]})
        })

    }
}