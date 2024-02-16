import { mount } from '@vue/test-utils';
import HomeBook from '@/views/HomeBook.vue';

describe('HomeBook', () => {
  it('renders properly', async () => {
    const wrapper = mount(HomeBook);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('h1').text()).toBe('Libros de lectura');

    expect(wrapper.find('#pages-filter')).toBeTruthy();
    expect(wrapper.find('#genre-filter')).toBeTruthy();

    expect(wrapper.find('.left-column h2').text()).toBe('Disponibles');
    expect(wrapper.find('.right-column h2').text()).toBe('Leyendo actualmente');

    expect(wrapper.findAll('.books-container')).toHaveLength(2);
    expect(wrapper.findAll('.books-container .Book')).toBeTruthy(); // Assuming Book component has a class named "Book"
  });

  // Add more tests for functionality such as filtering, moving books, etc.
});
