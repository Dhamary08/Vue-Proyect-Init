<template>
  <div>
    <form @submit.prevent="procesarFormulario">
      <Input :tarea="tarea" />
    </form>

    <hr class="py-3" />
    
    <ListaTareas />
  </div>
</template>

<script>
import Input from '../components/Input.vue'
import ListaTareas from '../components/ListaTareas.vue'

import { mapActions } from 'vuex'
const shortid = require('shortid');
export default {
  components: { Input, ListaTareas },
  data() {
    return {
      tarea: {
        id: '',
        texto: '',
        checkbox: [],
        radio: '',
        numero: '',
      },
    }
  },
  methods: {
    ...mapActions(['setTareas']), //recibe una tarea que es un objeto
    procesarFormulario() {
      // console.log('tarea: ', this.tarea)
      if (this.tarea.texto.trim() === '') {
       // console.log('Campo Vacio')
        return
      }
    //  console.log('no esta vacio')

      //****** Generar ID, genera aleatoriamente y on se repite*/
      this.tarea.id = shortid.generate()
    //  console.log(this.tarea.id)
      //console.log(this.tarea)
      //envian los datos a vuex
      this.setTareas(this.tarea)
      //Se limpian los datos
      this.tarea = {
        texto: '',
        checkbox: [],
        radio: '',
        numero: '',
      }
    },
  },
}
</script>
