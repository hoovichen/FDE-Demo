<template>
  <div class="about">
    <!-- 公司 Slogan -->
    <section class="slogan-section" v-intersect>
      <div class="slogan-container">
        <h1 class="title-decorated slogan-title">{{ t('slogan') }}</h1>
        <p class="sub-slogan">{{ t('subSlogan') }}</p>
        <div class="slogan-underline"></div>
      </div>
    </section>

    <!-- 公司简介 -->
    <section class="company-intro section-card" v-intersect>
      <h2 class="title-decorated">{{ t('companyTitle') }}</h2>
      <div class="content-box">
        <div class="text-content">
          <p>{{ t('companyDesc') }}</p>
          <button class="expand-btn" @click="openModal('company')">
            <span>{{ t('showMore') }}</span>
            <i class="arrow-icon"></i>
          </button>
        </div>
        <div class="image-gradient" aria-label="Company Image"></div>
      </div>
    </section>

    <!-- 团队介绍 -->
    <section class="team-section section-card" v-intersect>
      <h2 class="title-decorated">{{ t('teamTitle') }}</h2>
      <div class="content-box">
        <div class="text-content">
          <p>{{ t('teamDesc') }}</p>
          <button class="expand-btn" @click="openModal('team')">
            <span>{{ t('showMore') }}</span>
            <i class="arrow-icon"></i>
          </button>
        </div>
        <div class="team-photos">
          <div class="image-gradient" aria-label="Team Photo"></div>
        </div>
      </div>
    </section>

    <!-- 热销产品 -->
    <section class="products-section section-card" v-intersect>
      <h2 class="title-decorated">{{ t('productsTitle') }}</h2>
      <div class="products-grid">
        <div v-for="product in products" :key="product.id" class="product-card" @mouseenter="hoverProduct(product.id)" @mouseleave="unhoverProduct(product.id)">
          <div class="product-image image-gradient"></div>
          <div class="product-content">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <router-link :to="'/product/' + product.id" class="view-btn">
              {{ t('viewProduct') }}
              <span class="view-btn-arrow">→</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 地域信息 -->
    <section class="location-section section-card" v-intersect>
      <h2 class="title-decorated">{{ t('locationTitle') }}</h2>
      <div class="content-box">
        <div class="text-content">
          <p>{{ t('locationDesc') }}</p>
          <button class="expand-btn" @click="openModal('location')">
            <span>{{ t('showMore') }}</span>
            <i class="arrow-icon"></i>
          </button>
        </div>
        <div class="image-gradient" aria-label="Location Image"></div>
      </div>
    </section>

    <!-- 社交媒体链接 -->
    <section class="social-section section-card" v-intersect>
      <h2 class="title-decorated">{{ t('socialTitle') }}</h2>
      <div class="social-links">
        <a v-for="social in socials" :key="social.name" :href="social.link" target="_blank" class="social-card">
          <span class="social-icon">{{ social.name[0] }}</span>
          <span class="social-name">{{ social.name }}</span>
        </a>
      </div>
    </section>

    <!-- 联系按钮 -->
    <button class="contact-trigger" @click="showContactForm">
      {{ t('contactTitle') }}
    </button>

    <!-- 模态框 -->
    <div class="modal" v-if="activeModal" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">&times;</button>
        <h2>{{ getModalTitle() }}</h2>
        <div class="modal-body">
          <p>{{ getModalContent() }}</p>
        </div>
      </div>
    </div>

    <!-- 联系表单模态框 -->
    <div class="modal contact-modal" v-if="showContact" @click.self="hideContactForm">
      <div class="modal-content contact-form-container">
        <button class="close-btn" @click="hideContactForm">&times;</button>
        <h2 class="contact-title">{{ t('contactTitle') }}</h2>
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label class="form-label">邮箱地址</label>
            <input type="email" :placeholder="t('emailPlaceholder')" v-model="contactForm.email" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">留言内容</label>
            <textarea :placeholder="t('messagePlaceholder')" v-model="contactForm.message" class="form-input textarea"></textarea>
          </div>
          <button type="submit" class="submit-btn">
            {{ t('submit') }}
            <span class="submit-icon">→</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const translations = {
  zh: {
    slogan: '传承百年味道，创新现代风味',
    subSlogan: '用心制作每一款酱料，让美味融入生活',
    companyTitle: '关于火龙企业',
    companyDesc: '成立于2010年，火龙企业专注于传统酱料的现代创新...',
    companyDetailedDesc: '从家族作坊到现代化企业，我们始终坚持品质至上...',
    teamTitle: '我们的团队',
    teamDesc: '由一个充满激情的5人小团队组成，始于家族传承...',
    teamDetailedDesc: '每位成员都怀着对美食的热爱，为产品注入独特创意...',
    productsTitle: '明星产品',
    locationTitle: '我们的位置',
    locationDesc: '总部位于马来西亚Pantai Remis，产品行销西马...',
    locationDetailedDesc: '深耕本土市场，放眼国际视野...',
    socialTitle: '关注我们',
    contactTitle: '联系我们',
    emailPlaceholder: '请输入您的邮箱',
    messagePlaceholder: '请输入您的留言',
    submit: '提交',
    showMore: '查看更多',
    showLess: '收起',
    viewProduct: '了解详情'
  },
  en: {
    slogan: 'Century-old Taste n Innovation',
    subSlogan: 'Crafting Every Sauce with Heart, Bringing Flavor to Life',
    companyTitle: 'About FireDragon Enterprise',
    companyDesc: 'Founded in 2010, FireDragon Enterprise focuses on modern innovation of traditional sauces...',
    companyDetailedDesc: 'From a family workshop to a modern enterprise, we always insist on quality first...',
    teamTitle: 'Our Team',
    teamDesc: 'A passionate team of 5, rooted in family heritage...',
    teamDetailedDesc: 'Each member brings their love for food, infusing unique creativity into our products...',
    productsTitle: 'Featured Products',
    locationTitle: 'Our Location',
    locationDesc: 'Headquartered in Pantai Remis, Malaysia, with Kuala Lumpur...',
    locationDetailedDesc: 'Deep-rooted locally, with a global vision...',
    socialTitle: 'Follow Us',
    contactTitle: 'Contact Us',
    emailPlaceholder: 'Enter your email',
    messagePlaceholder: 'Enter your message',
    submit: 'Submit',
    showMore: 'Show More',
    showLess: 'Show Less',
    viewProduct: 'Learn More'
  }
}
export default {
  name: 'AboutView',
  data() {
    return {
      isExpanded: {
        company: false,
        team: false,
        location: false
      },
      activeModal: null,
      showContact: false,
      hoveredProduct: null,
      intersectElements: new Set(),
      products: [
        { id: 1, name: '传统辣椒酱', description: '经典口味，代代相传' },
        { id: 2, name: '蒜蓉辣酱', description: '独特配方，风味十足' },
        { id: 3, name: '甜辣酱', description: '创新口味，深受欢迎' }
      ],
      socials: [
        { name: 'Facebook', link: '#' },
        { name: 'Instagram', link: '#' },
        { name: 'Twitter', link: '#' }
      ],
      contactForm: {
        email: '',
        message: ''
      }
    }
  },
  computed: {
    ...mapState({
      currentLang: state => state.language.currentLang
    })
  },
  methods: {
    openModal(type) {
      this.activeModal = type
    },
    closeModal() {
      this.activeModal = null
    },
    showContactForm() {
      this.showContact = true
    },
    hideContactForm() {
      this.showContact = false
    },
    getModalTitle() {
      return this.t(this.activeModal + 'Title')
    },
    getModalContent() {
      return this.t(this.activeModal + 'DetailedDesc')
    },
    hoverProduct(id) {
      this.hoveredProduct = id
    },
    unhoverProduct() {
      this.hoveredProduct = null
    },
    t(key) {
      return translations[this.currentLang][key] || key
    },
    toggleSection(section) {
      this.isExpanded[section] = !this.isExpanded[section]
    },
    submitForm() {
      // 处理表单提交逻辑
      console.log('Form submitted:', this.contactForm)
    }
  }
}
</script>

