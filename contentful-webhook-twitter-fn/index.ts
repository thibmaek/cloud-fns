import 'source-map-support/register';

import { Twitter } from 'twitter-node-client';
import { differenceInDays, isFuture, parseISO } from 'date-fns';
import type { APIGatewayProxyHandler } from 'aws-lambda';

interface ContentfulEvent {
  sys: {
    createdAt: string;
    contentType: {
      sys: {
        id: 'blog-post';
      };
    };
  };
  fields: {
    title: Record<string, string>;
    slug: Record<string, string>;
  };
}

const twitter = new Twitter({
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
  consumerKey: process.env.TWITTER_CONSUMER_KEY!,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
});

const tweet = (t: string) =>
  new Promise((resolve, reject) => {
    twitter.postTweet({ status: t }, reject, () => resolve(true));
  });

export const handler: APIGatewayProxyHandler = async evt => {
  if (!evt.body) {
    return { statusCode: 204, body: 'No body. Skipped' };
  }

  const { sys, fields } = JSON.parse(evt.body) as ContentfulEvent;

  if (sys.contentType.sys.id !== 'blog-post') {
    return { statusCode: 422, body: 'Content-type was not a blog post' };
  }

  const today = new Date();
  const createdDate = parseISO(sys.createdAt);

  if (isFuture(createdDate)) {
    return { statusCode: 204, body: 'Creation date is in the future' };
  }

  if (differenceInDays(today, createdDate) > 1) {
    return { statusCode: 204, body: 'Publication date was longer than 1 day ago' };
  }

  try {
    await tweet(
      `Just published something new on my blog: ${
        fields.title[`en-US`]
      } https://thibmaek.com/posts/${fields.slug[`en-US`]}`,
    );
    return { statusCode: 200, body: 'Posted' };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: e };
  }
};
