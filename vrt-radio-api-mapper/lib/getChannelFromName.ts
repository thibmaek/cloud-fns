import { channels } from '../channels';

export default function getChannelFromName(channelName: string) {
  const normalizedRequest = channelName.toLowerCase().trim().replace(/\s+/, `-`);

  const foundChannel = channels.find(channel => channel.names.includes(normalizedRequest));

  if (!foundChannel) {
    throw new Error(`Invalid channel`);
  }

  return foundChannel;
}
