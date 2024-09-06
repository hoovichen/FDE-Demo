<template>
  <div class="product">
      <h1>Welcome to the Food Portal</h1>
      <ul>
        <li v-for="product in products" :key="product.id">
          <router-link :to="'/product/' + product.id">{{ product.name }}</router-link>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' }
        // 可以在这里添加更多的产品示例
      ]
    }
  }
}
</script>

<style scoped>
  /* 添加你自己的样式 */
</style>
