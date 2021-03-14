import { START_QUIZ } from "../actions";
import { DAILY_QUIZ_KEY } from '../utils'
import AsyncStorage from '@react-native-async-storage/async-storage'

function quizes(state = {}, action) {
  switch (action.type) {
    case START_QUIZ:
      AsyncStorage.setItem(DAILY_QUIZ_KEY, true)
      return {
        ...state,
        didQuizToday: true
      }
    default:
      AsyncStorage.setItem(DAILY_QUIZ_KEY, false)
      return {
        ...state,
        didQuizToday: false
      }
  }
}

export default quizes