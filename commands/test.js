const { MessageEmbed } = require("discord.js")


module.exports = {
    description: `Shows the bot ping and latency.`,

    run(client, message, args) {
        const embed = new MessageEmbed()

        message.reply({embeds: [embed.setTitle(`:x: Error Occured!`).setDescription(`Due to invalid permissions I'm unable to configure my settings in your server!`).addField(`Database:`, `***\`\`\`Can't add ${message.guild.name} in my database :(***`).addField(`Prefix:`, `***\`\`\`Unable to add my prefix! [${process.env.prefix}]\`\`\`**`)]})
    }
}