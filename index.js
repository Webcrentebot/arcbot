const Twit = require('twit');

/*
 * - Insert each Twitter credential inside it's equivalent quote.
 */
const config = {
  consumer_key:'wQAsuYm7jW6TPT5CQNXHteSxi',
  consumer_secret: 'hw6T2sfWZyOTdn6LjfY5R83aUxvBQq78cIbz3tiR127HLZL1ZY',
  access_token: '1478470492470325251-5ZPkpiWOwFdBQyD9K0QoNEEhLQ6hJi',
  access_token_secret: 'X0kRMdVe8Ekzbe1USFXcVOLSnerdwScTzLtKjxqoZzrY7',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAAKKAYQEAAAAA1bePaE3qk5VhDSRJoz2Ma4TK9z0%3DIvgaqF5OIpLz6GK3sfMOCgnQ47kDSRMhZGMRfS1NnjyI2MV7WP'
};

/*
 * - Replace "ex1, ex2" with the words you want to retweet.
 * - Separate words with commas.
 * - Keep words inside quotes.
 * - DO NOT repeat the same word with caps on and off (example: "word,Word,WORD").
 * - If "example" is between the selected words, the bot will retweet any variation of the word:
 *   example,Example,EXAMPLE,ExAmPlE...
 */
const words = 'jandre;

/*
 * - Change 'mybot' with your bot account '@'.
 * - Example: if your account '@' is '@twitter_bot', you should write only 'twitter_bot'
 */
const screenName = '@jandre_bot';

/*
 * If you are a not a programmer, avoid changing anything on the next lines
 */

const twit = new Twit(config);
const stream = twit.stream('statuses/filter', { track: words.split(',') });

console.log('Bot is starting!');
try {
  stream.on('tweet', tweet => {
    if (tweet.user.screen_name === screenName) return;

    if (!tweet.retweeted_status) {
      twit.post('statuses/retweet/:id', { id: tweet.id_str }, (err, data) => {
        if (err || !data.text) {
          return console.log(`Error retweeting user "@${tweet.user.screen_name}"`);
        }
        console.log(`Retweeted user "@${tweet.user.screen_name}":\n"${tweet.text}"\n`);
      });
    }
  });
} catch (_) {
  console.log('An error ocurred.');
  process.exit();
}
