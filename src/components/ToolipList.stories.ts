import { Story, Meta } from '@storybook/html';
import { ToolipList, register as registerToolipList } from './ToolipList';
import { register as registerToolipListItem } from './ToolipListItem';

export default {
  title: 'Example/ToolipList',
  argTypes: {
    src: {
      control: { type: 'select' },
      options: ['/api/people', '/api/items'],
    },
    filter: {
      control: 'text',
    },
  },
} as Meta;

const Template: Story = args => {
  registerToolipList();
  registerToolipListItem();
  const tl = new ToolipList();
  tl.src = args.src || '';
  tl.filter = args.filter || '';
  return tl;
};

export const Items = Template.bind({});
Items.args = {
  src: '/api/items',
};

export const People = Template.bind({});
People.args = {
  src: '/api/people',
};

export const FilteredPeople = Template.bind({});
FilteredPeople.args = {
  src: '/api/people',
  filter: 'o',
};
