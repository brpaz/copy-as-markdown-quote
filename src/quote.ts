export function formatQuote(text: string, sourceURL: string): string {
  // Split the selected text into lines
  const lines = text.split('\n')

  // Add a Markdown quote symbol '>' to each line
  const quotedLines = lines.map((line) => `> ${line}`).join('\n')

  // Markdown quote with reference URL
  const markdownQuote = `${quotedLines} [${sourceURL}](${sourceURL})`

  return markdownQuote
}
