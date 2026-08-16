import type { APIRoute } from 'astro';

/**
 * Server-side Google News RSS proxy.
 *
 * Usage: GET /api/news.json?q=ShopeePay
 *        GET /api/news.json?q=Shopee+PayLater
 *
 * Returns JSON: { status: "ok", items: [...] }
 *
 * Replaces client-side api.rss2json.com dependency.
 */

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

function parseRssItems(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];

    const titleMatch = block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)
      || block.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = block.match(/<link>([\s\S]*?)<\/link>/);
    const pubDateMatch = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const sourceMatch = block.match(/<source[^>]*>([\s\S]*?)<\/source>/);

    const rawTitle = titleMatch ? titleMatch[1].trim() : '';
    const link = linkMatch ? linkMatch[1].trim() : '';
    const pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';

    // Google News titles often end with " - SourceName"
    let title = rawTitle;
    let source = sourceMatch ? sourceMatch[1].trim() : 'Media Nasional';

    // If no <source> tag, try to extract from title
    if (!sourceMatch && rawTitle.includes(' - ')) {
      const parts = rawTitle.split(' - ');
      const lastPart = parts[parts.length - 1];
      if (lastPart.length < 30) {
        source = parts.pop()!;
        title = parts.join(' - ');
      }
    }

    // Decode HTML entities
    title = decodeEntities(title);
    source = decodeEntities(source);

    if (title && link) {
      items.push({ title, link, pubDate, source });
    }
  }

  return items;
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}

// Format RSS pubDate (RFC 2822) to "YYYY-MM-DD HH:mm:ss" for frontend compatibility
function formatDate(rfc2822: string): string {
  try {
    const d = new Date(rfc2822);
    if (isNaN(d.getTime())) return rfc2822;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  } catch {
    return rfc2822;
  }
}

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get('q') || 'ShopeePay';
  const maxItems = Math.min(
    parseInt(url.searchParams.get('max') || '10', 10),
    20,
  );

  const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query + ' when:30d')}&hl=id-ID&gl=ID&ceid=ID:id`;

  try {
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NewsBot/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ status: 'error', message: `Google News returned ${response.status}` }),
        { status: 502, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const xml = await response.text();
    const allItems = parseRssItems(xml);
    const items = allItems.slice(0, maxItems).map((item) => ({
      ...item,
      pubDate: formatDate(item.pubDate),
    }));

    return new Response(
      JSON.stringify({ status: 'ok', items }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=600, s-maxage=900',
        },
      },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(
      JSON.stringify({ status: 'error', message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
