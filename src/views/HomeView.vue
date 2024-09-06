<template>
  <div class="front">
    <div class="top">
      <div class="img-container">
        <Slick :images="imageSlides"></Slick>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Slick from '@/components/Slick.vue'

export default {
  data() {
    return {
      imageSlides: [
        { src: require('@/assets/Foods/food_0.jpg'), alt: 'Slide 1', text: 'Welcome to FireDragon' },
        { src: require('@/assets/Foods/food_1.jpg'), alt: 'Slide 2', text: 'This is second Page' },
        { src: require('@/assets/Foods/food_2.jpg'), alt: 'Slide 3', text: 'This is third Page' },
        { src: require('@/assets/Foods/food_3.jpg'), alt: 'Slide 4', text: 'This is forth Page' }
      ]
    }
  },
  components: {
    Slick
  }
}
</script>

<style scoped>
  .top {
    background-color: rgb(233, 241, 185);
    justify-content: center;
    align-items: center;
  }

  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(236, 193, 126);
  }

  /* logo的默认样式 */
  .logo-img {
    width: 380px;
    height: auto;
    text-align: center;
    background-color: aqua;
  }
  /* 当屏幕小于780px */
  @media (max-width: 780px){
    .logo-img {
      width: calc(100% - 20vw);
      min-width: 180px;
      max-width: 380px;
      height: auto;
      align-items: center;
    }
  }
</style>
