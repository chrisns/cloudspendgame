# Black Friday Game

This is the game you can play on https://blackfriday.cns.me/

Or watch our video about it [![Video](https://img.youtube.com/vi/Ij7IKrSFqas/0.jpg)](https://www.youtube.com/watch?v=Ij7IKrSFqas)

# deploy

```bash
npm i
SLS_DEBUG=* AWS_REGION=eu-west-2 aws-vault exec admin --no-session -- serverless deploy
```
