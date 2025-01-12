<template>
  <div id="linker">
    <!-- 顶部导航区域 -->
    <div class="header">
      <!-- Logo和导航容器 -->
      <div class="header-container">
        <!-- Logo区域 -->
        <router-link class="header-logo-container" to="/">
          <img alt="logo" src="./assets/logo-3-topic.png" class="logo-img">
        </router-link>

        <!-- 移动端菜单按钮 - 仅在小屏幕显示 -->
        <button class="hidden-menu-button" @click="toggleMenu" aria-label="Toggle menu">
          <span class="menu-icon">&#9776;</span>
        </button>

        <!-- 导航菜单容器 - 响应式布局 -->
        <nav class="menu-container" :class="{'menu-open': isMenuOpen}" aria-label="Main navigation">
          <!-- 主导航菜单列表 -->
          <ul class="menu">
            <li class="menu-item">
              <router-link to="/" class="nav-link" :class="{'active': $route.path === '/'}">{{ getTranslation('nav.home') }}</router-link>
            </li>
            <li class="menu-item">
              <router-link to="/product" class="nav-link" :class="{'active': $route.path === '/product'}">{{ getTranslation('nav.product') }}</router-link>
            </li>
            <li class="menu-item">
              <router-link to="/stories" class="nav-link" :class="{'active': $route.path === '/stories'}">{{ getTranslation('nav.stories') }}</router-link>
            </li>
            <li class="menu-item">
              <router-link to="/about" class="nav-link" :class="{'active': $route.path === '/about'}">{{ getTranslation('nav.about') }}</router-link>
            </li>
            <li class="menu-item">
              <router-link to="/faq" class="nav-link" :class="{'active': $route.path === '/faq'}">{{ getTranslation('nav.faq') }}</router-link>
            </li>
            <li class="menu-item">
              <router-link to="/contact" class="nav-link" :class="{'active': $route.path === '/contact'}">{{ getTranslation('nav.contact') }}</router-link>
            </li>
          </ul>

          <!-- 语言切换按钮 -->
          <div class="language-switch">
            <button class="lang-btn" :class="{'active': currentLang === 'zh'}" @click="handleLanguageSwitch('zh')">
              中
            </button>
            <span class="lang-divider">|</span>
            <button class="lang-btn" :class="{'active': currentLang === 'en'}" @click="handleLanguageSwitch('en')">
              En
            </button>
          </div>
        </nav>
      </div>
    </div>

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

export default {
  name: 'App',
  data() {
    return {
      isMenuOpen: false,
      currentYear: new Date().getFullYear()
    }
  },
  computed: {
    ...mapState({
      currentLang: state => state.language.currentLang
    })
  },
  methods: {
    ...mapActions(['switchLanguage']),
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
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
  watch: {
    $route() {
      this.isMenuOpen = false
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
  }
}
</script>

<style>
@import 'AppStyle.scss';

#linker {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* 头部导航样式 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #F9EBC7;
  z-index: 1000;
  padding: 10px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 主要内容区域样式 */
.view {
  padding-top: 120px;
  min-height: calc(100vh - 120px);
  width: 100%;
  position: relative;
  flex: 1;
}

/* 页脚样式 */
.footer {
  width: 100%;
  background-color: #F9EBC7;
  padding: 20px 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: #666;
}

.copyright {
  font-size: 14px;
  margin-bottom: 8px;
}

.icp {
  font-size: 12px;
  color: #999;
}
</style>
