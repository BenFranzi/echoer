import express from 'express';
import configuration, { REQUEST_METHOD, requestMethod } from './configuration.mjs';
import bodyParser from 'body-parser';
import cache from './cache.mjs';
import  morgan from 'morgan'
import { makeKey, pick } from './utils.mjs';
import axios from 'axios';
import cors from 'cors';

const port = configuration.config.port;
const app = express()

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


async function proxy(req, res) {
  if (!REQUEST_METHOD[req.method]) {
    return res.status(200).send();
  }

  const { routes, config: { defaultRoute } } = configuration;

  const origin = defaultRoute === -1 ?  req.get('Origin') : req.get('Origin') || routes[defaultRoute].origin;

  if (!origin) {
    return res.status(400).send();
  }

  const route = routes.find(({origin: item}) => origin.includes(item));

  if (!route) {
    return res.status(400).json({message: 'origin not valid'}).send();
  }


  const key = JSON.stringify(makeKey(req));


  const response = await axios({
    method: req.method,
    url: `${route.destination}${req.url}`,
    headers: req.headers,
    data: req.body,
  })


  await cache.set(key, JSON.stringify(pick(response, ['status', 'headers', 'data'])));

  const record = JSON.parse(await cache.get(key));


  return res
      .status(record.status)
      .json(record.data)
      .send();
}


app.all('*', async (req, res) => {
  try {
    return await proxy(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'echoer failed', error }).send();
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
