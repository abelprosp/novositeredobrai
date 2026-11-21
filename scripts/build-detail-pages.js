import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {detailPages} from '../src/solutions.js';

const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', dist), 'utf8');

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

for (const [path, page] of detailPages) {
  const directory = new URL(path.slice(1), dist);
  const title = escapeHtml(`${page.title} | ${page.division.name}`);
  const description = escapeHtml(page.description);
  const html = template
    .replace(/<title>[^<]*<\/title>/, () => `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, (_, start, end) => start + description + end);

  await mkdir(directory, {recursive: true});
  await writeFile(new URL('index.html', directory), html);
}

console.log(`Páginas de soluções geradas: ${detailPages.size}`);
