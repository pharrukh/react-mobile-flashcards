import { ADD_DECK, SET_DECK, ADD_CARD, LOAD_DATA } from "../actions"
import { INITIAL_DATA } from "../utils"

function decks(state = {}, action) {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        decks: { ...state.decks || INITIAL_DATA }
      }
    case ADD_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.deck.title]: action.deck
        }
      }
    case SET_DECK:
      return {
        ...state,
        currentDeck: action.title
      }
    case ADD_CARD:
      const deck = state.decks[action.title]
      deck.questions.push(action.question)
      return {
        ...state
      }
    default:
      return state
  }
}

export default decks