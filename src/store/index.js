import { createStore } from 'vuex'
import {Music} from './Music/index'
import {Mv} from './Mv/index'
import {Common} from './common.js'
export default createStore({
  modules: {
    Music,
    Mv,
    Common
  }
})
