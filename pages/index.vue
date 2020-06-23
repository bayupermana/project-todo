<template>
  <div>
    <Header />
    <Navigation v-if="showNavigation" :dataLength="todoLength" @onSearch="onSearch" />
    <section class="content">
      <div class="container">
        <CardList v-if="todoFormatedData" :cardDatas="todoFormatedData" />
      </div>
    </section>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Navigation from '~/components/Navigation.vue'
import CardList from '~/components/CardList.vue'
import { buildStoreParam } from '~/utils'
import { mapState } from 'vuex'
import {
  NAMESPACE as TODO_NAMESPACE,
  ACTION_TYPES as TODO_ACTION_TYPES
} from '~/store/todo'

export default {
  components: {
    Header,
    CardList,
    Navigation
  },
  computed: {
    ...mapState(TODO_NAMESPACE, ['todoFormatedData', 'todoLength']),
  },
  data() {
    return {
      showNavigation: this.todoLength !== ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      await this.$store.dispatch(
        buildStoreParam(
          TODO_NAMESPACE,
          TODO_ACTION_TYPES.GET_TODO
        )
      )
    },
    async onSearch (searchText) {
      if (searchText) {
        await this.$store.dispatch(
          buildStoreParam(
            TODO_NAMESPACE,
            TODO_ACTION_TYPES.SEARCH_TODO
          ),
          searchText
        )
      } else {
        await this.$store.dispatch(
          buildStoreParam(
            TODO_NAMESPACE,
            TODO_ACTION_TYPES.RESET_DATA
          )
        )
      }
    }
  }
}
</script>
