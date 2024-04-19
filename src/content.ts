import browser from 'webextension-polyfill'
import {
  COPY_SELECTION_TEXT_ACTION,
  COPY_SELECTION_HTML_ACTION,
} from './constants'
import { markdownQuoteFromText, markdownQuoteFromHTML } from './quote'

interface CopySelectionMessage {
  action: typeof COPY_SELECTION_TEXT_ACTION | typeof COPY_SELECTION_HTML_ACTION
  text: string
  url: string
}

browser.runtime.onMessage.addListener((message: CopySelectionMessage) => {
  console.info('Received message in content script: ', message)

  if (message.action === COPY_SELECTION_TEXT_ACTION) {
    const markdownQuote = markdownQuoteFromText(message.text, message.url)
    navigator.clipboard.writeText(markdownQuote)
  }

  if (message.action === COPY_SELECTION_HTML_ACTION) {
    const selection = getSelectedHTML()
    console.log('Selected HTML: ', selection)
    const markdownQuote = markdownQuoteFromHTML(selection, message.url)
    navigator.clipboard.writeText(markdownQuote)
  }
})

/**
 * Get the selected HTML content
 */
function getSelectedHTML() {
  // https://stackoverflow.com/a/40087980/1181553
  const range = window?.getSelection()?.getRangeAt(0)

  if (!range) {
    return ''
  }

  var div = document.createElement('div')
  div.appendChild(range.cloneContents()) // Get the document fragment from selected range
  return div.innerHTML // Return the actual HTML
}
