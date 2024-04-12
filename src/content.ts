import browser from 'webextension-polyfill'
import { COPY_SELECTION_ACTION } from './constants'
import { formatQuote } from './quote'

interface CopySelectionMessage {
  action: typeof COPY_SELECTION_ACTION
  text: string
  url: string
}

browser.runtime.onMessage.addListener((message: CopySelectionMessage) => {
  console.debug('Received message in content script: ', message)
  if (message.action === COPY_SELECTION_ACTION) {
    copyToClipboard(message.text, message.url)
  }
})

// This function must be called in a visible page, such as a browserAction popup
// or a content script. Calling it in a background page has no effect!
function copyToClipboard(text: string, url: string) {
  text = formatQuote(text, url)
  navigator.clipboard.writeText(text)
}
