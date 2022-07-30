const { MessageEmbed } = require("discord.js")

module.exports = {
    name: `clear`, 
    description: `Clears a given amount of messages!`,

    run(client, message, args, db) {
        var amount = parseInt(args[1]) || 100
        if(amount > 100) var amount = 100
        message.reply(`Deleting messages ..`).then(async (msg) => {
            message.delete()
            const channel = msg.channel
            channel.bulkDelete(amount).then(async (msgs) => {
                await channel.send(`\`\`\`${msgs.size} messages has been deleted!\`\`\``)
            })
        })
    }
}