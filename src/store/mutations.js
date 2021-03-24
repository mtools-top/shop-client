const state = {
    // 返回与底部导航
    active: 0,
    // 购物车数量
    badgeNum: 0
};
const mutations = {
    muActive(state, num) {
        state.active = num
    },
    muBadgeNum(state, num) {
        state.badgeNum = num
    }
};
const getters = {
    active(state) {
        return state.active
    },
    badgeNum(state) {
        return state.badgeNum
    }
}
export {
    state,
    mutations,
    getters
}