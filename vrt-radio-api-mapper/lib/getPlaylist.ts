import got from 'got';

export interface PlaylistItem {
  properties: Array<{
    key: 'ARTISTNAME' | 'TITLE';
    value: string;
  }>;
  channelCode: number;
  onairType: 'NOW' | 'PREVIOUS';
  startDate: string;
  endDate: string;
}

export interface PlaylistResponse {
  onairs: PlaylistItem[];
}

export default async function getPlaylist(channelCode: number) {
  const response = await got(`https://services.vrt.be/playlist/onair?channel_code=${channelCode}`, {
    headers: {
      accept: `application/vnd.playlist.vrt.be.noa_1.0+json`,
    },
  }).json<PlaylistResponse>();
  return response;
}
