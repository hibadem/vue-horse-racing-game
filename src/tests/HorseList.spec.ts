import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import HorseList from '@/components/HorseList/HorseList.vue'
import HorseRow from '@/components/HorseList/HorseRow.vue'

describe('HorseList.vue', () => {
  let store: any
  let wrapper: any

  const horsesData = [
    { id: 1, name: 'Horse A', condition: 'Good', color: 'Brown' },
    { id: 2, name: 'Horse B', condition: 'Fair', color: 'Black' },
  ]

  beforeEach(() => {
    store = createStore({
      state: () => ({
        horses: horsesData,
      }),
    })

    wrapper = shallowMount(HorseList, {
      global: {
        plugins: [store],
        stubs: { HorseRow },
      },
      mocks: {
        $style: {
          list: 'list',
          tableWrapper: 'tableWrapper',
          table: 'table',
          title: 'title',
        },
      },
    })
  })

  it('renders the title', () => {
    const title = wrapper.find('h2')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Horse List (1 - 20)')
  })

  it('renders HorseRow components for each horse', () => {
    const rows = wrapper.findAllComponents(HorseRow)
    expect(rows).toHaveLength(horsesData.length)
    expect(rows[0].props('horse')).toEqual(horsesData[0])
    expect(rows[1].props('horse')).toEqual(horsesData[1])
  })
})
