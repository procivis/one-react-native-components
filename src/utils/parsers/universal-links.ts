import parseUrl from 'parse-url';

export const parseUniversalLink = (universalLink: string): string | undefined => {
  let parsedUrl: parseUrl.ParsedUrl;
  try {
    parsedUrl = parseUrl(universalLink);
  } catch (e) {
    return undefined;
  }

  if (parsedUrl.parse_failed) {
    return undefined;
  }
  const protocol = parsedUrl.protocol as string;
  if (!['http', 'https'].includes(protocol)) {
    return undefined;
  }
  if (!parsedUrl.pathname.startsWith('/app-link/')) {
    return undefined;
  }
  if (parsedUrl.pathname === '/app-link/schema') {
    return parsedUrl.query.url;
  }
  const originalProtocol = parsedUrl.pathname.split('/').pop();
  return `${originalProtocol}://?${parsedUrl.search}`;
};
