<template>
  <Modal :isActive="isActive">
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ titleText }}
      </p>
      <button class="delete" aria-label="close" @click="onClose"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="" v-model="formData.name" :class="{ 'is-danger' : formError.name }">
        </div>
        <p class="help" :class="{ 'is-danger' : formError.name }">please input your to do name here</p>
      </div>
      <div class="field">
        <label class="label">Content</label>
        <div class="control">
          <textarea class="textarea" placeholder="" rows="10" v-model="formData.content" :class="{ 'is-danger' : formError.content }"></textarea>
        </div>
        <p class="help" :class="{ 'is-danger' : formError.content }">please input your to do content here</p>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="onSubmit">
        {{ this.buttonText }}
      </button>
    </footer>
  </Modal>
</template>

<script>
  import Modal from '~/components/Modal.vue'
  import {
    NAMESPACE as TODO_NAMESPACE,
    ACTION_TYPES as TODO_ACTION_TYPES
  } from '~/store/todo'
  import { buildStoreParam } from '~/utils'
  
  export default {
    name: 'FormToDo',
    components: {
      Modal
    },
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      status: {
        type: String,
        default: 'edit',
      },
      data: {
        type: Object,
        default: () => {
          return { name: '', content: '' }
        }
      }
    },
    data() {
      return {
        titleText: '',
        buttonText: '',
        formData: Object.assign({}, this.data),
        formError: {
          name: false,
          content: false,
        },
      }
    },
    created() {
      this.titleText = this.status === 'edit' ? 'Edit To Do Data' : "Created New To Do"
      this.buttonText = this.status === 'edit' ? 'Save' : 'Create'
    },
    methods: {
      onSubmit () {
        this.validateInput('name')
        this.validateInput('content')
        if (!this.formError.name && !this.formError.content) {
          this.status === 'edit' ? this.isEdit () : this.isCreateNew()
        }
      },
      onClose () {
        this.$emit('onClose')
      },
      validateInput (value) {
        if (this.formData[value] === '') {
          this.formError[value] = true
        } else {
          this.formError[value] = false
        }
      },
      async isEdit () {
        this.formData.updated_at = new Date()
        await this.$store.dispatch(
          buildStoreParam(
            TODO_NAMESPACE,
            TODO_ACTION_TYPES.EDIT_TODO
          ),
          this.formData
        )
        this.resetFormData()
        this.onClose()
      },
      async isCreateNew () {
        await this.$store.dispatch(
          buildStoreParam(
            TODO_NAMESPACE,
            TODO_ACTION_TYPES.ADD_TODO
          ),
          this.formData
        )
        this.resetFormData()
        this.onClose()
      },
      resetFormData () {
        this.formData = {
          name: '',
          content: ''
        }
      }
    }
  }
</script>