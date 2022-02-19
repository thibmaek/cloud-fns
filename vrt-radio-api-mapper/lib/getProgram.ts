import got from 'got';

interface OnAirResponse {
  onairs: Array<{
    now: Record<'title', string>;
    previous: Record<'title', string>;
    next: Record<'title', string>;
  }>;
}

const getProgram = async (channelCode: number) => {
  const response = await got(`https://services.vrt.be/epg/onair?channel_code=${channelCode}`, {
    headers: {
      accept: `application/vnd.epg.vrt.be.onairs_1.2+json`,
    },
  }).json<OnAirResponse>();
  return response;
};

export const getCurrentProgram = async (channelCode: number) => {
  const { onairs } = await getProgram(channelCode);
  return onairs[0].now;
};

export const getPreviousProgram = async (channelCode: number) => {
  const { onairs } = await getProgram(channelCode);
  return onairs[0].previous;
};

export const getNextProgram = async (channelCode: number) => {
  const { onairs } = await getProgram(channelCode);
  return onairs[0].next;
};
