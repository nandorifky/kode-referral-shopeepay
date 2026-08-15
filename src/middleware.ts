import { defineMiddleware } from 'astro:middleware';
import { NodeHtmlMarkdown } from 'node-html-markdown';

/**
 * Markdown for Agents middleware.
 *
 * When a request includes `Accept: text/markdown`, this middleware converts the
 * HTML response to Markdown using node-html-markdown and returns it with:
 *   - Content-Type: text/markdown; charset=utf-8
 *   - Vary: Accept
 *   - x-markdown-tokens: <estimated token count>
 *   - x-original-tokens: <estimated token count of original HTML>
 *
 * HTML remains the default for browsers and other clients.
 *
 * @see https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */

const nhm = new NodeHtmlMarkdown();

/**
 * Rough token estimate (~4 chars per token, matching common LLM tokenizers).
 */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Check whether the Accept header includes text/markdown.
 */
function wantsMarkdown(request: Request): boolean {
  const accept = request.headers.get('accept') ?? '';
  return accept.includes('text/markdown');
}

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();

  if (!wantsMarkdown(_context.request)) {
    return response;
  }

  // Only convert HTML responses
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('text/html')) {
    return response;
  }

  const html = await response.text();
  const markdown = nhm.translate(html);

  const headers = new Headers(response.headers);
  headers.set('content-type', 'text/markdown; charset=utf-8');

  // Preserve existing Vary values, add Accept
  const existingVary = headers.get('vary');
  headers.set('vary', existingVary ? `${existingVary}, Accept` : 'Accept');

  headers.set('x-markdown-tokens', String(estimateTokens(markdown)));
  headers.set('x-original-tokens', String(estimateTokens(html)));

  // Remove headers that no longer match the converted body
  headers.delete('content-encoding');
  headers.delete('content-range');
  headers.delete('transfer-encoding');
  headers.delete('etag');
  headers.delete('last-modified');

  return new Response(markdown, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
