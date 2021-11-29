import { createServer } from 'miragejs';

export const getList = async (src: string) => {
  return fetch(src).then(res => res.json());
};
export const randomStr = () => (Math.random() + 1).toString(36).substring(7);

export const mockServer = () =>
  createServer({
    routes() {
      this.get('/api/items', () => ({
        items: ['Nuggets', 'Cola', 'Burger', 'Chicken'],
      }));
      this.get('/api/people', () => ({
        items: ['Noam', 'Oryan', 'Dana', 'Vardit'],
      }));
    },
  });
