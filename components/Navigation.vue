<template>
  <section class="navigation">
    <div class="container">
      <!-- Main container -->
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5">
              <strong>{{ dataLength }}</strong> To Do list
            </p>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="text" placeholder="Find a to do list" v-model="searchText">
              </p>
              <p class="control">
                <button class="button" @click="$emit('onSearch', searchText)">
                  Search
                </button>
              </p>
            </div>
          </div>
        </div>
        <!-- Right side -->
        <div class="level-right">
          <p class="level-item"><a class="button is-primary is-fullwidth" @click="onAddNew">Add New</a></p>
        </div>
      </nav>
    </div>
    <FormToDo :isActive="isFormToDo" status="create" @onClose="formOnClose"/>
  </section>
</template>

<script>
import FormToDo from '~/components/FormToDo.vue'

export default {
  components: {
    FormToDo
  },
  props: {
    dataLength: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      searchText: '',
      isFormToDo: false,
    }
  },
  methods: {
    onAddNew () {
      this.isFormToDo = true
    },
    formOnClose () {
      this.isFormToDo = false
    }
  }
}
</script>

<style scoped>
  .navigation {
    margin: 15px;
  }
  .level .control {
    margin-bottom: 0;
  }
</style>