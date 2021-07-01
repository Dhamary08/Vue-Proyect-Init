<template>
  <div>
    <!-- <pre>{{ tareas }}</pre> -->
    <table class="table">
      <caption>Tabla dinámica</caption>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Categorias</th>
          <th scope="col">Estado</th>
          <th scope="col">Número</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <!-- <span v-for="(categoria, index) in item.checkbox" :key="index">
              {{
                (item.checkbox.length === index + 1)
                  ? categoria
                  : categoria + ', '
              }}
            </span> -->
      <tbody>
        <tr v-for="item in tareas" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.texto }}</td>
          <td>
            {{ item.checkbox.join(', ') }}
          </td>
          <td>{{ item.radio }}</td>
          <td>{{ item.numero }}</td>
          <td>
            <button
              type="button"
              class="btn btn-danger"
              @click="eliminarTareas(item.id)"
            >
              Eliminar
            </button>
            <router-link
              class="btn btn-warning ml-2 text-light"
              :to="{ name: 'Editar', params: { id: item.id } }"
            ><!-- Viajamos a la ruta editar y luego al parametro id -->
              Editar
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['tareas']),
  },
  methods: {
    ...mapActions(['eliminarTareas']),
  },
}
</script>

<style></style>
