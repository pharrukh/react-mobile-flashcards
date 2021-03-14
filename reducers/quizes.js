import { START_QUIZ } from "../actions";

function quizes(state = {}, action) {
  switch (action.type) {
    case START_QUIZ:
      return {
        ...state,
        didQuizToday: true
      }
    default:
      return {
        ...state,
        didQuizToday: false
      }
  }
}

export default quizes