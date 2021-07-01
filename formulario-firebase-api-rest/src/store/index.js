import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router' //para poder retroceder en la dirección
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tareas: [],
    tarea: {
      id: '',
      texto: '',
      checkbox: [],
      radio: '',
      numero: '',
    },
  },
  mutations: {
    set(state, payload) {
      state.tareas.push(payload)
     // console.log(state.tareas)
     localStorage.setItem('datos', JSON.stringify(state.tareas))
    },
    eliminar(state, payload) {
      state.tareas = state.tareas.filter((item) => item.id !== payload) //javascript vainilla -- filter
      localStorage.setItem('datos', JSON.stringify(state.tareas))
    },
    tarea(state, payload) {
      if (!state.tareas.find((item) => item.id === payload)) {
        //retorna a la pagina de inicio
        router.push('/')
        return //en caso de que no se cumpla se retorna
      }
      state.tarea = state.tareas.find((item) => item.id === payload) //buscamos la tarea en el array 'tareas'
    },
    update(state, payload) {
      state.tareas = state.tareas.map(
        (item) => (item.id === payload.id ? payload : item),
        router.push('/'),
        localStorage.setItem('datos', JSON.stringify(state.tareas))
      ) //devuelve el array indicando la condicion que se quiere
    }, //en el payload esta el objeto de tareas que ya esta modificado en el formulario
    //y el payload tienen el ID y cuando lo encuentra se devuelve todo el objeto modificado y en caso de que
    //no coincida se devuelve el item 'variable que se repite'
    cargar(state, payload) {
      state.tareas = payload //todo lo que mandamos del nevegador
      //es permanente dentro del navegador solamente
    },
  },
  actions: {
    setTareas({ commit }, tarea) {
      commit('set', tarea)
    },
    eliminarTareas({ commit }, id) {
      commit('eliminar', id)
    },
    setTarea({ commit }, id) {
      commit('tarea', id)
    },
    updateTarea({ commit }, tarea) {
      commit('update', tarea)
    },
    //se crea una base de datos en el navegator
    cargarLocalStorage({ commit }) {
      if (localStorage.getItem('datos')) {
        const datos = JSON.parse(localStorage.getItem('datos'))
        commit('cargar', datos)
        return
      }
      localStorage.setItem('datos', JSON.stringify([]))
    },
  },

  modules: {},
})
