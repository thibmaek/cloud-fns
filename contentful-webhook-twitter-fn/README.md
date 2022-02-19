# contentful-webhook-twitter-fn

Simple example of a cloud function to which tweets whenever a new entry gets published on Contentful.
Set a contentful webhook to point to the function url.

## How

It checks if the content type is equal to `'blog-post'`. If the post's creation date is longer than one day ago it will not trigger since making edits and saving them in Contentful requires to republish the article which would retrigger the cloud function and send out a new tweet.

## Usage

Twitter credentials will be added as an env variable trough serverless.
Define these in `env.json`:

```json
{
  "TWITTER_ACCESS_TOKEN_SECRET": "",
  "TWITTER_ACCESS_TOKEN": "",
  "TWITTER_CONSUMER_KEY": "",
  "TWITTER_CONSUMER_SECRET": ""
}
```
