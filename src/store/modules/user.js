import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    roles: [] // 角色
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 登录逻辑
  async login({ commit }, userInfo) {
    const { username, password, power } = userInfo
    try {
        const response = await login({ username, password, power })
      if (response.success) {
        const token = response.data // 从后端返回的 data 中获取 token
        commit('SET_TOKEN', token)
        setToken(token)
        return { success: true }
      } else {
        return { success: false, message: response.message }
      }
    } catch (error) {
      throw error
    }
  },

  // 获取用户信息
  async getInfo({ commit, state }) {
    try {
      // 模拟后端返回的用户角色信息，临时设置角色和用户数据
      const roles = ['teacher'] // 替换为 'student', 'admin' 等
      const name = '教师用户'
      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      return { roles, name }
    } catch (error) {
      throw error
    }
  },

  // 用户登出
  async logout({ commit }) {
    try {
      await logout()
      removeToken()
      resetRouter()
      commit('RESET_STATE')
    } catch (error) {
      console.error('登出失败:', error)
      throw error
    }
  },

  // 重置 token
  resetToken({ commit }) {
    removeToken()
    commit('RESET_STATE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
