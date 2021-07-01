<template>
  <div>
    <label class="mt-5 mb-2">Input</label>
    <input
      type="text"
      class="form-control"
      placeholder="Ingrese Nombre"
      v-model.trim="tarea.texto"
    />

    <label class="my-2">Checkbox</label>
    <div>
      <div class="custom-control custom-checkbox custom-control-inline">
        <input
          type="checkbox"
          id="check1"
          name="customRadioInline"
          class="custom-control-input"
          v-model="tarea.checkbox"
          value="javascript"
        />
        <label class="custom-control-label" for="check1">
          JavaScript
        </label>
      </div>
      <div class="custom-control custom-checkbox custom-control-inline">
        <input
          type="checkbox"
          id="check2"
          name="customRadioInline"
          class="custom-control-input"
          v-model="tarea.checkbox"
          value="node.js"
        />
        <label class="custom-control-label" for="check2">
          Node.js
        </label>
      </div>
    </div>
    <label class="my-2">Radio</label>
    <div>
      <div class="custom-control custom-radio custom-control-inline">
        <input
          type="radio"
          id="radio1"
          name="customRadioInline"
          class="custom-control-input"
          v-model="tarea.radio"
          value="Opcion1"
        />
        <label class="custom-control-label" for="radio1">
          Opcion1
        </label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input
          type="radio"
          id="radio2"
          name="customRadioInline"
          class="custom-control-input"
          v-model="tarea.radio"
          value="Opcion2"
        />
        <label class="custom-control-label" for="radio2">
          Opcion2
        </label>
      </div>
    </div>
    <label class="my-2">Número</label>
    <div>
      <!-- Cambio de numero -->
      <input type="number" class="form-control" v-model.number="tarea.numero" />
    </div>
    <button
      type="submit"
      class="btn btn-primary my-2 btn-block"
      :disabled="bloquear"
    >
      Procesar
    </button>
  </div>
</template>

<script>
export default {
  props: {
    tarea: Object,
  },
  computed: {
    bloquear() {
      return this.tarea.texto.trim() === '' ? true : false
    },
  },
}
</script>
