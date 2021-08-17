export const Common = {
    namespaced: true,
    state: () => ({
        // el-table 视口高度
        tableHeigh : 0,
        // 歌词高度
        lyricHeigh : 0,
    }),
    mutations: {
        updatetableHeigh(state,value){
            state.tableHeigh = value
        },
        updatelyricHeigh(state,value){
            state.lyricHeigh = value
        }
    },
    actions: {},
    getters: {}
}