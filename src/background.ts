import browser from 'webextension-polyfill'

import {
  CONTEXT_MENU_ITEM_ID,
  COPY_SELECTION_TEXT_ACTION,
  CONTEXT_MENU_COPY_AS_HTML_ITEM_ID,
  CONTEXT_MENU_COPY_AS_TEXT_ITEM_ID,
  COPY_SELECTION_HTML_ACTION,
} from './constants'

browser.runtime.onInstalled.addListener(() => {
  const parentId = browser.contextMenus.create({
    id: CONTEXT_MENU_ITEM_ID,
    title: 'Copy as Markdown Quote',
    contexts: ['selection'],
  })

  browser.contextMenus.create({
    id: CONTEXT_MENU_COPY_AS_HTML_ITEM_ID,
    title: 'Copy as HTML',
    parentId: parentId,
    contexts: ['selection'],
  })

  browser.contextMenus.create({
    id: CONTEXT_MENU_COPY_AS_TEXT_ITEM_ID,
    title: 'Copy as Plain Text',
    parentId: parentId,
    contexts: ['selection'],
  })
})

browser.contextMenus.onClicked.addListener(function (info, tab) {
  if (!tab?.id) {
    return
  }

  if (info.menuItemId === CONTEXT_MENU_COPY_AS_TEXT_ITEM_ID) {
    browser.tabs.sendMessage(tab.id, {
      action: COPY_SELECTION_TEXT_ACTION,
      text: info.selectionText,
      url: tab.url,
    })
  }

  if (info.menuItemId === CONTEXT_MENU_COPY_AS_HTML_ITEM_ID) {
    browser.tabs.sendMessage(tab.id, {
      action: COPY_SELECTION_HTML_ACTION,
      url: tab.url,
    })
  }
})
