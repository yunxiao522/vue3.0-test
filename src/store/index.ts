import {createStore} from 'vuex'

export default createStore({
    state: {
        'access_token': localStorage.getItem('access_token')
    },
    mutations: {},
    actions: {
        setAccessToken(state, msg) {
            localStorage.setItem('access_token', msg)
        }
    },
    modules: {}
})
