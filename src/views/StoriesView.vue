<template>
  <div class="coming-soon">
    <h1>Coming Soon</h1>
    <p>We're crafting this story page. Please check back later!</p>
  </div>
</template>

<script>
export default {
  name: 'StoriesView'
}
</script>

<style scoped>
.coming-soon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    background-color: #f4f4f4;
}

.coming-soon h1 {
    font-size: 3rem;
    font-weight: bold;
    color: #333;
}

.coming-soon p {
    font-size: 1.2rem;
    color: #666;
    margin-top: 10px;
}
</style>
