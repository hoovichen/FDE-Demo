<template>
  <div id="linker">
    <!-- 修改遮罩层，添加点击事件 -->
    <div class="menu-overlay" :class="{'active': isMenuOpen}" @click="closeMenu" style="pointer-events: auto;"></div>

    <!-- 移动端导航菜单 -->
    <div class="mobile-menu" :class="{'menu-open': isMenuOpen}">
      <!-- 添加关闭按钮 -->
      <button class="close-menu-btn" @click="closeMenuAndRefresh" aria-label="Close menu">
        ×
      </button>

      <ul class="menu">
        <li v-for="item in allNavItems" :key="item.path" class="menu-item">
          <router-link :to="item.path" class="nav-link" :class="{'active': $route.path === item.path}" @click="closeMenu">
            {{ getTranslation(item.translationKey) }}
          </router-link>
        </li>
        <!-- 移动端语言切换按钮 -->
        <div class="language-switch">
          <button class="lang-btn" :class="{'active': currentLang === 'zh'}" @click="handleMobileLanguageSwitch('zh')">中</button>
          <span class="lang-divider">|</span>
          <button class="lang-btn" :class="{'active': currentLang === 'en'}" @click="handleMobileLanguageSwitch('en')">En</button>
        </div>
      </ul>
    </div>
    <!-- 顶部导航区域 -->
    <div class="header">
      <!-- Logo和导航容器 -->
      <div class="header-container">
        <!-- 左侧导航菜单 -->
        <nav class="menu-container left-menu" :class="{'menu-open': isMenuOpen}" aria-label="Left navigation">
          <ul class="menu">
            <li v-for="item in leftNavItems" :key="item.path" class="menu-item">
              <router-link :to="item.path" class="nav-link" :class="{'active': $route.path === item.path}">
                {{ getTranslation(item.translationKey) }}
              </router-link>
            </li>
          </ul>
        </nav>

        <!-- 移动端菜单按钮 - 仅在小屏幕显示 -->
        <button class="hidden-menu-button" @click="toggleMenu" aria-label="Toggle menu">
          <span class="menu-icon">&#9776;</span>
        </button>

        <!-- 居中Logo区域 -->
        <div class="header-logo-container">
          <router-link to="/">
            <img alt="logo" src="./assets/logo-3-topic.png" class="logo-img">
          </router-link>
        </div>

        <!-- 右侧导航菜单 -->
        <nav class="menu-container right-menu" :class="{'menu-open': isMenuOpen}" aria-label="Right navigation">
          <ul class="menu">
            <li v-for="item in rightNavItems" :key="item.path" class="menu-item">
              <router-link :to="item.path" class="nav-link" :class="{'active': $route.path === item.path}">
                {{ getTranslation(item.translationKey) }}
              </router-link>
            </li>
          </ul>

          <!-- 桌面端语言切换 -->
          <div class="language-switch desktop-lang">
            <button class="lang-btn" :class="{'active': currentLang === 'zh'}" @click="handleLanguageSwitch('zh')">中</button>
            <span class="lang-divider">|</span>
            <button class="lang-btn" :class="{'active': currentLang === 'en'}" @click="handleLanguageSwitch('en')">En</button>
          </div>
        </nav>
      </div>
    </div>
    <!-- 移动端导航菜单和遮罩放在header之前 -->
    <div class="menu-overlay" :class="{'active': isMenuOpen}" @click="closeMenu"></div>
    <!-- 主要内容区域 -->
    <div class="view">
      <router-view/>
    </div>

    <!-- 页脚版权信息 -->
    <footer class="footer">
      <div class="footer-content">
        <p class="copyright">
          Copyright © {{ currentYear }} Fire Dragon Enterprise - All Rights Reserved.
        </p>
        <p class="icp">
          ---
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

// 导航菜单翻译常量
const TRANSLATIONS = {
  zh: {
    nav: {
      home: '首页',
      product: '产品',
      stories: '品牌故事',
      about: '关于我们',
      faq: '常见问题',
      contact: '联系我们'
    }
  },
  en: {
    nav: {
      home: 'Home',
      product: 'Products',
      stories: 'Brand Story',
      about: 'About Us',
      faq: 'FAQ',
      contact: 'Contact'
    }
  }
}
const NAV_ITEMS = {
  left: [
    { path: '/', translationKey: 'nav.home' },
    { path: '/product', translationKey: 'nav.product' },
    { path: '/stories', translationKey: 'nav.stories' }
  ],
  right: [
    { path: '/about', translationKey: 'nav.about' },
    { path: '/faq', translationKey: 'nav.faq' },
    { path: '/contact', translationKey: 'nav.contact' }
  ]
}
export default {
  name: 'App',
  data() {
    return {
      isMenuOpen: false,
      currentYear: new Date().getFullYear(),
      leftNavItems: NAV_ITEMS.left,
      rightNavItems: NAV_ITEMS.right,
      needsRefresh: false
    }
  },
  computed: {
    ...mapState({
      currentLang: state => state.language.currentLang
    }),
    // 合并所有导航项用于移动端显示
    allNavItems() {
      return [...this.leftNavItems, ...this.rightNavItems]
    }
  },
  methods: {
    ...mapActions(['switchLanguage']),
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : ''
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
    },
    closeMenu() {
      this.isMenuOpen = false
      document.body.style.overflow = ''
      if (this.needsRefresh) {
        this.updateMetaInfo()
        this.needsRefresh = false
      }
    },
    closeMenuAndRefresh() {
      if (this.needsRefresh) {
        this.updateMetaInfo()
      }
      this.closeMenu()
    },
    handleLanguageSwitch(lang) {
      this.switchLanguage(lang)
      this.closeMenu()
      this.updateMetaInfo()
    },
    handleMobileLanguageSwitch(lang) {
      this.switchLanguage(lang)
      this.needsRefresh = true
    },
    updateMetaInfo() {
      const route = this.$route
      if (route.meta && route.meta[this.currentLang]) {
        document.title = route.meta[this.currentLang].title
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
          metaDescription.setAttribute('content', route.meta[this.currentLang].description)
        }
      }
    }
  },
  watch: {
    currentLang: {
      handler(newLang) {
        this.updateMetaInfo()
      },
      immediate: true
    },
    $route() {
      this.isMenuOpen = false
      this.updateMetaInfo()
    }
  },
  created() {
    // 初始化时设置正确的标题和描述
    const route = this.$route
    if (route.meta && route.meta[this.currentLang]) {
      document.title = route.meta[this.currentLang].title
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', route.meta[this.currentLang].description)
      }
    }
  },
  mounted() {
    // 添加ESC键关闭菜单
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu()
      }
    })
  },
  beforeDestroy() {
    document.removeEventListener('keydown')
    document.body.style.overflow = ''
  }
}
</script>

<style>
@import 'AppStyle.scss';

/* 添加关闭按钮样式 */
.close-menu-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    color: #2c3e50;
  }
}
</style>
