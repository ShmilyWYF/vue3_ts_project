import aotuCustomCreateApi from "@/axios";
// const userApi =
const userState = {
  name: '',
  avatar: ''
}

const mutations = {
  SET_USER_NAME: (user: any, option: string) => {
    user.name = option
  },
  SET_USER_AVATAR: (user: any, option: string) => {
    user.avatar = option
  }
}

const actions = {
  login ({ commit }: any, option: { data: null }) {
    return new Promise((resolve: any, reject: any) => {
      aotuCustomCreateApi.userApi.test(option).then((res: any) => {
      // customCreateApi.userApi.test(option).then((res: any) => {
        const data = res.data
        commit('SET_USER_NAME', res.data)
        resolve(data)
      }, (error: any) => {
        console.log(error)
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  userState,
  mutations,
  actions
}
