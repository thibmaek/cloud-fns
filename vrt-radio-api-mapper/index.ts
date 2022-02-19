import 'source-map-support/register';
import type { APIGatewayProxyHandler } from 'aws-lambda';

import getChannelFromName from './lib/getChannelFromName';
import { getCurrentProgram } from './lib/getProgram';
import getPlaylist, { PlaylistItem } from './lib/getPlaylist';

import { channels } from './channels';

function mapResponse({ properties, channelCode, onairType, startDate, endDate }: PlaylistItem) {
  const artist = properties.find(p => p.key === `ARTISTNAME`)?.value;
  const title = properties.find(p => p.key === `TITLE`)?.value;

  return {
    artist,
    channel: {
      code: channelCode,
    },
    start: startDate,
    stop: endDate,
    title,
    trackName: `${artist} - ${title}`,
    type: onairType,
  };
}

export const handler: APIGatewayProxyHandler = async evt => {
  if (!evt.pathParameters?.channelName) {
    return { statusCode: 400, body: "Paramter 'channelName' missing" };
  }

  const { code: channelCode } = getChannelFromName(evt.pathParameters.channelName);

  try {
    const [program, playlist] = await Promise.all([
      getCurrentProgram(channelCode),
      getPlaylist(channelCode),
    ]);

    const parsedResponse = playlist.onairs.map(mapResponse);

    return {
      statusCode: 200,
      body: JSON.stringify({
        current: parsedResponse.find(airing => airing.type === `NOW`),
        previous: parsedResponse.find(airing => airing.type === `PREVIOUS`),
        program: program.title,
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
      body: JSON.stringify({
        availableChannels: channels,
        error: `Invalid channel slug supplied`,
        request: {
          channel: evt.pathParameters.channelCode,
        },
        statusCode: 400,
      }),
    };
  }
};
