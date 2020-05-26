//actions 注册事件处理函数，当这个函数被触发时，将状态提交到 mutaions中处理
export const increment = ({ commit },m) => commit('increment',m)
export const decrement = ({ commit },m) => commit('decrement',m)