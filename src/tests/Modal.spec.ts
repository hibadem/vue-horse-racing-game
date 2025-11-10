import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Modal from '@/components/UI/Modal.vue'

describe('Modal.vue', () => {
  let store: any

  beforeEach(() => {
    store = createStore({
      state: {
        isModalVisible: true,
        modalContent: {
          title: 'Test Modal',
          desc: 'This is a description',
        },
      },
      getters: {
        modalState: (state: any) => ({
          visible: state.isModalVisible,
          content: state.modalContent,
        }),
      },
      mutations: {
        toggleModal: (state: any, payload: any) => {
          state.isModalVisible = payload.visible
        },
      },
    })
  })

  it('renders modal content', () => {
    const wrapper = mount(Modal, {
      global: { plugins: [store] },
    })
    expect(wrapper.text()).toContain('Test Modal')
    expect(wrapper.text()).toContain('This is a description')
  })

  it('closes modal on button click', async () => {
    const wrapper = mount(Modal, { global: { plugins: [store] } })
    await wrapper.find('button').trigger('click')
    expect(store.state.isModalVisible).toBe(false)
  })
})
