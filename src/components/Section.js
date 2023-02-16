export default class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._renderedItems = items
    this._renderer = renderer
    this._container = document.querySelector(selectorContainer)
  }

  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item))
  }

  addItem(element) {
    this._container.append(element)
  }
}
