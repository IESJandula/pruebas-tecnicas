
import { mount } from '@vue/test-utils';
import Inicio from '@/components/Inicio.vue';


describe('Inicio', () => {
  it('renders properly', async () => {
    const wrapper = mount(Inicio);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('h1').text()).toBe('Bazar Online');

    expect(wrapper.find('.search-input')).toBeTruthy();
    expect(wrapper.find('.btn')).toBeTruthy();

    // Add more assertions as needed to test other elements and functionalities
  });

  // Add more tests for functionality such as searching, clicking buttons, etc.
});