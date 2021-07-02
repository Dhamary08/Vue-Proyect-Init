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
    },
    eliminar(state, payload) {
      state.tareas = state.tareas.filter((item) => item.id !== payload) //javascript vainilla -- filter
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
    //Esperar los datos de la base de datos
    async cargarLocalStorage({ commit }) {
      try {
        const res = await fetch(
          'https://first-formulario-api-default-rtdb.firebaseio.com/tareas.json',
        )
        //solo se captura las tareas
        const dataDB = await res.json()
        const arrayTareas = []

        // console.log(dataDB['VHUfBrduP'])
        for (let id in dataDB) {
          arrayTareas.push(dataDB[id]) //se empuja una tarea en individual
        }
        console.log(arrayTareas)
        commit('cargar', arrayTareas)
      } catch (error) {
        console.log('error en cargarLocalStorage', error)
      }
    },
    //recibimos los datos
    //guarda info en faribes
    async setTareas({ commit }, tarea) {
      try {
        //para resivir una respuesta se agrega una constate //  const res =
        const res = await fetch(
          `https://first-formulario-api-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`,
          {
            method: 'PUT', //se agrega un nuevo elemento
            headers: {
              //opcional pero si como conoimiento general
              'Content-Type': 'application/json', //se especifica que los datos que se envian es en JSON
            },
            body: JSON.stringify(tarea), //los datos que se transforman a JSON con stringify
          },
        )
        const dataDB = await res.json()
        console.log(dataDB)
      } catch (error) {
        console.log('error en settareas: ', error)
      }
      commit('set', tarea)
    },
    async eliminarTareas({ commit }, id) {
      try {
        await fetch(
          `https://first-formulario-api-default-rtdb.firebaseio.com/tareas/${id}.json`,
          {
            method: 'DELETE',
          },
        )
        commit('eliminar', id)
      } catch (error) {
        console.log('error es de eliminarTareas: ', error)
      }
    },
    setTarea({ commit }, id) {
      commit('tarea', id)
    },
    async updateTarea({ commit }, tarea) {
      try {
        const res = await fetch(
          `https://first-formulario-api-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`,
          {
            method: 'PATCH',
            body: JSON.stringify(tarea), //se manda la tarea modificada
          },
        )
        const dataDB = await res.json()
        console.log(dataDB)
        commit('update', dataDB)
      } catch (error) {
        console.log('error updateTarea', error)
      }
    },
  },

  modules: {},
})
