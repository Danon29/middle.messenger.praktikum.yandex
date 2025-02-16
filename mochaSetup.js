import { JSDOM } from 'jsdom'

const jsdom = new JSDOM('<!DOCTYPE html><html><body><div id="app"></div></body></html>')

global.window = jsdom.window
global.history = jsdom.window.history
global.document = jsdom.window.document
global.Node = jsdom.window.Node
global.MouseEvent = jsdom.window.MouseEvent
global.XMLHttpRequest = jsdom.window.XMLHttpRequest
