import { loginApi, logout, getInfoApi } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

// const getDefaultState = () => {
//   return {
//     token: getToken(),
//     name: '',
//     avatar: ''
//   }
// }

// const state = getDefaultState()
const state = {
  user:null,
}

const mutations = {
  RESET_STATE: (state,payload) => {
    Object.assign(state, payload)
  },
  setAuthentication: (state, authentication) => {
  },
  setUser: (state, payload) => {
    state.user = payload
  },
  setLoginPwd: (state, loginPwd) => {
    state.loginPwd = loginPwd
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginApi(userInfo).then(response => {
        const { data } = response
        if(data){
          commit('setUser',data)
          resolve(data)
        }
        else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfoApi().then(response => {
        const { data } = response;
        if (data) {
          commit('setUser',data);
          resolve();
        }else{
          reject(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('RESET_STATE',{user:null});
      localStorage.removeItem('authentication');
      resolve();
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

