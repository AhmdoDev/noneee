require('dotenv').config()
const tokens = [process.env.token]
async function loginclient() {
await tokens.forEach((token) => {
    const {Client, Collection, MessageEmbed} = require("discord.js")
    const discordjs = require(`discord.js`)
    const { QuickDB } = require('quick.db')
    const db = new QuickDB()
    const developers =  "877295258864611348"
    const client = new Client({ intents: 131071})
    const fs = require('fs');
    client.db = db
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
    client.commands = new Collection()
    
    for(const files of commandFiles) {
        const commandName = files.split('.')[0]
        const command = require(`./commands/${files}`)
        client.commands.set(commandName, command)
    }
    
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
    for (const files of eventFiles) {
        const eventName = files.split('.')[0]
        const event = require(`./events/${files}`)
        if (event.once) {
            client.once(eventName, (...args) => event.execute(...args, db, client))
        } else {
            client.on(eventName, (...args) => event.execute(...args, db, client))
        }
    }
    client.on('guildCreate', async guild => {
        const newguild = new MessageEmbed
        
        if(!guild.me.permissions.has("ADMINISTRATOR")) {
            guild.owner.send({embeds: [newguild().setTitle(`:x: Error Occured!`).setDescription(`Due to invalid permissions I'm unable to configure my settings in your server!`).addField(`Database:`, `Can't add ${guild.name} in my database :(`).addField(`Prefix:`, `Unable to add my prefix! [${process.env.token}]`)]})
            guild.leave()
        } else {
            guild.channels.create(`${client.user.username}`, {type: "text"}).then(channel => {
                channel.send({embeds: [newguild().setTitle(`${client.user.username} Added!`).setDescription(`Hey! nice to meet you. I'm ${client.user.username} a multipurpose bot to help you and your members enjoy action, play games, battle out, and more!`).addField(`Functions:`, `\`#~\` Easy to use commands\n\`#~\` Manage your Server professionally\n\`#~\`Open Source [SOON]!\n\`#~\`More comming Soon!!`)]})
                db.set(`prefix_${guild.id}`, `${process.env.token}`)
            })
    
        }
    })
    client.on('interactionCreate', async (interaction) => {
            if(interaction.isCommand()) {
                if(interaction.commandName === "help") {
                        var prefix = await db.get(`prefix_${interaction.guild.id}`)
                        if(`${prefix}` == "null") await db.set(`prefix_${interaction.guild.id}`, `+`)
                        if(interaction.guild.vanityURLCode == null) inv = await interaction.channel.createInvite({
                            maxAge: 0,
                            maxUses: 10
                        })
                        else inv = `https://discord.gg/${interaction.guild.vanityURLCode}`
                        interaction.reply({content: `**${interaction.guild.name}** (**${interaction.guild.id}**)\n**Prefix:** \`${prefix}\`\n**Commands:** \`${prefix}help\`\n**Server Link:** ${inv}`, embeds: [new MessageEmbed().setTitle("My links:").setDescription(`[Invite Link](https://discord.com/api/oauth2/authorize?client_id=969589877987483728&permissions=8&scope=bot%20applications.commands)\n[Support Server](https://discord.gg/ArTe2mScpT)`)], ephemeral: true})
                }
            }
    })
    client.on('messageCreate', async (message) => {
         if(message.author.bot) return;
         if(message.channel.type == "dm") return;
        try { 
            if(message.channelId)
            if(message.content.startsWith("+name")) {
                if(!developers.includes(`${message.author.id}`)) return;
                    const name = message.content.split(`+name `)[1]
                    if(!name) return;
                    client.user.setUsername(`${name}`)
                    .catch(() => {
                        message.reply(`حدث خطأ.`)
                        message.delete()
                    })
                    console.log(`Changed name to ${name} by ${message.author.tag}`)
            }
            const guildssmams = (await message.fetch(true)).guild
            if(message.content == `<@${client.user.id}>`) {
                const prefix = await db.get(`prefix_${message.guild.id}`)
                if(message.guild.vanityURLCode == null) inv = await message.channel.createInvite({
                    maxAge: 0,
                    maxUses: 10
                })
                else inv = `https://discord.gg/${message.guild.vanityURLCode}`
                message.react("✅")
                message.author.send({content: `**${message.guild.name}** (**${message.guild.id}**)\n**Prefix:** \`${prefix}\`\n**Commands:** \`${prefix}help\`\n**Server Link:** ${inv}`, embeds: [new MessageEmbed().setTitle("My links:").setDescription(`[Invite Link](https://discord.com/api/oauth2/authorize?client_id=969589877987483728&permissions=8&scope=bot%20applications.commands)\n[Support Server](https://discord.gg/ArTe2mScpT)`)]})
            }
            var prefix = await db.get(`prefix_${message.guild.id}`)
            if(`${prefix}` == `null`) await db.set(`prefix_${message.guild.id}`, `+`) 
            var prefix = await db.get(`prefix_${message.guild.id}`)
        if(!message.content.includes(`${prefix}`)) return;
        const commandName = message.content.slice(prefix.length).trim().split(/ +/g).shift()
        const command = client.commands.get(`${commandName}`)
        const args = message.content.substring(prefix.length).split(" ")
        if(!command) return;
            command.run(client, message, args, db)
        } catch (err) {
            const errchannel = client.channels.cache.get(`972537938292391986`)
            const embed = new discordjs.MessageEmbed()
            .setTitle(`${err.name}`)
            .setDescription(`${err.message}`)
    
            console.error(err)
    
            errchannel.send({content: `<@&983976732216397844>`, embeds: [embed]})
            client.login(process.env.token)
            
              }
    })
    
    client.on('error', (err) => {
        const errchannel = client.channels.cache.get(`972537938292391986`)
        const embed = new discordjs.MessageEmbed()
        .setTitle(`${err.name}`)
        .setDescription(`${err.message}`)
        .addField(err, err.stack, true)
        
        errchannel.send({content: `<@&983976732216397844>`, embeds: [embed]})
        client.login(process.env.token)
    })
    
    
    client.login(token)
    
    module.exports = client 
})
}
loginclient().then(() => {
console.log(`[ Client ] Loaded in ${tokens.length} token/s!`)
})