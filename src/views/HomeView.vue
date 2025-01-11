<template>
  <div class="home">
    <!-- 品牌形象展示区 Brand Image Showcase -->
    <section class="hero-section">
      <div class="slider-container">
        <Slick :images="imageSlides"></Slick>
      </div>
    </section>

    <!-- 产品展示区域 Featured Products Section -->
    <section class="products-section">
      <div class="section-title">
        <h2>{{ getTranslation('home.featuredProducts') }}</h2>
        <div class="title-underline"></div>
      </div>

      <div class="products-grid">
        <!-- 产品卡片 Product Cards -->
        <div class="product-card" v-for="(slide, index) in imageSlides" :key="index">
          <div class="product-image" @click="navigateToProduct(slide)">
            <img :src="slide.src" :alt="slide.alt">
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ slide.text }}</h3>
            <p class="product-description">{{ getTranslation('home.productDesc') }}</p>
            <button class="learn-more-btn" @click="navigateToProduct(slide)">
              <span>{{ getTranslation('home.learnMore') }}</span>
              <i class="arrow-icon">→</i>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 品牌故事区域 Brand Story Section -->
    <section class="brand-story">
      <div class="section-title">
        <h2>{{ getTranslation('home.brandStory') }}</h2>
        <div class="title-underline"></div>
      </div>
      <div class="story-content">
        <div class="story-text">
          <h3>{{ brandStory.title }}</h3>
          <p>{{ brandStory.content }}</p>
        </div>
        <div class="story-image">
          <img :src="brandStory.image" :alt="getTranslation('home.brandStoryAlt')">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Slick from '@/components/Slick.vue'
import { mapState } from 'vuex'

// 翻译文本常量 Translation Constants
const TRANSLATIONS = {
  zh: {
    home: {
      featuredProducts: '精选产品',
      productDesc: '精心挑选的优质食材,为您带来舌尖上的美味享受',
      learnMore: '了解详情',
      brandStory: '品牌故事',
      brandStoryAlt: '品牌故事图片'
    }
  },
  en: {
    home: {
      featuredProducts: 'Special Products',
      productDesc: 'Carefully selected quality ingredients for your delightful taste experience',
      learnMore: 'Learn More',
      brandStory: 'Brand Story',
      brandStoryAlt: 'Brand Story Image'
    }
  }
}

export default {
  components: {
    Slick
  },
  computed: {
    ...mapState({
      currentLang: state => state.language.currentLang
    })
  },
  data() {
    return {
      // 轮播图数据 Slider Data
      imageSlides: [
        {
          src: require('@/assets/Foods/food_0.jpg'),
          alt: 'Slide 1',
          text: 'First Product',
          productId: 1
        },
        {
          src: require('@/assets/Foods/food_1.jpg'),
          alt: 'Slide 2',
          text: 'Second Product',
          productId: 2
        },
        { src: require('@/assets/Foods/food_2.jpg'), alt: 'Slide 3', text: 'Third Product', productId: 3 },
        { src: require('@/assets/Foods/food_3.jpg'), alt: 'Slide 4', text: 'Fourth Product', productId: 4 },
        { src: require('@/assets/Foods/food_4.jpg'), alt: 'Slide 5', text: 'Fifth Product', productId: 5 },
        { src: require('@/assets/Foods/food_5.jpg'), alt: 'Slide 6', text: 'Sixth Product', productId: 6 },
        { src: require('@/assets/Foods/food_6.jpg'), alt: 'Slide 7', text: 'Seventh Product', productId: 7 },
        { src: require('@/assets/Foods/food_7.jpg'), alt: 'Slide 8', text: 'Eighth Product', productId: 8 },
        { src: require('@/assets/Foods/food_8.jpg'), alt: 'Slide 9', text: 'Ninth Product', productId: 9 }
      ],
      // 产品数据 Product Data
      products: [
        {
          name: '产品名称',
          description: '产品描述文本',
          image: require('@/assets/Foods/food_7.jpg')
        }
      ],
      // 品牌故事数据 Brand Story Data
      brandStory: {
        title: '品牌故事标题',
        content: '品牌故事内容',
        image: require('@/assets/Foods/food_6.jpg')
      }
    }
  },
  methods: {
    // 导航到产品详情页 Navigate to Product Detail
    navigateToProduct(slide) {
      this.$router.push({
        name: 'product',
        query: {
          productId: slide.productId
        }
      })
    },
    // 获取翻译文本 Get Translation Text
    getTranslation(key) {
      const keys = key.split('.')
      let result = TRANSLATIONS[this.currentLang]
      for (const k of keys) {
        if (result) {
          result = result[k]
        }
      }
      return result || key
    }
  }
}
</script>

