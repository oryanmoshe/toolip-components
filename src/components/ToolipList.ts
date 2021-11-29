import { getList, randomStr } from '../utils';
import { ToolipListItem } from './ToolipListItem';

/* export type ToolipListProps = {
  items?: string[];
  src?: string;
  filter?: string;
};
 */
export class ToolipList extends HTMLElement {
  #_items: string[];
  #input: HTMLInputElement;
  #srcInput: HTMLInputElement;
  #ul: HTMLUListElement;

  static get observedAttributes() {
    return ['src', 'filter'];
  }

  // constructor({ items, src, filter }: ToolipListProps = {items:[], src:'/api/items', filter:undefined}) {
  // constructor({ items, src, filter }: ToolipListProps = {}) {
  constructor() {
    super();
    console.log('New Toolip List object has been instantiated');

    this.#_items = [];
    this.attachShadow({ mode: 'open' });
    if (!this.getAttribute('id')) {
      this.id = randomStr();
    }

    /* this.src = this.getAttribute('src') || null;
    this.filter = this.getAttribute('filter') || undefined; */

    this.#srcInput = document.createElement('input');
    this.#srcInput.id = randomStr();
    this.#srcInput.type = 'text';
    this.#srcInput.value = '';
    this.#srcInput.placeholder = 'List items source';
    this.#srcInput.addEventListener(
      'change',
      (e: Event) => (this.src = (<HTMLInputElement>e.target).value),
    );

    this.#input = document.createElement('input');
    this.#input.id = randomStr();
    this.#input.type = 'text';
    this.#input.placeholder = 'Filter items';
    this.#input.addEventListener(
      'keyup',
      (e: KeyboardEvent) => (this.filter = (<HTMLInputElement>e.target).value),
    );

    this.#ul = document.createElement('ul');
    this.#ul.id = randomStr();

    const style = document.createElement('style');
    style.textContent = `
      * {
        font-size: 1.5rem;
      }
    `;

    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(
      <Node>(
        document
          .createElement('span')
          .appendChild(document.createTextNode('Items source: ')).parentNode
      ),
    );
    this.shadowRoot?.appendChild(this.#srcInput);
    this.shadowRoot?.appendChild(document.createElement('br'));
    this.shadowRoot?.appendChild(
      <Node>(
        document
          .createElement('span')
          .appendChild(document.createTextNode('Filter items: ')).parentNode
      ),
    );
    this.shadowRoot?.appendChild(this.#input);
    this.shadowRoot?.appendChild(this.#ul);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'src':
        this.#srcInput.value = newValue;
        getList(newValue).then(dat => {
          this.#_items = dat.items;
          this.updateList();
        });
        break;
      case 'filter':
        this.#input.value = newValue;
        this.updateList();
        break;
    }
  }

  get items() {
    return this.#_items.filter(
      item => item.toLowerCase().indexOf(this.filter || '') !== -1,
    );
  }

  set items(_) {
    console.error(
      'Cannot set items directly. Please change the src attribute instead',
    );
  }

  get src() {
    return this.getAttribute('src');
  }

  set src(value) {
    if (value) {
      this.setAttribute('src', value);
    }
  }

  get filter() {
    return this.getAttribute('filter')?.toLowerCase();
  }

  set filter(value) {
    if (value) {
      this.setAttribute('filter', value);
    } else {
      this.removeAttribute('filter');
    }
  }

  updateList() {
    const lis: ToolipListItem[] = this.items.map(item => {
      const el = new ToolipListItem();
      el.label = item;
      el.id = randomStr();
      return el;
    });

    this.#ul.innerHTML = lis.map(li => li.outerHTML).join('');
  }
}

export const register = () =>
  window.customElements.get('toolip-list') ||
  window.customElements.define('toolip-list', ToolipList);
