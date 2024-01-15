// src/index.ts
import express from 'express';
import GetBiliBiliVideoStream from './routes/BiliBiliVideoStream';
import GetBiliBiliBangumiStream from './routes/BiliBiliBangumiStream';


const app = express();
const port = 9000;

app.use(express.json());

app.use('/avatars', express.static('Avatars'));

const routers = [
  GetBiliBiliVideoStream,
  GetBiliBiliBangumiStream
];
app.use('/', routers);

app.get('/', async (req, res) => {
  const response = await fetch('https://ip.3322.net');
  const ip = await response.text();
  res.send(ip);
});

app.listen(port, () =>
{
  console.log(`server run at: http://localhost:${port}`);
});




const url = 'https://bilibileostream-bilibilih-srrmdnstep.cn-hongkong.fcapp.run';


let count = 0;
const intervalId = setInterval(() => {
  fetch(url, {
    method: 'Get',
    headers: { 'Content-Type': 'application/json' },
  })
  .then((res) => console.log(res))

  count += 1;
  if (count >= 5 * 200) { // 持续5秒，每秒200次
    clearInterval(intervalId);
  }
}, 1000 / 200); // 每秒200次