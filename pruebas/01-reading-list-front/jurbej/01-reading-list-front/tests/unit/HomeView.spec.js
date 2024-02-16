import { mount } from '@vue/test-utils';
import HomeView from '@/components/views/HomeView.vue';

describe('HomeView', () => {
  it('renders a list of books', () => {
    const wrapper = mount(HomeView);
    expect(wrapper.findAll('.libros')).toHaveLength(1);
  });
});
