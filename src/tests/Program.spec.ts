import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import Program from '@/components/Program/Program.vue'
import ProgramRound from '@/components/Program/ProgramRound.vue'

describe('Program.vue', () => {
  let wrapper: any

  describe('when schedule is empty', () => {
    let store: any

    beforeEach(() => {
      store = createStore({
        state: () => ({
          schedule: [],
        }),
        getters: {
          raceSchedule: (state: any) => state.schedule,
        },
      })

      wrapper = shallowMount(Program, {
        global: {
          plugins: [store],
          stubs: { ProgramRound },
        },
        mocks: {
          $style: {
            wrapper: 'wrapper',
            title: 'title',
            empty: 'empty',
          },
        },
      })
    })

    it('renders the title', () => {
      expect(wrapper.find('h3').text()).toBe('Race Program')
    })

    it('does not render ProgramRound', () => {
      const rounds = wrapper.findAllComponents(ProgramRound)
      expect(rounds).toHaveLength(0)
    })
  })

  describe('when schedule has rounds', () => {
    const scheduleData = [
      { round: 1, horses: ['Horse A', 'Horse B'] },
      { round: 2, horses: ['Horse C', 'Horse D'] },
    ]
    let store: any

    beforeEach(() => {
      store = createStore({
        state: () => ({
          schedule: scheduleData,
        }),
        getters: {
          raceSchedule: (state: any) => state.schedule,
        },
      })

      wrapper = shallowMount(Program, {
        global: {
          plugins: [store],
          stubs: { ProgramRound },
        },
        mocks: {
          $style: {
            wrapper: 'wrapper',
            title: 'title',
            empty: 'empty',
          },
        },
      })
    })

    it('renders ProgramRound components for each round', () => {
      const rounds = wrapper.findAllComponents(ProgramRound)
      expect(rounds).toHaveLength(scheduleData.length)
      expect(rounds[0].props('round')).toEqual(scheduleData[0])
      expect(rounds[1].props('round')).toEqual(scheduleData[1])
    })
  })
})
