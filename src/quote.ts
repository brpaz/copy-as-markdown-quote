export function markdownQuoteFromText(text: string, sourceURL: string): string {
  // Split the selected text into lines
  const lines = text.split('\n')

  // Add a Markdown quote symbol '>' to each line
  const quotedLines = lines.map((line) => `> ${line}`).join('\n')

  // Markdown quote with reference URL
  const markdownQuote = `${quotedLines} [${sourceURL}](${sourceURL})`

  return markdownQuote
}

function replaceTag(str: string, tag: string, replacement: string): string {
  return str
    .replaceAll(`<${tag}> `, ` ${replacement}`)
    .replaceAll(`<${tag}>`, replacement)
    .replaceAll(` </${tag}>`, `${replacement} `)
    .replaceAll(`</${tag}>`, replacement)
}

// Convert HTML to Markdown quote
// Inspired by https://github.com/miniBill/copy-as-markdown/blob/main/background-script.js
export function markdownQuoteFromHTML(html: string, sourceURL: string): string {
  // replace relative links with absolute links
  html = html.replace(/href="([^"]*)"/g, (_: string, href: string) => {
    if (href.startsWith('http')) {
      return `href="${href}"`
    }
    return `href="${new URL(href, sourceURL).href}"`
  })

  html = html
    .replaceAll('</p>\n<p>', '\n> \n> ')
    .replaceAll(
      /<a(?: title="[^"]*")? href="([^"]*)"(?: [a-z]*="[^"]*")*>([^<]*)<\/a>/g,
      (_: string, href: string, label: string) => `[${label}](${href})`,
    )
    .replaceAll(/ class="[^"]*"/g, '')
    .replaceAll('&nbsp;', ' ')
    .replaceAll('<br>', '\n> ')
    .replaceAll(/^-/g, () => '\\-')

  html = replaceTag(html, 'p', '')
  html = replaceTag(html, 'sup', '')
  html = replaceTag(html, 'em', '_')
  html = replaceTag(html, 's', '~~')
  html = replaceTag(html, 'i', '_')
  html = replaceTag(html, 'strong', '**')
  html = replaceTag(html, 'b', '**')
  html = replaceTag(html, 'span', '')

  // Convert everything to a markdown quote
  html = html.replace(/^/gm, '> ')

  return `${html} - [${sourceURL}](${sourceURL})`
}
