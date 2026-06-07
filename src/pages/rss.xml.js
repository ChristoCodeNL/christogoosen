import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
  const posts = await getCollection('blog');
  const books = await getCollection('books');

  const postItems = posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    link: `/blog/${post.id}/`,
  }));

  const bookItems = books.map((book) => ({
    title: `Book review: ${book.data.title} by ${book.data.author}`,
    description: book.data.description,
    pubDate: book.data.pubDate,
    link: `/books/${book.id}/`,
  }));

  const items = [...postItems, ...bookItems]
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
  });
}
