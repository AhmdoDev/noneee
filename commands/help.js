const { MessageEmbed, MessageSelectMenu, MessageActionRow} = require("discord.js")

module.exports = {
    name: `help`, 
    description: `Gives you my command list! :p`,

    run(client, message, args) {
        const commands = client.commands.map(command => command.name).join(", ")

      const helpembed = new MessageEmbed()
      .setColor("BLURPLE")
      .setAuthor({name: `${message.author.username}`, iconURL:`${message.author.avatarURL()}`})
      .setDescription(`**${commands}**`)
      .setTitle(`This help menu is still in beta and will be updated soon!`)
      .setFooter({text:`Hurble Bot 🎶.`})
      message.reply({embeds: [helpembed]}) 
    }
}