import browser from 'webextension-polyfill'
import { CONTEXT_MENU_ITEM_ID, COPY_SELECTION_ACTION } from './constants'

browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: CONTEXT_MENU_ITEM_ID,
    title: 'Copy as Markdown Quote',
    contexts: ['selection'],
  })
})

browser.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === CONTEXT_MENU_ITEM_ID) {
    if (tab?.id) {
      browser.tabs.sendMessage(tab.id, {
        action: COPY_SELECTION_ACTION,
        text: info.selectionText,
        url: tab.url,
      })
    }
  }
})
