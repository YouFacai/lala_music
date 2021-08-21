export const Mv = {
    namespaced: true,
    state: () => ({
        // 当前播放的Mv ID
        currentID:null
    }),
    mutations: {
        updateCurrentID(state,value){
            state.currentID = value
        }
    },
    actions: {},
    getters: {}
}