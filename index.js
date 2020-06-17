const Twit = require('twit');

/*
 * - Insert each Twitter credential inside it's equivalent quote.
 */
const config = {
  consumer_key: 'co1Q1GiekJZJ4eyOtzPEbNcaz',
  consumer_secret: 'wZaBALj1MSKX22D9smjL0IFD9611CX7VYfu2xU28hOKNtaPIky',
  access_token: '1272323184411512833-tDthFufIur9Sul5i3TY6zUj58tIqap',
  access_token_secret: 'fOyZgXk7uRmkqLzN5utY4oWmbF5dJfea1BruiUGNMjjoA',
};

/*
 * - Replace "ex1, ex2" with the words you want to retweet.
 * - Separate words with commas.
 * - Keep words inside quotes.
 * - DO NOT repeat the same word with caps on and off (example: "word,Word,WORD").
 * - If "example" is between the selected words, the bot will retweet any variation of the word:
 *   example,Example,EXAMPLE,ExAmPlE...
 */
const words = 'arctic monkeys';

/*
 * - Change 'mybot' with your bot account '@'.
 * - Example: if your account '@' is '@twitter_bot', you should write only 'twitter_bot'
 */
const screenName = 'arcticm_bot';

/*
 * If you are a not a programmer, avoid changing anything on the next lines
 */

function action(event){
  const {retweeted_status, id_str, screen_name, is_quote_status} = event;
  const {name} = event.user;

  if(!retweeted_status && !is_quote_status){ // Se o status não for um retweet normal, nem um retweet com comentário
    Tweet.post(`statuses/retweet/${id_str}`, erro => { 
      if(erro){
        console.log("Erro no retweet: " + erro)
        // Caso haja um erro, informamos no console o mesmo
      }else {
        console.log("RETWEETADO: ", `https://twitter.com/${name}/status/${id_str}`)
        // Se der tudo certo, informamos no console junto com o URL do tweet retweetado
      }
    }) // Retweetar o tweet, e caso haja um erro, avisar no console. Se não, avisar no console que deu certo com o id do tweet
    Tweet.post('favorites/create', {id: id_str}, erro => { // Dar like no tweet
      if(erro){
        return console.log("Erro no like: " + erro) 
        // Caso haja algum erro, jogar no console para verificarmos.
      }else {
        return console.log("Tweet Likado. URL do Tweet: " + `https:twitter.com/${screen_name}/status/${id_str}`) 
        // Se der tudo certo, avisar no console com o URL do tweet original
      }
    }) 
  }else {
       return 
       // Caso as condições não sejam atendidas, retornar a função vazia, indo para o próximo tweet
     }
}
var stream = Tweet.stream('statuses/filter', {track: 'bot'}) 
// Aqui dizemos para o programa verificar em modo streaming
stream.on('data', action) 
// Ao receber as informações (`data`), passar elas para a função action e chamar a mesma.
stream.on('error', erro => console.log("Erro: "+ erro)) 
// Caso haja algum erro, jogar o erro no console para verificarmos.
