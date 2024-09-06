<template>
    <div v-if="product">
      <h1>{{ product.name }}</h1>
      <p>{{ product.description }}</p>
      <p>价格: {{ product.price }}</p>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        product: null
      };
    },
    created() {
      const id = this.$route.params.id;
      api.getProduct(id).then(response => {
        this.product = response.data;
      });
    }
  };
  </script>
  