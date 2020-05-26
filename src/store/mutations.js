// 状态值的改变方法,操作状态值
// 提交mutations是更改Vuex状态的唯一方法
export const increment = (state, m) => {
    // state.count = state.count + 1
    state.count = state.count + m
}
export const decrement = (state, m) => {
    state.count = state.count - m
}

export const SET_EDIT = (state,m)=>{
    state.edit = m;
}
export const CLEAR_EDIT = (state,m) =>{
    state.edit = null;
}