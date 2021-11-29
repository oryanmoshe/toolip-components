export class ToolipListItem extends HTMLElement {
  #li: HTMLLIElement;
  static get observedAttributes() {
    return ['label'];
  }

  constructor() {
    super();
    console.log('New ToolipListItem object has been instantiated');

    this.id = this.getAttribute('id') || this.id;
    this.attachShadow({ mode: 'open' });

    this.#li = document.createElement('li');
    this.#li.id = this.id;
    this.shadowRoot?.appendChild(this.#li);

    this.label = this.getAttribute('label') || null;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'label':
        this.#li.textContent = newValue;
        break;
    }
  }

  get label() {
    return this.getAttribute('label');
  }

  set label(value: string | undefined | null) {
    if (value) {
      this.setAttribute('label', value);
    }
  }
}

export const register = () =>
  window.customElements.get('toolip-list-item') ||
  window.customElements.define('toolip-list-item', ToolipListItem);
