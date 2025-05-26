import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

// Liquid engine configuratie
const engine = new Liquid({
  extname: '.liquid',
  root: ['server/views', 'server/layouts']
});

// Renderfunctie eerst definiëren
const renderTemplate = async (template, data) => {
  return await engine.renderFile(template, data);
};

const app = new App();

app.engine('liquid', engine.renderFile)
  .use(logger())
  .use('/client', sirv('client'))
  .use('/server', sirv('server'))
  .use('/dist', sirv('dist'))

  // Homepage
  .get('/', async (req, res) => {
    const html = await renderTemplate('index');
    res.send(html);
  })

  //overzicht pagina
  .get('/overview', async (req, res) => {
    const html = await renderTemplate('overview');
    res.send(html);
  })
  
  //detail pagina
  .get('/detail_pagina', async (req, res) => {
    const html = await renderTemplate('detail_pagina');
    res.send(html);
  })
  


  

  .listen(3000, () => {
    console.log('Server draait op http://localhost:3000');
  });