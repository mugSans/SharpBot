const dateFormat = require('dateformat');
const stripIndents = require('common-tags').stripIndents;

const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');



exports.run = function (bot, msg) {

    if (msg.mentions.users.size < 1) {
        throw '@mention someone to find the info';
    }

    let member = msg.guild.member(msg.mentions.users.first());
    let user = msg.mentions.users.first();

    const millisCreated = new Date().getTime() - user.createdAt.getTime();
    const daysCreated = millisCreated/1000/60/60/24;

    const millisJoined = new Date().getTime() - member.joinedAt.getTime();
    const daysJoined = millisJoined/1000/60/60/24;

    let embed = bot.utils.embed(
        `${user.username}`,
        stripIndents`
        ***This message will dissappear in 30 seconds.***`,
        [
            {
                name: 'Status',
                value: `${user.presence.status[0].toUpperCase() + user.presence.status.slice(1)}`,
            },
            {
                name: 'Game',
                value: `${(user.presence.game && user.presence.game && user.presence.game.name) || 'Not playing a game.'}`,
            },
            {
                name: 'Created On',
                value: `${dateFormat(user.createdAt)}`,
            },
            {
                name: 'Days Since Creation',
                value: `${daysCreated.toFixed(0)}`,
            },
            {
                name: 'Joined On',
                value: `${dateFormat(member.joinedAt)}`,
            },
            {
                name: 'Days Since Joined',
                value: `${daysJoined.toFixed(0)}`,
            },
        ],
        {
            inline: true,
        });

    if (msg.guild.iconURL != null) {
        embed.setThumbnail(`${user.avatarURL}`);
    }

    msg.editEmbed(embed).then(m => m.delete(30000));

};

exports.info = {
    name: 'userinfo',
    usage: 'userinfo',
    description: 'Shows info about a user'
};

