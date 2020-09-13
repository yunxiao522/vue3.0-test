import store from '@/store/index'

export default function rule(router) {
    router.beforeEach((to, from, next) => {
        if(to.fullPath === '/login' && store.state.access_token !== null){
            router.push({path:'/index'})
        }else{
            if(to.meta.auth){
                if(store.state.access_token === null){
                    router.push({path:'/login'})
                }else{
                    next()
                }
            }else {
                next()
            }
        }
    })
}
