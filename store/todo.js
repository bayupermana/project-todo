import { TODO_API, BASE_API } from '~/constants/api'
import { chunkArray } from '~/utils'

export const NAMESPACE = 'todo'

export const MUTATION_TYPES = {
  SET_TODO: 'SET_TODO',
  ADD_TODO: 'ADD_TODO',
  EDIT_TODO: 'EDIT_TODO',
  SET_SEARCH_TODO: 'SET_SEARCH_TODO',
  RESET_DATA: 'RESET_DATA',
  DELETE_TODO: 'DELETE_TODO'
}

export const ACTION_TYPES = {
  GET_TODO: 'GET_TODO',
  ADD_TODO: 'ADD_TODO',
  EDIT_TODO: 'EDIT_TODO',
  SEARCH_TODO: 'SEARCH_TODO',
  RESET_DATA: 'RESET_DATA',
  DELETE_TODO: 'DELETE_TODO',
}

export const state = () => ({
  todoData: '',
  todoFormatedData: '',
  todoLength: 0,
})

export const mutations = {
  [MUTATION_TYPES.SET_TODO](state, data) {
    state.todoDatas = data
    state.todoFormatedData = chunkArray(state.todoDatas, 3)
    state.todoLength = state.todoDatas.length
  },
  [MUTATION_TYPES.ADD_TODO](state, data) {
    state.todoDatas.push(data)
    state.todoFormatedData = chunkArray(state.todoDatas, 3)
    state.todoLength = state.todoDatas.length
  },
  [MUTATION_TYPES.EDIT_TODO](state, data) {
    const postIndex = state.todoDatas.findIndex(
      post => post.id === data.id
    )
    state.todoDatas[postIndex] = data
    state.todoFormatedData = chunkArray(state.todoDatas, 3)
    state.todoLength = state.todoDatas.length
  },
  [MUTATION_TYPES.SET_SEARCH_TODO](state, searchData) {
    state.todoFormatedData = chunkArray(searchData, 3)
    state.todoLength = searchData.length
  },
  [MUTATION_TYPES.RESET_DATA](state) {
    state.todoFormatedData = chunkArray(state.todoDatas, 3)
    state.todoLength = state.todoDatas.length
  },
  [MUTATION_TYPES.DELETE_TODO](state, id) {
    const postIndex = state.todoDatas.findIndex(
      post => post.id === id
    )
    state.todoDatas.splice(postIndex, 1)
    state.todoFormatedData = chunkArray(state.todoDatas, 3)
    state.todoLength = state.todoDatas.length
  },
}

export const getters = {
  getSeries(state) {
    return state?.todoData || []
  }
}

export const actions = {
  async [ACTION_TYPES.GET_TODO]({ commit }) {
    return this.$axios
      .$get(TODO_API)
      .then(data => {
        const postsArray = [];
        for (const key in data) {
          postsArray.push({ ...data[key], id: key });
        }
        commit(MUTATION_TYPES.SET_TODO, postsArray);
      })
      .catch(e => console.log(e));
  },
  async [ACTION_TYPES.ADD_TODO]({ commit }, post) {
    const createdPost = {
      ...post,
      updated_at: new Date(),
      created_at: new Date()
    };
    return this.$axios
      .$post(TODO_API,
        createdPost
      )
      .then(data => {
        commit(MUTATION_TYPES.ADD_TODO, { ...createdPost, id: data.name })
      })
      .catch(e => console.log(e))
  },
  async [ACTION_TYPES.EDIT_TODO]({ commit }, editedPost) {
    const formData = {
      name: editedPost.name,
      content: editedPost.content,
      updated_at: editedPost.updated_at,
      created_at: editedPost.created_at
    }
    return this.$axios
      .$put(
        BASE_API + '/todo/' + editedPost.id + ".json",
        formData
      )
      .then(res => {
        commit(MUTATION_TYPES.EDIT_TODO, editedPost);
      })
      .catch(e => console.log(e))
  },
  async [ACTION_TYPES.SEARCH_TODO]({ state, commit }, searchText) {
    const query = searchText.toLowerCase()
    const searchData = state.todoDatas.filter(item => item.name.toLowerCase().indexOf(query) >= 0)
    commit(MUTATION_TYPES.SET_SEARCH_TODO, searchData)
  },
  async [ACTION_TYPES.RESET_DATA]({ commit }) {
    commit(MUTATION_TYPES.RESET_DATA)
  },
  async [ACTION_TYPES.DELETE_TODO]({ commit }, data) {
    return this.$axios
      .$delete(
        BASE_API + '/todo/' + data.id + ".json"
      )
      .then(res => {
        commit(MUTATION_TYPES.DELETE_TODO, data.id);
      })
      .catch(e => console.log(e))
  },
}
