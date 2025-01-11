<template>
  <div class="faq-section">
    <!-- FAQ 页面标题区域 -->
    <section class="hero-section">
      <div class="section-title">
        <h2>{{ getTranslation('faq.title') }}</h2>
        <div class="title-underline"></div>
      </div>
    </section>

    <!-- FAQ 内容区域 -->
    <section class="faq-content">
      <!-- 全局控制按钮 -->
      <div class="faq-controls">
        <button class="learn-more-btn" @click="toggleAllQuestions">
          <span>{{ isAllExpanded ? getTranslation('faq.collapseAll') : getTranslation('faq.expandAll') }}</span>
          <i class="arrow-icon" :class="{ 'expanded': isAllExpanded }">↓</i>
        </button>
      </div>

      <!-- FAQ 问答列表 -->
      <div class="faq-container">
        <div v-for="(item, index) in faqItems" :key="index" class="product-card faq-item" :class="{ 'active': expandedItems[index] }">
          <!-- 问题标题 -->
          <div class="faq-question" @click="toggleQuestion(index)">
            <div class="question-content">
              <span class="sauce-icon">🌶️</span>
              <h3>{{ getTranslation(`faq.items.${index}.question`) }}</h3>
            </div>
            <i class="arrow-icon" :class="{ 'expanded': expandedItems[index] }">↓</i>
          </div>
          <!-- 答案内容 -->
          <div class="faq-answer" v-show="expandedItems[index]">
            <p>{{ getTranslation(`faq.items.${index}.answer`) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// FAQ翻译文本常量
const TRANSLATIONS = {
  zh: {
    faq: {
      title: '常见问题',
      expandAll: '展开全部',
      collapseAll: '收起全部',
      items: [
        {
          question: '你们的酱料都是用什么原料制作的？',
          answer: '我们的酱料采用精选天然食材,包括新鲜辣椒、大蒜、姜等,不添加防腐剂和人工色素。每一款酱料都经过严格的品控把关,确保口感和品质。'
        },
        {
          question: '产品的保质期是多久？',
          answer: '我们的产品在未开封的情况下保质期为12个月。开封后建议在3个月内食用完,并请放入冰箱保存。'
        },
        {
          question: '你们的产品是否含有过敏原？',
          answer: '我们的部分产品可能含有花生、大豆等过敏原。具体成分请查看产品包装上的详细配料表。如有特殊过敏情况,请谨慎选购。'
        },
        {
          question: '如何正确储存你们的产品？',
          answer: '建议将产品存放在阴凉干燥处。开封后请放入冰箱保存,并确保容器密封完好。避免阳光直射和高温环境。'
        }
      ]
    }
  },
  en: {
    faq: {
      title: 'FAQ',
      expandAll: 'Expand All',
      collapseAll: 'Collapse All',
      items: [
        {
          question: 'What ingredients are used in your sauces?',
          answer: 'Our sauces are made with selected natural ingredients including fresh chili, garlic, and ginger, without preservatives or artificial colors. Each sauce undergoes strict quality control to ensure taste and quality.'
        },
        {
          question: 'What is the shelf life of your products?',
          answer: 'Our products have a 12-month shelf life when unopened. Once opened, we recommend consuming within 3 months and storing in the refrigerator.'
        },
        {
          question: 'Do your products contain allergens?',
          answer: 'Some of our products may contain allergens such as peanuts and soybeans. Please check the detailed ingredient list on the product packaging. If you have specific allergies, please purchase with caution.'
        },
        {
          question: 'How should I store your products?',
          answer: 'We recommend storing products in a cool, dry place. After opening, please store in the refrigerator and ensure the container is properly sealed. Avoid direct sunlight and high temperatures.'
        }
      ]
    }
  }
}

export default {
  name: 'FAQView',
  data() {
    return {
      isAllExpanded: false,
      expandedItems: [],
      faqItems: TRANSLATIONS.zh.faq.items // 初始化数组长度用
    }
  },
  computed: {
    ...mapState({
      currentLang: state => state.language.currentLang
    })
  },
  methods: {
    toggleQuestion(index) {
      this.$set(this.expandedItems, index, !this.expandedItems[index])
      this.updateAllExpandedState()
    },
    toggleAllQuestions() {
      const newState = !this.isAllExpanded
      this.expandedItems = this.faqItems.map(() => newState)
      this.isAllExpanded = newState
    },
    updateAllExpandedState() {
      this.isAllExpanded = this.expandedItems.every(item => item)
    },
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
  },
  created() {
    this.expandedItems = this.faqItems.map(() => false)
  }
}
</script>

<style scoped>
.faq-section {
  width: 100%;
  background-color: #fff;
}

.hero-section {
  width: 100%;
  background: linear-gradient(180deg, #F9EBC7 85%, #ffffff 100%);
  margin-top: -20px;
  padding: 60px 0 30px;
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

.faq-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.faq-controls {
  text-align: right;
  margin-bottom: 20px;
}

.learn-more-btn {
  background: none;
  border: none;
  color: #a49a82;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
}

.learn-more-btn:hover {
  color: #7a7158;
}

.faq-item {
  background: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #f4f0d8;
  overflow: hidden;
}

.faq-question {
  padding: 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background-color: #f9f6e8;
}

.question-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.sauce-icon {
  font-size: 24px;
}

.question-content h3 {
  font-size: 1.2em;
  color: #2c3e50;
  margin: 0;
}

.arrow-icon {
  transition: transform 0.3s ease;
}

.arrow-icon.expanded {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 20px 20px;
  color: #666;
  line-height: 1.6;
}

.faq-answer p {
  margin: 0;
}

@media (max-width: 768px) {
  .section-title h2 {
    font-size: 2em;
  }

  .faq-content {
    padding: 20px;
  }

  .question-content h3 {
    font-size: 1.1em;
  }
}
</style>
