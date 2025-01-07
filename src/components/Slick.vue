<template>
    <div class="slick-body">
      <div class="slick-container">
        <div class="slick-track">
            <div class="slick-slide" v-for="(image, index) in images" :key="index" v-show="index === currentSlide">
              <img :src="image.src" :alt="image.alt" class="slide-image" @click="nextSlide">
            </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array
    }
  },
  data() {
    return {
      currentSlide: 0
    }
  },
  methods: {
    nextSlide(event) {
      // 根据点击位置切换轮播图
      const rect = event.target.getBoundingClientRect()
      // x position within the element.
      const x = event.clientX - rect.left
      const width = rect.width
      if (x < width / 2) {
        this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length
      } else {
        this.currentSlide = (this.currentSlide + 1) % this.images.length
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .slick-body {
    text-align: center;
  }

  .overlay-text {
    font-size: 24px;
    color: black;
  }

  .slick-container {
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-track {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
  }

  .slick-slide {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
  }

  .slide-image {
    width: 100%;
    max-width: 500px;
    min-width: 500px;
    height: 100%;
    object-fit: cover;
  }

  .overlay-text {
    position: absolute;
    top: 33%; /* 图片的1/3处 */
    width: 100%;
    text-align: center;
    font-size: 2em;
    color: white;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
    pointer-events: none;
  }

  @media (max-width: 500px) {
    .slide-image {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      height: auto;
    }
  }
</style>
