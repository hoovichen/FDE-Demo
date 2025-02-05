<template>
  <div class="stories-view">
    <!-- 品牌故事标题区域 -->
    <section class="hero-section">
      <div class="section-title">
        <h2>{{ getTranslation('stories.title') }}</h2>
        <div class="title-underline"></div>
      </div>
    </section>

    <!-- 品牌故事内容区域 -->
    <section class="story-content">
      <div class="story-text">
        <h3>{{ getTranslation('stories.subtitle') }}</h3>
        <p>{{ getTranslation('stories.content') }}</p>
      </div>
      <div class="story-image">
        <div class="image-card">
          <img src="@/assets/Products/spe_chili.jpg" :alt="getTranslation('stories.imageAlt')">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// 品牌故事多语言配置
const STORY_TRANSLATIONS = {
  zh: {
    stories: {
      title: '品牌故事',
      subtitle: '传承与创新的完美结合',
      content: '自2010年创立以来，我们始终秉持着对传统风味的坚持与对品质的追求。从甘文阁小镇出发，将马来西亚独特的辣椒酱文化传播到世界各地。每一瓶酱料都承载着我们对美食的热爱与匠心。',
      imageAlt: '品牌故事图片'
    }
  },
  en: {
    stories: {
      title: 'Brand Story',
      subtitle: 'Where Tradition Meets Innovation',
      content: 'Since our founding in 2010, we have been committed to preserving traditional flavors while pursuing quality. Starting from Kampung Koh, we have spread Malaysia\'s unique chili sauce culture worldwide. Every bottle carries our passion for food and craftsmanship.',
      imageAlt: 'Brand Story Image'
    }
  }
}

export default {
  name: 'StoriesView',
  computed: {
    ...mapState({
      currentLang: state => state.language.currentLang
    })
  },
  methods: {
    getTranslation(key) {
      const keys = key.split('.')
      let result = STORY_TRANSLATIONS[this.currentLang]
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
.stories-view {
  width: 100%;
  background-color: #fff;
}

.hero-section {
  padding: 60px 20px;
  background-color: #f4f0d8;
}

.section-title {
  text-align: center;
  padding: 40px 0;
}

.section-title h2 {
  font-size: 2.5em;
  color: #2c3e50;
  margin-bottom: 15px;
}

.title-underline {
  width: 60px;
  height: 3px;
  background-color: #a49a82;
  margin: 0 auto;
}

.story-content {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  gap: 40px;
  align-items: center;
}

.story-text {
  flex: 1;
}

.story-text h3 {
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 20px;
}

.story-text p {
  color: #666;
  line-height: 1.8;
}

.story-image {
  flex: 1;
}

.image-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 200px;
  margin: 0 auto;
}

.story-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .story-content {
    flex-direction: column;
  }

  .section-title h2 {
    font-size: 2em;
  }

  .image-card {
    width: 200px;
  }

  .story-image img {
    width: 100%;
    height: auto;
  }
}
</style>
