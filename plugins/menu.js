const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');
const os = require("os");

// Fake vCard
const fakevCard = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "© SHAVIYA TECH",
            vcard: `BEGIN:VCARD
VERSION:3.0
FN:SHAVIYA-XMD V3
ORG:SHAVIYA TECH;
TEL;type=CELL;type=VOICE;waid=94707085822:+94707085822
END:VCARD`
        }
    }
};

cmd({
    pattern: "menu",
    alias: ["getmenu","list","ranulist","ranumenu"],
    desc: "Show interactive menu system",
    category: "menu",
    react: "📂",
    filename: __filename
}, async (conn, mek, m, { from, pushname, reply }) => {
    try {
    
            // Count total commands
        const totalCommands = Object.keys(commands).length;
        
        const info = `👋 *𝘏𝘌𝘓𝘓𝘖𝘞* ${pushname} 

 🎀 𝗪elcome to SHAVIYA-XMD V3🎗️

*╭──「 MENU 」*
*│*🐼 *\`Bot\`*: *𝐒𝐇𝐀𝐕𝐈𝐘𝐀-𝐗𝐌𝐃-𝐕𝟑*
*│*👤 *\`User\`*: ${pushname}
*│*👨‍💻 *\`Owner\`*: *SHAVIYA TECH*
*│*⏰ *\`Uptime\`*: ${runtime(process.uptime())}
*│*⏳ *\`Ram\`*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
*│*🫟 *\`Version\`*: ${config.BOT_VERSION}
*│*🪙 *\`Commands\`*: ${totalCommands}
*│*🖊️ *\`Prefix\`*: ${config.PREFIX}
╰───────────────●●►

*1. │  🤵‍♂ -* Owner Menu
*2. │  🤖 -* Ai Menu
*3. │  🔍 -* Search Menu
*4. │  📥 -* Download Menu
*5. │  😁 -* Fun Menu
*6. │  📂 -* Main Menu
*7. │  🔄 -* Convert Menu
*8. │  📌 -* Other Menu
*9. │  🎨 -* Logo Menu
*10.│ 🖼️ -* Imagine Menu
*11.│ 👥 -* Group Menu
*12.│ ⚙️ -* Setting Menu

> © Powerd by 𝗦𝗛𝗔𝗩𝗜𝗬𝗔-𝗫𝗠𝗗 𝗩𝟯 🌛`;
        const image = "https://i.ibb.co/C5PdQgTz/imgbb-1774247334984.jpg"; // define image url
        const audioUrl = "https://github.com/Ranumithaofc/RANU-FILE-S-/raw/refs/heads/main/Audio/Dolki%20menu.opus"; // audio url / local file

        // Send image
        const sentMsg = await conn.sendMessage(
            from,
            { image: { url: image }, caption: info },
            { quoted: fakevCard }
        );

        const messageID = sentMsg.key.id; // get sent message ID

        // Send audio (voice note style)
        await conn.sendMessage(
            from,
            { audio: { url: audioUrl }, mimetype: 'audio/mp4', ptt: true },
            { quoted: mek }
        );

        // Listen for user reply
conn.ev.on('messages.upsert', async (msgUpdate) => {
    const mekInfo = msgUpdate?.messages[0];
    if (!mekInfo?.message) return;

    const fromUser = mekInfo.key.remoteJid;
    const textMsg =
        mekInfo.message.conversation ||
        mekInfo.message.extendedTextMessage?.text;

    const quotedId =
        mekInfo.message?.extendedTextMessage?.contextInfo?.stanzaId;

    // check user replied to menu message
    if (quotedId !== messageID) return;

    let userReply = textMsg?.trim();

    if (/^(1|2|3|4|5|6|7|8|9|10|11|12)$/.test(userReply)) {
        // ✅ react
        await conn.sendMessage(fromUser, {
            react: { text: '🎡', key: mekInfo.key }
        });

        // menu image url එක
        const menuImage = "https://i.ibb.co/C5PdQgTz/imgbb-1774247334984.jpg";

        // send reply with image + caption
        let captionText = "";
        switch (userReply) {
            case "1":
                captionText = `╭━━━〔 *🤵‍♂ Owner Menu 🤵‍♂* 〕━━━┈⊷
┃★╭──────────────
┃★│ ⚠️ *Restricted*
┃★│ • block @user
┃★│ • unblock @user
┃★│ • fullpp [img]
┃★│ • setpp [img]
┃★│ • restart
┃★│ • shutdown
┃★│ • updatecmd
┃★╰──────────────
┃★╭──────────────
┃★│ ℹ️ *Info Tools*
┃★│ • gjid
┃★│ • jid @user
┃★│ • listcmd
┃★│ • allmenu
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> © Powerd by 𝗦𝗛𝗔𝗩𝗜𝗬𝗔-𝗫𝗠𝗗 𝗩𝟯 🌛`;
                break;
            case "2":
                captionText = `╭━━━〔 *🤖 Ai Menu 🤖* 〕━━━┈⊷
┃★╭──────────────
┃★│ • ai
┃★│ • deepseek
┃★│ • gemini
┃★│ • gemini2
┃★│ • openai
┃★╰──────────────
╰━━━━━━━━━━━━━━┈⊷
> © Powerd by 𝗦𝗛𝗔𝗩𝗜𝗬𝗔-𝗫𝗠𝗗 𝗩𝟯 🌛`;
                break;
            case "3":
                captionText = `╭━━━〔 *🔍 Search Menu 🔍* 〕━━━┈⊷
┃★╭──────────────      
┃★│ • check
┃★│ • cid
┃★│ • country
┃★│ • chinfo
┃★│ • define
┃★│ • fancy 
┃★│ • githubstalk
┃★│ • npm
┃★│ • news
┃★│ • mvdetail
┃★│ • praytime
┃★│ • sss
┃★│ • srepo
┃★│ • ttstalk
┃★│ • twtstalk
┃★│ • yts
┃★│ • ytpost
┃★│ • ytstalk
┃★│ • weather
┃★╰──────────────
╰━━━━━━━━━━━━━━┈⊷
> © Powerd by 𝗦𝗛𝗔𝗩𝗜𝗬𝗔-𝗫𝗠𝗗 𝗩𝟯 🌛`;
                break;
            case "4":
                captionText = `╭━━━〔 *📥 Download Menu 📥* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🌐 *Social Media*
┃★│ • facebook [url]
┃★│ • mediafire [url]
┃★│ • tiktok [url]
┃★│ • twitter [url]
┃★│ • Insta [url]
┃★│ • apk [app]
┃★│ • img [query]
┃★│ • tt2 [url]
┃★│ • pins [url]
┃★│ • apk2 [app]
┃★│ • fb2 [url]
┃★│ • pinterest [url]
┃★╰──────────────
┃★╭──────────────
┃★│ 🎵 *Music/Video*
┃★│ • spotify [query]
┃★│ • play [song]
┃★│ • play2-10 [song]
┃★│ • audio [url]
┃★│ • video [url]
┃★│ • video2-10 [url]
┃★│ • ytmp3 [url]
┃★│ • ytmp4 [url]
┃★│ • song [name]
┃★│ • darama [name]
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> © Powerd by 𝗦𝗛𝗔𝗩𝗜𝗬𝗔-𝗫𝗠𝗗 𝗩𝟯 🌛`;
                break;
            case "5":
                captionText = `╭━━━〔 *😁 Fun Menu 😁* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🎭 *Interactive*
┃★│ • shapar
┃★│ • rate @user
┃★│ • insult @user
┃★│ • hack @user
┃★│ • ship @user1 @user2
┃★│ • character
┃★│ • pickup
┃★│ • joke
┃★╰──────────────
┃★╭──────────────
┃★│ 😂 *Reactions*
┃★│ • hrt
┃★│ • hpy
┃★│ • syd
┃★│ • anger
┃★│ • shy
┃★│ • kiss
┃★│ • mon
┃★│ • cunfuzed
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> © Powerd by 𝗦𝗛𝗔𝗩𝗜𝗬𝗔-𝗫𝗠𝗗 𝗩𝟯 🌛`;
                break;
            case "6":
                captionText = `╭━━━〔 *📂  Main Menu  📂* 〕━━━┈⊷
┃★╭──────────────
┃★│ ℹ️ *Bot Info*
┃★│ • ping
┃★│ • live
┃★│ • alive
┃★│ • runtime
┃★│ • uptime
┃★│ • repo
┃★│ • owner
┃★╰──────────────
┃★╭──────────────
┃★│ 🛠️ *Controls*
┃★│ • menu
┃★│ • menu2
┃★│ • restart
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> © Powerd by 𝗦𝗛𝗔𝗩𝗜𝗬𝗔-𝗫𝗠𝗗 𝗩𝟯 🌛`;
                break;
            case "7":
                captionText = `╭━━━〔 *🔄 Convert Menu 🔄* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🖼️ *Media*
┃★│ • sticker [img]
┃★│ • sticker2 [img]
┃★│ • emojimix 😎+😂
┃★│ • take [name,text]
┃★│ • tourl [url]
┃★│ • gv [url]
┃★│ • gvideo [url]
┃★│ • tomp3 [video]
┃★╰──────────────
┃★╭──────────────
┃★│ 📝 *Text*
┃★│ • fancy [text]
┃★│ • tts [text]
┃★│ • trt [text]
┃★│ • base64 [text]
┃★│ • unbase64 [text]
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> © Powerd by 𝗦𝗛𝗔𝗩𝗜𝗬𝗔-𝗫𝗠𝗗 𝗩𝟯 🌛`;
                break;
            case "8":
                captionText = `╭━━━〔 *📌 Other Menu 📌* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🕒 *Utilities*
┃★│ • timenow
┃★│ • date
┃★│ • count [num]
┃★│ • calculate [expr]
┃★│ • countx
┃★╰──────────────
┃★╭──────────────
┃★│ 🎲 *Random*
┃★│ • flip
┃★│ • coinflip
┃★│ • rcolor
┃★│ • roll
┃★│ • fact
┃★╰──────────────
┃★╭──────────────
┃★│ 🔍 *Search*
┃★│ • define [word]
┃★│ • news [query]
┃★│ • movie [name]
┃★│ • weather [loc]
┃★╰──────────────
┃★╭──────────────
┃★│ ❤️ *Affection*
┃★│ • cuddle @user
┃★│ • hug @user
┃★│ • kiss @user
┃★│ • lick @user
┃★│ • pat @user
┃★╰──────────────
┃★╭──────────────
┃★│ 😂 *Funny*
┃★│ • bully @user
┃★│ • bonk @user
┃★│ • yeet @user
┃★│ • slap @user
┃★│ • kill @user
┃★╰──────────────
┃★╭──────────────
┃★│ 😊 *Expressions*
┃★│ • blush @user
┃★│ • smile @user
┃★│ • happy @user
┃★│ • wink @user
┃★│ • poke @user
┃★╰──────────────
┃★╭──────────────
┃★│ 🖼️ *Images*
┃★│ • fack
┃★│ • dog
┃★│ • awoo
┃★│ • garl
┃★│ • waifu
┃★│ • neko
┃★│ • megnumin
┃★│ • maid
┃★│ • loli
┃★╰──────────────
┃★╭──────────────
┃★│ 🎭 *Characters*
┃★│ • animegirl
┃★│ • animegirl1-5
┃★│ • anime1-5
┃★│ • foxgirl
┃★│ • naruto
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> © Powerd by 𝗦𝗛𝗔𝗩𝗜𝗬𝗔-𝗫𝗠𝗗 𝗩𝟯 🌛`;
                break;
            case "9":
                captionText = `╭━━━〔 *🎨 Logo Menu 🎨* 〕━━━┈⊷
┃★╭──────────────
┃★│ • 3dcomic
┃★│ • 3dpaper
┃★│ • america
┃★│ • angelwings
┃★│ • bear
┃★│ • bulb
┃★│ • boom
┃★│ • birthday
┃★│ • blackpink
┃★│ • cat
┃★│ • clouds
┃★│ • castle
┃★│ • deadpool
┃★│ • dragonball
┃★│ • devilwings
┃★│ • eraser
┃★│ • frozen
┃★│ • futuristic
┃★│ • galaxy
┃★│ • hacker
┃★│ • leaf
┃★│ • luxury
┃★│ • naruto
┃★│ • nigeria
┃★│ • neonlight
┃★│ • paint
┃★│ • por*hub
┃★│ • sans
┃★│ • sunset
┃★│ • sadgirl
┃★│ • thor
┃★│ • tatoo
┃★│ • typography
┃★│ • valorant
┃★│ • zodiac
┃★╰──────────────
╰━━━━━━━━━━━━━━┈⊷
> © Powerd by 𝗦𝗛𝗔𝗩𝗜𝗬𝗔-𝗫𝗠𝗗 𝗩𝟯 🌛`;
                break;
            case "10":
                captionText = `╭━━━〔  *🖼️ Imagine Menu 🖼️*  〕━━━┈⊷
┃★╭──────────────
┃★│ • awoo
┃★│ • dog
┃★│ • imgloli
┃★│ • maid
┃★│ • megumin
┃★│ • waifu
┃★│ • neko
┃★│ • anime
┃★│ • anime1
┃★│ • anime2
┃★│ • anime3
┃★│ • anime4
┃★│ • anime5
┃★│ • animegirl
┃★│ • animegirl1
┃★│ • animegirl2
┃★│ • animegirl3
┃★│ • animegirl4
┃★│ • animegirl5
┃★│ • imagine
┃★│ • imagine2
┃★│ • imagine3
┃★│ • wallpaper
┃★│ • randomwall
┃★│ • getimage
┃★│ • imgscan
┃★│ • image
┃★│ • adedit
┃★│ • bluredit
┃★│ • greyedit
┃★│ • invertedit
┃★│ • jailedit
┃★│ • jokeedit
┃★│ • nokiaedit
┃★│ • wantededit
┃★│ • removebg
┃★│ • couplepp
┃★│ • bonk
┃★│ • bully
┃★│ • blush
┃★│ • bite
┃★│ • cry
┃★│ • cuddle
┃★│ • cringe
┃★│ • dance
┃★│ • glomp
┃★│ • hug
┃★│ • happy
┃★│ • handhold
┃★│ • highfive
┃★│ • kill
┃★│ • kiss
┃★│ • lick
┃★│ • nom
┃★│ • pat
┃★│ • poke
┃★│ • smug
┃★│ • slay
┃★│ • smile
┃★│ • marige
┃★│ • wave
┃★│ • wink
┃★│ • yeet
┃★╰──────────────
╰━━━━━━━━━━━━━━┈⊷
> © Powerd by 𝗦𝗛𝗔𝗩𝗜𝗬𝗔-𝗫𝗠𝗗 𝗩𝟯 🌛`;
                break;
            case "11":
                captionText = `╭━━━〔 *👥 Group Menu 👥* 〕━━━┈⊷
┃★╭──────────────
┃★│ 🛠️ *Management*
┃★│ • grouplink
┃★│ • kickall
┃★│ • kickall2
┃★│ • kickall3
┃★│ • add @user
┃★│ • remove @user
┃★│ • kick @user
┃★╰──────────────
┃★╭──────────────
┃★│ ⚡ *Admin Tools*
┃★│ • promote @user
┃★│ • demote @user
┃★│ • dismiss 
┃★│ • revoke
┃★│ • mute [time]
┃★│ • unmute
┃★│ • lockgc
┃★│ • unlockgc
┃★╰──────────────
┃★╭──────────────
┃★│ 🏷️ *Tagging*
┃★│ • tag @user
┃★│ • hidetag [msg]
┃★│ • tagall
┃★│ • tagadmins
┃★│ • invite
┃★╰──────────────
┃★╭──────────────
┃★│ 🔖 *Group Info*
┃★│ • gid [g link]
┃★│ • gidinfo [jid]
┃★│ • ginfo
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
> © Powerd by 𝗦𝗛𝗔𝗩𝗜𝗬𝗔-𝗫𝗠𝗗 𝗩𝟯 🌛`;
                break;
            case "12":
                captionText = `╭━━━〔  *⚙️ Setting Menu ⚙️* 〕━━━┈⊷
┃★╭──────────────      
┃★│ • mode pravite/inbox/public
┃★│ • setprefix !,@,#,$,/ 
┃★│ • admin-events on/off
┃★│ • welcome on/off
┃★│ • auto-typing on/off
┃★│ • mention-reply on/off
┃★│ • always-online on/off
┃★│ • auto-recoding on/off
┃★│ • auto-seen on/off
┃★│ • status-react on/off
┃★│ • read-messages on/off 
┃★│ • auto-voice on/off
┃★│ • auto-reply on/off
┃★│ • auto-sticker on/off
┃★│ • auto-react on/off
┃★│ • status-reply on/off
┃★│ • anti-bad on/off
┃★│ • antilink on/off
┃★│ • antikick on/off
┃★│ • kicklink on/off
┃★│ • deletelink on/off
┃★│ • antibad on/off
┃★│ • antidelete on/off
┃★│ • anticall on/off
┃★│ • heartreact on/off
┃★│ • .use on/off
┃★╰──────────────
╰━━━━━━━━━━━━━━┈⊷
> © Powerd by 𝗦𝗛𝗔𝗩𝗜𝗬𝗔-𝗫𝗠𝗗 𝗩𝟯 🌛`;
                break;
        }

        await conn.sendMessage(fromUser, { 
            image: { url: menuImage }, 
            caption: captionText 
        }, { quoted: mekInfo });

    } else {
        await conn.sendMessage(fromUser, { 
            text: "*❌ Invalid choice!*" 
        }, { quoted: mekInfo });
    }
});
    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        await reply(`❌ *Main error:* ${error.message || "Error!"}`);
    }
});
