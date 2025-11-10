import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import RaceTrack from '@/components/RaceTrack/RaceTrack.vue'
import HorseLane from '@/components/RaceTrack/HorseLane.vue'

describe('RaceTrack.vue', () => {
  let store: any
  let wrapper: any

  const horsesData = [
    { id: 1, name: 'Horse A' },
    { id: 2, name: 'Horse B' },
  ]

  beforeEach(() => {
    store = createStore({
      state: () => ({
        currentRound: 0,
        positions: [0, 50],
      }),
      getters: {
        raceSchedule: () => [{ round: 0, horses: horsesData, distance: 1000 }],
      },
    })

    wrapper = shallowMount(RaceTrack, {
      global: {
        plugins: [store],
        stubs: { HorseLane },
      },
      mocks: {
        $style: {
          track: 'track',
        },
      },
    })
  })

  it('renders the correct number of HorseLane components', () => {
    const lanes = wrapper.findAllComponents(HorseLane)
    expect(lanes).toHaveLength(horsesData.length)
    expect(lanes[0].props('horse')).toEqual(horsesData[0])
    expect(lanes[1].props('horse')).toEqual(horsesData[1])
  })

  it('computes correct track width', () => {
    expect(wrapper.vm.trackWidth).toBe(500)
    expect(wrapper.attributes('style')).toContain('width: 500px')
  })

  it('passes finishLinePos to HorseLane', () => {
    const lanes = wrapper.findAllComponents(HorseLane)
    lanes.forEach((lane) => {
      expect(lane.props('finishLinePos')).toBe(100)
    })
  })
})
