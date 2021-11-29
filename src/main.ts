import('./components/ToolipList').then(obj => obj.register());
import('./components/ToolipListItem').then(obj => obj.register());
const server = import('./utils').then(obj => obj.mockServer());
// const app = document.querySelector<HTMLDivElement>('#app')!
//