<style scoped>
.about {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Slogan 部分增强 */
.slogan-section {
  text-align: center;
  padding: 80px 0;
  background: linear-gradient(135deg, #F9EBC7 0%, #f4f0d8 100%);
  border-radius: 20px;
  margin-bottom: 60px;
}

.slogan-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.slogan-title {
  font-size: 3.5em;
  color: #2c3e50;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  letter-spacing: 2px;
}

.sub-slogan {
  font-size: 1.5em;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.slogan-underline {
  width: 150px;
  height: 4px;
  background: linear-gradient(90deg, #a49a82, #7a7158);
  margin: 0 auto;
  border-radius: 2px;
}

/* 标题装饰 */
.title-decorated {
  position: relative;
  padding-bottom: 15px;
  margin-bottom: 30px;
}

.title-decorated::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #a49a82, #7a7158);
  transition: width 0.3s ease;
}

.title-decorated:hover::after {
  width: 100px;
}

/* 卡片式部分 */
.section-card {
  padding: 30px;
  margin-bottom: 40px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #f4f0d8;
}

.section-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

/* 社交媒体链接增强 */
.social-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.social-card {
  display: flex;
  align-items: center;
  padding: 15px 25px;
  background: #f4f0d8;
  border-radius: 10px;
  text-decoration: none;
  color: #2c3e50;
  transition: all 0.3s ease;
}

.social-card:hover {
  background: #a49a82;
  color: white;
  transform: translateY(-3px);
}

.social-icon {
  width: 35px;
  height: 35px;
  background: #a49a82;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.social-card:hover .social-icon {
  background: white;
  color: #a49a82;
}

/* 了解详情按钮增强 */
.view-btn {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 5px;
  background: transparent;
  border: 2px solid #a49a82;
  color: #a49a82;
  text-decoration: none;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.view-btn:hover {
  background: #a49a82;
  color: white;
}

.view-btn-arrow {
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.view-btn:hover .view-btn-arrow {
  transform: translateX(5px);
}

/* 联系表单模态框增强 */
.contact-form-container {
  max-width: 600px;
  padding: 40px;
}

.contact-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2em;
}

.form-group {
  margin-bottom: 25px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
  font-weight: 500;
}

.form-input {
  width: 90%;
  padding: 12px 15px;
  border: 2px solid #f4f0d8;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1em;
}

.form-input:focus {
  border-color: #a49a82;
  outline: none;
  box-shadow: 0 0 0 3px rgba(164,154,130,0.2);
}

.textarea {
  min-height: 100px;
  width: 90%;
  resize: vertical;
}

.submit-btn {
  width: 95%;
  padding: 12px;
  background: #a49a82;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-btn:hover {
  background: #7a7158;
  transform: translateY(-2px);
}

.submit-icon {
  margin-left: 10px;
  transition: transform 0.3s ease;
}

.submit-btn:hover .submit-icon {
  transform: translateX(5px);
}

/* 渐变背景图片占位符 */
.image-gradient {
  width: 100%;
  height: 200px;
  background: linear-gradient(45deg, #f4f0d8, #F9EBC7);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.image-gradient::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.3) 50%,
    rgba(255,255,255,0) 100%
  );
  animation: shimmer 2s infinite;
  transform: rotate(30deg);
}

@keyframes shimmer {
  0% {
    transform: translate(-30%, -30%) rotate(30deg);
  }
  100% {
    transform: translate(30%, 30%) rotate(30deg);
  }
}

/* 展开按钮 */
.expand-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #a49a82;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.expand-btn:hover {
  background: rgba(164,154,130,0.1);
}

.arrow-icon {
  border: solid #a49a82;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}

.expand-btn:hover .arrow-icon {
  transform: rotate(-135deg);
}

/* 模态框样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 50px;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  position: relative;
}

.close-btn {
  position: absolute;
  right: 20px;
  top: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

/* 联系按钮 */
.contact-trigger {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 15px 30px;
  background: #a49a82;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(164,154,130,0.3);
  transition: all 0.3s ease;
}

.contact-trigger:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(164,154,130,0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-box {
    flex-direction: column;
  }
  .section-card {
    padding: 20px;
  }
  .contact-trigger {
    bottom: 20px;
    right: 20px;
    padding: 12px 24px;
  }
  .slogan-title {
    font-size: 2.5em;
  }
  .sub-slogan {
    font-size: 1.2em;
  }
  .social-links {
    grid-template-columns: 1fr;
  }
}
</style>
