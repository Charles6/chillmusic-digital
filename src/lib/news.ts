export interface NewsItem {
  source: string;
  title: string;
  description: string;
  link: string;
}

const FEED_SOURCES = [
  {
    source: "Reuters",
    urls: [
      "https://feeds.reuters.com/reuters/worldNews",
      "https://news.google.com/rss/search?q=site%3Areuters.com%2Fworld&hl=en-US&gl=US&ceid=US%3Aen",
    ],
  },
  {
    source: "BBC",
    urls: [
      "https://feeds.bbci.co.uk/news/world/rss.xml",
      "https://feeds.bbci.co.uk/news/rss.xml",
    ],
  },
  {
    source: "Associated Press",
    urls: [
      "https://news.google.com/rss/search?q=site%3Aapnews.com&hl=en-US&gl=US&ceid=US%3Aen",
      "https://news.google.com/rss/search?q=site%3Aapnews.com%2Fhub&hl=en-US&gl=US&ceid=US%3Aen",
    ],
  },
];

const KV_CACHE_KEY = "news:cache";

function decodeEntities(value = "") {
  return value
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#160;/g, " ")
    .replace(/&#xA0;/gi, " ");
}

function stripHtml(value = "") {
  return decodeEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseFeedItems(xml: string, source: string): NewsItem[] {
  return [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)]
    .map((match) => match[0])
    .map((itemXml) => {
      const title = itemXml.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
      const description = itemXml.match(/<description>([\s\S]*?)<\/description>/i)?.[1] ?? "";
      const link = itemXml.match(/<link>([\s\S]*?)<\/link>/i)?.[1] ?? "";
      return {
        source,
        title: stripHtml(title),
        description: stripHtml(description),
        link: decodeEntities(link).trim(),
      };
    })
    .filter((item) => item.title && item.link)
    .slice(0, 10);
}

async function fetchFreshNews(): Promise<NewsItem[]> {
  const groupedItems: NewsItem[][] = [];

  for (const feedSource of FEED_SOURCES) {
    let items: NewsItem[] = [];

    for (const url of feedSource.urls) {
      try {
        const response = await fetch(url, {
          headers: {
            "user-agent": "Mozilla/5.0",
            accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
          },
        });
        if (!response.ok) continue;
        const xml = await response.text();
        items = parseFeedItems(xml, feedSource.source);
        if (items.length) break;
      } catch {
        // try next URL
      }
    }

    if (items.length) {
      groupedItems.push(items.slice(0, 4));
    }
  }

  if (!groupedItems.length) return [];

  const maxLength = Math.max(...groupedItems.map((g) => g.length));
  const result: NewsItem[] = [];

  for (let i = 0; i < maxLength; i++) {
    for (const group of groupedItems) {
      if (group[i]) result.push(group[i]);
    }
  }

  return result;
}

/**
 * Returns news items, using KV as a cache.
 * Pass `kv = null` to skip caching (e.g. during local dev without Workers).
 */
export async function getNews(kv: KVNamespace | null, ttlSeconds = 300): Promise<NewsItem[]> {
  if (kv) {
    const cached = await kv.get(KV_CACHE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached) as NewsItem[];
      } catch {
        // corrupt cache — fall through
      }
    }
  }

  const items = await fetchFreshNews();

  if (kv && items.length) {
    await kv.put(KV_CACHE_KEY, JSON.stringify(items), { expirationTtl: ttlSeconds });
  }

  return items;
}
