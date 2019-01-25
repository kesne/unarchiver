const { RTMClient, WebClient } = require('@slack/client');

const token = process.env.SLACK_TOKEN;
const channels = process.env.SLACK_CHANNELS.split(',');

const rtm = new RTMClient(token);
const web = new WebClient(token);
rtm.start();

rtm.on('channel_archive', async ({ channel }) => {
    const info = await web.channels.info({ channel });
    if (channels.includes(info.channel.name)) {
        console.log(`Channel ${info.channel.name} was archived. Unarchiving...`);
        await web.channels.unarchive({ channel: channel });
    }
});

rtm.on('connect', () => {
    console.log('connect');
})

console.log(`Waiting for channels "${channels.join(', ')}" to be archived...`)
