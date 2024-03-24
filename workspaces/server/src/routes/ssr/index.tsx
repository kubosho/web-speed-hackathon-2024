import fs from 'node:fs/promises';

import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';

import { ClientApp } from '@wsh-2024/app/src/index';

import { INDEX_HTML_PATH } from '../../constants/paths';

const app = new Hono();

async function createHTML({
  body,
  isHome,
  styleTags,
}: {
  body: string;
  isHome: boolean;
  styleTags: string;
}): Promise<string> {
  const htmlContent = await fs.readFile(INDEX_HTML_PATH, 'utf-8');

  const content = htmlContent
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replace('<style id="tag"></style>', styleTags)
    .replace(
      '<link id="hero-image-preload" />',
      isHome ? '<link as="image" href="/assets/hero-image.webp" rel="preload" />' : '',
    );

  return content;
}

app.get('*', async (c) => {
  const sheet = new ServerStyleSheet();

  try {
    const body = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <StaticRouter location={c.req.path}>
          <ClientApp />
        </StaticRouter>,
      ),
    );

    const styleTags = sheet.getStyleTags();
    const html = await createHTML({ body, isHome: c.req.path === '/', styleTags });

    return c.html(html);
  } catch (cause) {
    throw new HTTPException(500, { cause, message: 'SSR error.' });
  } finally {
    sheet.seal();
  }
});

export { app as ssrApp };
