<template>
    <div class="slick-body">
      <div class="slick-container">
        <div class="slick-track">
            <div class="slick-slide" v-for="(image, index) in images" :key="index" v-show="index === currentSlide">
              <img :src="image.src" :alt="image.alt" class="slide-image">
              <h1 class="overlay-text">{{image.text}}</h1>
              <div role="navigation" class="slick-button-container">
                <el-button plain @click="prevSlide">&lt;</el-button>
                <el-button plain @click="nextSlide">></el-button>
              </div>
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
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.images.length
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length
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
  .slick-button-container {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
