import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Results from '@/components/Results/Results.vue'

describe('Results.vue', () => {
  let store: any

  beforeEach(() => {
    store = createStore({
      state: {
        results: [
          {
            round: 1,
            distance: 1200,
            results: [
              { id: 1, name: 'Thunderstrike', color: 'Red' },
              { id: 2, name: 'Silver Arrow', color: 'Blue' },
            ],
          },
        ],
      },
      getters: {
        raceResults: (state: any) => state.results,
      },
    })
  })

  it('renders results', () => {
    const wrapper = mount(Results, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.text()).toContain('1. Round')
    expect(wrapper.text()).toContain('Thunderstrike')
    expect(wrapper.text()).toContain('Silver Arrow')
  })

  it('renders correct number of horses', () => {
    const wrapper = mount(Results, {
      global: { plugins: [store] },
    })
    const items = wrapper.findAll('li')
    expect(items.length).toBe(2)
  })
})
