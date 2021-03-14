import { combineReducers } from "redux"
import quizes from "./quizes"
import decks from './decks'

export const reducers = combineReducers({ decks, quizes })
