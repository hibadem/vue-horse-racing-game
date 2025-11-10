import { createStore } from 'vuex'
import type { RaceRound, RaceResult, Horse, ModalState } from '@/types/race'

interface State {
  horses: Horse[]
  schedule: RaceRound[]
  results: RaceResult[]
  positions: number[]
  modalContent: {
    title: string
    desc: string
  }
  currentRound: number
  isRunning: boolean
  isModalVisible: boolean
  isProgramVisible: boolean
}

function randomCondition(): number {
  return Math.floor(Math.random() * 100) + 1
}

const horseNames = [
  'Thunderstrike',
  'Midnight Comet',
  'Silver Arrow',
  'Desert Mirage',
  'Storm Chaser',
  'Shadow Dancer',
  'Ironhoof',
  'Wildfire',
  'Golden Blaze',
  'Eclipse Runner',
  'Mystic Wind',
  'Phantom Spirit',
  'Crimson Bolt',
  'Night Fury',
  'Blazing Star',
  'Arctic Flame',
  'Black Widow',
  'Silent Storm',
  'Inferno Rush',
  'Sapphire Dream',
]

const uniqueColors = [
  { name: 'Red', code: '#FF0000' },
  { name: 'Blue', code: '#0000FF' },
  { name: 'Green', code: '#008000' },
  { name: 'Yellow', code: '#FFFF00' },
  { name: 'Purple', code: '#800080' },
  { name: 'Orange', code: '#FFA500' },
  { name: 'Pink', code: '#FFC0CB' },
  { name: 'Brown', code: '#8B4513' },
  { name: 'Cyan', code: '#00FFFF' },
  { name: 'Gray', code: '#808080' },
  { name: 'Crimson', code: '#DC143C' },
  { name: 'Steel Blue', code: '#4682B4' },
  { name: 'Gold', code: '#FFD700' },
  { name: 'Spring Green', code: '#00FF7F' },
  { name: 'Firebrick', code: '#B22222' },
  { name: 'Indigo', code: '#4B0082' },
  { name: 'Turquoise', code: '#40E0D0' },
  { name: 'Dark Brown', code: '#A52A2A' },
  { name: 'Chartreuse', code: '#7FFF00' },
  { name: 'Deep Pink', code: '#FF1493' },
]

export default createStore<State>({
  state: {
    horses: [],
    schedule: [],
    results: [],
    positions: [],
    currentRound: 0,
    isRunning: false,
    isProgramVisible: false,
    isModalVisible: false,
    modalContent: { title: '', desc: '' },
  },
  getters: {
    raceSchedule: (state: State) => state.schedule,
    raceResults: (state: State) => state.results,
    modalState: (state: State) => ({ visible: state.isModalVisible, content: state.modalContent }),
    currentRoundData: (state: State) => state.schedule[state.currentRound] || {},
    currentHorses: (state: State, getters: any) => getters.currentRoundData.horses || [],
    positions: (state: State) => state.positions || [],
    isRacing: (state: State) => state.isRunning,
    trackWidth: (state: State, getters: any) => {
      const distance = getters.currentRoundData.distance || 1200
      return Math.min(1200, distance * 0.5)
    },
  },
  mutations: {
    generateHorses(state: State) {
      state.horses = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: horseNames[i]!,
        condition: randomCondition(),
        color: uniqueColors[i]!.name,
        colorCode: uniqueColors[i]!.code,
        isRacing: false,
      }))
    },
    generateSchedule(state: State) {
      const lengths = [1200, 1400, 1600, 1800, 2000, 2200]
      state.schedule = lengths.map((len, index) => ({
        round: index + 1,
        distance: len,
        horses: [...state.horses].sort(() => 0.5 - Math.random()).slice(0, 10),
      }))
      state.results = []
      state.currentRound = 0
    },
    startRace(state: State) {
      state.isRunning = true
    },
    pauseRace(state: State) {
      state.isRunning = false
    },
    setRunning(state: State, value: boolean) {
      state.isRunning = value
    },
    nextRound(state: State, payload: RaceResult) {
      state.results.push(payload)
      if (state.currentRound < state.schedule.length - 1) {
        state.currentRound++
      }
    },
    toggleProgramVisibility(state: State, value: boolean) {
      state.isProgramVisible = value
    },
    updateHorsePosition(state: State, { index, value }: { index: number; value: number }) {
      state.positions[index] = value
    },
    resetHorsePositions(state: State) {
      state.positions = Array(10).fill(0)
    },
    resetSchedule(state: State) {
      state.schedule = []
    },
    toggleModal(state: State, value: ModalState) {
      state.isModalVisible = value.visible
      state.modalContent.title = value.title || 'Program Not Created'
      state.modalContent.desc =
        value.desc || 'Please create a program first, then you can start the race.'
    },
  },
  actions: {
    generateProgram({ commit }: any) {
      commit('generateSchedule')
      commit('toggleProgramVisibility', true)
    },
    toggleRace({ state, commit, dispatch }: any) {
      if (state.results.length === 6) {
        commit('toggleModal', {
          visible: true,
          title: 'PROGRAM FINISHED!',
          desc: 'Please generate a new program',
        })
        return
      }
      if (!state.isProgramVisible) {
        commit('toggleModal', { visible: true })
        return
      }

      dispatch('startRace')
    },
    async startRace({ state, commit }: any) {
      if (state.isRunning) return
      commit('setRunning', true)

      const currentRoundData = state.schedule[state.currentRound]
      if (!currentRoundData) {
        commit('setRunning', false)
        return
      }

      const currentHorses = currentRoundData.horses
      const finishLine = 100
      const startTime = Date.now()
      const finishTimes: { index: number; elapsed: number }[] = []

      const runners = currentHorses.map((horse: Horse, i: number) => {
        horse.isRacing = true
        return new Promise<void>((resolve) => {
          const speed = Math.max(3, 10 - horse.condition / 20)
          let pos = 0

          const interval = setInterval(() => {
            pos += Math.random() * speed
            const newPos = Math.min(finishLine, pos)

            commit('updateHorsePosition', { index: i, value: newPos })

            if (pos >= finishLine) {
              clearInterval(interval)
              horse.isRacing = false
              finishTimes.push({ index: i, elapsed: Date.now() - startTime })
              resolve()
            }
          }, 200)
        })
      })

      await Promise.all(runners)

      const ordered = finishTimes
        .slice()
        .sort((a, b) => a.elapsed - b.elapsed)
        .map((f, rank) => {
          const h = currentHorses[f.index]
          return {
            id: h.id,
            name: h.name,
            color: h.color,
            position: rank + 1,
            timeMs: f.elapsed,
          }
        })

      commit('nextRound', {
        round: state.currentRound + 1,
        distance: currentRoundData.distance,
        results: ordered,
      })

      commit('setRunning', false)
      commit('resetHorsePositions')
    },
  },
})
