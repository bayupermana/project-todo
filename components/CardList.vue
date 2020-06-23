<template>
  <section class="card-list">
    <div class="columns" v-for="cards in cardDatas" :key="cards.index">
      <div class="column is-12-mobile is-4-desktop" v-for="card in cards" :key="card.index">
        <Card :cardData="card"/>
      </div>
    </div>
    <div v-if="cardDatas.length === 0">
      <div class="columns">
        <div class="column">
          <p>Data is empty!</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Card from '~/components/Card.vue'
  
  export default {
    name: 'CardList',
    components: {
      Card
    },
    props: {
      cardDatas: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang="css" scoped>
  @media only screen and (max-width: 1023px) {
    .columns {
      margin: 0
    }
  }
</style>