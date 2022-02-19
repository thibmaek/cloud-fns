import 'source-map-support/register';

import { Discojs } from 'discojs';
import got from 'got';
import type { APIGatewayProxyHandler } from 'aws-lambda';
import pickRandom from 'pure-fun/dist/arrays/pickRandom';

import getRandomPage from './utils/getRandomPage';
import getPageURL from './utils/getPageUrl';

const client = new Discojs({ userToken: process.env.DISCOGS_API_TOKEN });

export const getRandomRecord: APIGatewayProxyHandler = async () => {
  try {
    const { username } = await client.getIdentity();
    const { folders } = await client.listFoldersForUser(username);
    const folder = folders.find(folder => folder.name === 'All');

    if (!folder) {
      return { statusCode: 404, body: `Folder 'all' not found for user ${username}` };
    }

    const { pagination } = await client.listItemsInFolderForUser(username, folder.id);

    const randomPage = getRandomPage(pagination.page, pagination.pages);

    const url = getPageURL(pagination.urls.last!, randomPage);

    const body = await got(url).json<Record<'releases', unknown[]>>();
    const record = pickRandom(body.releases);

    return { statusCode: 200, body: JSON.stringify({ record, url }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: err.toString() };
  }
};
