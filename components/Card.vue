<template>
  <div class="card">
    <header class="card-header">
      <div class="card-header-title">
        {{ cardData.name }}
      </div>
      <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
    </header>
    <div class="card-content">
      <div class="content">
        <p>
          {{ cardData.content | limitChar(100) }}
        </p>
        <time :datetime="cardData.updated_at" class="updated-at">
          {{ cardData.updated_at | date }}
        </time>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item" @click="modalDetailOpen">Detail</a>
      <a href="#" class="card-footer-item" @click="onEdit">Edit</a>
      <a href="#" class="card-footer-item" @click="modalDeleteOpen">Delete</a>
    </footer>

    <Modal :isActive="isModalDetail">
      <header class="modal-card-head">
        <p class="modal-card-title">
          {{ cardData.name }}
        </p>
        <button class="delete" aria-label="close" @click="modalDetailClose"></button>
      </header>
      <section class="modal-card-body">
        <p>
          {{ cardData.content }}
        </p>
      </section>
      <footer class="modal-card-foot">
        <time :datetime="cardData.updated_at" class="updated-at">
          {{ cardData.updated_at | date }}
        </time>
      </footer>
    </Modal>

    <Modal :isActive="isModalDelete">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Delete Data
        </p>
        <button class="delete" aria-label="close" @click="modalDeleteClose"></button>
      </header>
      <section class="modal-card-body">
        <p>
          Are you sure to delete this todo data?
        </p>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="onDelete">Delete</button>
      </footer>
    </Modal>

    <FormToDo :isActive="isFormToDo" :data="cardData" @onClose="formOnClose"/>
  </div>
</template>

<script>
  import Modal from '~/components/Modal.vue'
  import FormToDo from '~/components/FormToDo.vue'
  import {
    NAMESPACE as TODO_NAMESPACE,
    ACTION_TYPES as TODO_ACTION_TYPES
  } from '~/store/todo'
  import { buildStoreParam } from '~/utils'

  export default {
    name: 'Card',
    components: {
      Modal,
      FormToDo
    },
    data() {
      return {
        isModalDetail: false,
        isModalDelete: false,
        isFormToDo: false,
      }
    },
    props: {
      cardData: {
        type: Object,
        default: {
          name: '',
          content: '',
        }
      }
    },
    methods: {
      modalDetailOpen () {
        this.isModalDetail = true
      },
      modalDetailClose () {
        this.isModalDetail = false
      },
      modalDeleteOpen () {
        this.isModalDelete = true
      },
      modalDeleteClose () {
        this.isModalDelete = false
      },
      async onDelete () {
        console.log('deleted data')
        await this.$store.dispatch(
          buildStoreParam(
            TODO_NAMESPACE,
            TODO_ACTION_TYPES.DELETE_TODO
          ),
          this.cardData
        )
        this.modalDeleteClose()
      },
      onEdit () {
        this.isFormToDo = !this.isFormToDo
      },
      formOnClose () {
        this.isFormToDo = false
      }
    },
  }
</script>

<style lang="css" scoped>
  p.modal-card-title {
    margin-bottom: 0;
  }
</style>