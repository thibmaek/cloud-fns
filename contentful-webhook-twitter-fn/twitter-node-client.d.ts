declare module 'twitter-node-client' {
  interface ClientOpts {
    accessToken: string;
    accessTokenSecret: string;
    consumerKey: string;
    consumerSecret: string;
  }

  export type Tweet = Record<'status', string>;

  export class Twitter {
    constructor(c: ClientOpts)

    postTweet(
      tweet: Tweet,
      errCb: (err: Error) => void,
      okCb: () => void,
    )
  }
}
