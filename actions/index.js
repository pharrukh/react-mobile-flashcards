export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const SET_DECK = 'SET_DECK'
export const START_QUIZ = 'START_QUIZ'
export const LOAD_INITIAL = 'LOAD_INITIAL'
export const LOAD_DATA = 'LOAD_DATA'

export function loadData() {
  return {
    type: LOAD_DATA,
  }
}

export function loadInitial(decks) {
  return {
    type: LOAD_INITIAL,
    decks
  }
}

export function addCard(question, deckTitle) {
  return {
    type: ADD_CARD,
    question,
    title: deckTitle
  }
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    deck: {
      title,
      questions: []
    }
  }
}

export function setDeck(title) {
  return {
    type: SET_DECK,
    title
  }
}

export function startQuiz() {
  return {
    type: START_QUIZ
  }
}