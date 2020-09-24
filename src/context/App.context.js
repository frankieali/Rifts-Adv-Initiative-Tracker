import React, { createContext, useReducer } from 'react'

import { distributeInteger } from '../utils'

const appInitialState = {
  characters: {},
  favorites: {},
  orientation: 'horizontal',
  rounds: 26,
  round: 26,
  // minRound: 1
}
export const AppContext = createContext()

const appReducer = (state, action) => {
  switch (action.type) {
    case 'update': return ({
      ...state,
      ...action.appData
    })
    case 'setRounds': {
      const inits = Object.values(state.characters).map(character => character.init)
      const maxInit = Math.max(...inits)
      const rounds = maxInit >= action.rounds ? maxInit : action.rounds
      const round = state.round > rounds ? rounds : state.round
      return ({
        ...state,
        round,
        rounds
      })
    }
    case 'setRound': return ({
      ...state,
      round: action.round
    })
    case 'toggleOrientation': return ({
      ...state,
      orientation: state.orientation === 'horizontal' ? 'vertical' : 'horizontal'
    })
    case 'addCharacter': {
      const id = Object.keys(state.characters).length
      const character = {
        attacks: 1, // default values just in case
        init: 1, // default values just in case
        ...action.character
      }
      const rounds = character.init > state.rounds ? character.init : state.rounds
      // calculate attackRounds
      character.attackRounds = distributeInteger(character.init,character.attacks)
      // const minRound = Math.min(...character.attackRounds) < state.minRound ? Math.min(...character.attackRounds) : state.minRound
      return ({
        ...state,
        rounds,
        // minRound,
        characters: {
          ...state.characters,
          [id]: character
        }
      })
    }
    case 'updateInit': {
      const rounds = action.init > state.rounds ? action.init : state.rounds
      return ({
        ...state,
        rounds,
        characters: {
          ...state.characters,
          [action.id]: {
            ...state.characters[action.id],
            init: action.init,
            attackRounds: distributeInteger(action.init,state.characters[action.id].attacks)
          }
        }
      })
    }
    default: throw new Error('Unexpected action')
  }
}

export const AppProvider = (props) => {
  const appData = useReducer(appReducer, appInitialState)
  return (
    <AppContext.Provider value={appData}> 
      {props.children}
    </AppContext.Provider>
  )
}

export const AppConsumer = AppContext.Consumer