export interface Horse {
  id: number
  name: string
  condition: number
  color: string
  colorCode?: string
  isRacing?: boolean
}

export interface RaceRound {
  round: number
  distance: number
  horses: Horse[]
}

export interface RaceResult {
  round: number
  distance: number
  results: {
    id: number
    name: string
    color: string
    position: number
    timeMs: number
  }[]
}

export interface ModalState {
  visible: boolean
  title: string
  desc: string
}
