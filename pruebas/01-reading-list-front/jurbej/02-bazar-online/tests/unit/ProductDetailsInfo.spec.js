import { mount } from '@vue/test-utils';
import ProductDetailsInfo from '@/components/ProductDetailsInfo.vue';

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    const wrapper = mount(ProductDetailsInfo, {
      props: {
        image: 'product-image.jpg',
        title: 'Sample Product',
        description: 'This is a sample product description.',
        price: 19.99,
        rating: 4,
        brand: 'Sample Brand',
        stock: 10,
        imagesArray: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg'],
      },
    });

    // Assert that the rendered HTML contains product details
    expect(wrapper.text()).toContain('Sample Product - Sample Brand');
    expect(wrapper.find('.img-principal').attributes('src')).toBe('product-image.jpg');
    expect(wrapper.find('.other-img img').attributes('src')).toBe('img3.jpg');
    expect(wrapper.find('h4').text()).toBe('19.99€');
    expect(wrapper.find('p').text()).toContain('10 disponibles');
    expect(wrapper.findAll('.star').length).toBe(4); // Assuming a rating of 4

    // Trigger the addToCart method and assert that it emits the addToCart event
    wrapper.find('.boton').trigger('click');
    expect(wrapper.emitted('addToCart')).toHaveLength(1);

    // Additional assertions can be added based on your component's logic and behavior
  });
});