<style scoped>
/* 以下样式保持不变 Styles remain unchanged */
.home {
  width: 100%;
  background-color: #fff;
}

/* 轮播图区域样式 - 采用渐变背景实现自然过渡 */
.hero-section {
  width: 100%;
  background: linear-gradient(180deg, #F9EBC7 85%, #ffffff 100%); /* 渐变过渡到白色背景 */
  margin-top: -20px;
  padding-bottom: 30px; /* 增加底部内边距使过渡更自然 */
}

/* 轮播图容器样式 */
.slider-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

/* 轮播图导航按钮样式 */
.slider-container :deep(.slick-prev),
.slider-container :deep(.slick-next) {
  opacity: 0.2; /* 默认低透明度 */
  transition: opacity 0.3s ease; /* 透明度过渡动画 */
}

/* 鼠标悬停时显示导航按钮 */
.slider-container:hover :deep(.slick-prev),
.slider-container:hover :deep(.slick-next) {
  opacity: 0.8;
}

/* 区域标题通用样式 */
.section-title {
  text-align: center;
  padding: 40px 0;
}

/* 主标题样式 */
.section-title h2 {
  font-size: 2.5em;
  color: #2c3e50;
  margin-bottom: 15px;
}

/* 标题下划线装饰 */
.title-underline {
  width: 60px;
  height: 3px;
  background-color: #a49a82;
  margin: 0 auto;
}

/* 产品展示区域样式 */
.products-section {
  padding: 20px 20px 60px;
  background-color: #fff;
}

/* 产品网格布局 */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 产品卡片样式 */
.product-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f4f0d8;
}

/* 产品卡片悬停效果 */
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

/* 产品图片容器 */
.product-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

/* 产品图片样式 */
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

/* 产品图片悬停放大效果 */
.product-card:hover .product-image img {
  transform: scale(1.05);
}

/* 产品信息区域样式 */
.product-info {
  padding: 20px;
}

/* 产品名称样式 */
.product-name {
  font-size: 1.5em;
  color: #2c3e50;
  margin-bottom: 10px;
}

/* 产品描述文本样式 */
.product-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

/* 了解更多按钮样式 */
.learn-more-btn {
  background: none;
  border: none;
  color: #a49a82;
  padding: 10px 0;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
}

/* 按钮文本样式 */
.learn-more-btn span {
  margin-right: 8px;
}

/* 箭头图标样式 */
.arrow-icon {
  font-style: normal;
  transition: transform 0.3s ease;
}

/* 按钮悬停效果 */
.learn-more-btn:hover {
  color: #7a7158;
}

/* 箭头图标悬停动画 */
.learn-more-btn:hover .arrow-icon {
  transform: translateX(5px);
}

/* 品牌故事区域样式 */
.brand-story {
  padding: 60px 20px;
  background-color: #f4f0d8;
}

/* 品牌故事内容布局 */
.story-content {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  gap: 40px;
  align-items: center;
}

/* 品牌故事文本区域 */
.story-text {
  flex: 1;
}

/* 品牌故事标题 */
.story-text h3 {
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 20px;
}

/* 品牌故事正文 */
.story-text p {
  color: #666;
  line-height: 1.8;
}

/* 品牌故事图片区域 */
.story-image {
  flex: 1;
}

/* 品牌故事图片样式 */
.story-image img {
  width: 100%;
  border-radius: 10px;
}

/* 响应式布局适配 */
@media (max-width: 768px) {
  .story-content {
    flex-direction: column;
  }
  .section-title h2 {
    font-size: 2em;
  }
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
