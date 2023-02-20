export default class Section {
  constructor({ renderer }, selectorContainer) {
    this._renderer = renderer
    this._container = document.querySelector(selectorContainer)
  }

  prependAddItem(element) {
    this._container.prepend(element)
  }

  renderItems(elements) {
    elements.forEach(this._renderer)
  }

  addItem(element) {
    this._container.append(element)
  }
}
