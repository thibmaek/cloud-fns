import 'source-map-support/register';

import type { APIGatewayProxyHandler } from 'aws-lambda';
import got from 'got';
import $ from 'cheerio';
import getCollectionDate from './utils/getCollectionDate';

const BASE_URL = 'https://ivago.be';

export const handler: APIGatewayProxyHandler = async evt => {
  if (!evt.pathParameters?.calendar) {
    return { statusCode: 400, body: "Param 'calendar' missing" };
  }

  const requestURL = `${BASE_URL}/thuisafval/ophaling/ophaalkalender/${evt.pathParameters.calendar}`;

  try {
    const nextCollectionTypes: string[] = [];

    const html = await got(requestURL).text();

    const nextCollectionDate = $('.volgende_ophaling_datum', html).text();
    $('.volgende_ophaling_fracties', html)
      .children()
      .map((_i, link) => {
        const imgNode = $('img', link).attr('alt');
        if (imgNode && imgNode.length > 0) {
          nextCollectionTypes.push(imgNode);
        }
      });

    return {
      statusCode: 200,
      body: JSON.stringify({
        nextCollectionDate: getCollectionDate(nextCollectionDate),
        images: {
          rest: `${BASE_URL}/sites/all/themes/ivago/images/fractions/HAH-REST.jpg`,
          pmd: `${BASE_URL}/sites/all/themes/ivago/images/fractions/HAH-PMD.jpg`,
          papier: `${BASE_URL}/sites/all/themes/ivago/images/fractions/HAH-PAPIER.jpg`,
          gft: `${BASE_URL}/sites/all/themes/ivago/images/fractions/HAH-GFT.jpg`,
          glas: `${BASE_URL}/sites/all/themes/ivago/images/fractions/HAH-GLAS.jpg`,
          grof: `${BASE_URL}/sites/all/themes/ivago/images/fractions/GROF+TEL.jpg`,
        },
        gft: nextCollectionTypes.includes('GFT'),
        glas: nextCollectionTypes.includes('GLAS'),
        papier: nextCollectionTypes.includes('PAPIER'),
        rest: nextCollectionTypes.includes('REST'),
        pmd: nextCollectionTypes.includes('PMD'),
        grof: nextCollectionTypes.includes('GROFVUIL OP AANVRAAG'),
      }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: err.toString() };
  }
};
