<template>
  <div class="slick-body">
    <div class="slick-container">
      <div class="slick-track">
        <transition-group name="slide">
          <div class="slick-slide" v-for="(image, index) in images" :key="image.productId" :class="{ active: index === currentSlide }">
            <div class="slide-wrapper">
              <img :src="image.src" :alt="image.alt" class="slide-image" />
              <div class="slide-overlay">
                <h2 class="slide-title">{{ image.text || '精选产品' }}</h2>
                <p class="slide-desc">精心挑选的优质食材，为您带来舌尖上的美味享受</p>
              </div>
            </div>
          </div>
        </transition-group>
      </div>

      <button class="nav-button prev" @click="prevSlide">
        <span class="nav-icon">&#10094;</span>
      </button>
      <button class="nav-button next" @click="nextSlide">
        <span class="nav-icon">&#10095;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentSlide: 0,
      isAnimating: false
    }
  },
  methods: {
    nextSlide() {
      if (this.isAnimating) return
      this.isAnimating = true
      this.currentSlide = (this.currentSlide + 1) % this.images.length
      setTimeout(() => {
        this.isAnimating = false
      }, 500)
    },
    prevSlide() {
      if (this.isAnimating) return
      this.isAnimating = true
      this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length
      setTimeout(() => {
        this.isAnimating = false
      }, 500)
    }
  },
  mounted() {
    // 自动轮播
    setInterval(this.nextSlide, 5000)
  }
}
</script>

<style scoped>
.slick-body {
  text-align: center;
  padding: 20px 0;
}

.slick-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  aspect-ratio: 16 / 9;
}

.slick-track {
  position: relative;
  width: 100%;
  height: 100%;
}

.slick-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.5s ease;
}

.slick-slide.active {
  opacity: 1;
  transform: translateX(0);
}

.slide-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 20px;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white;
  text-align: center;
}

.slide-title {
  font-size: 2.5em;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.slide-desc {
  font-size: 1.2em;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.nav-button:hover {
  background: rgba(255,255,255,0.95);
  transform: translateY(-50%) scale(1.1);
}

.prev {
  left: 20px;
}

.next {
  right: 20px;
}

.nav-icon {
  font-size: 20px;
  color: #333;
}

/* 滑动动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .slick-container {
    aspect-ratio: 4 / 3;
  }

  .slide-title {
    font-size: 1.8em;
  }

  .slide-desc {
    font-size: 1em;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .slick-container {
    aspect-ratio: 1 / 1;
  }

  .slide-title {
    font-size: 1.5em;
  }

  .nav-button {
    width: 35px;
    height: 35px;
  }
}
</style>
