<template>
  <div class="contact">
    <!-- 总部信息 -->
    <section v-intersect class="headquarters-section section-card" >
      <h2 class="title-decorated">{{ t('headquartersTitle') }}</h2>
      <div class="content-box">
        <div class="text-content">
          <div class="contact-info">
            <div class="info-item">
              <i class="location-icon"></i>
              <span>{{ t('address') }}: Pantai Remis, Perak</span>
            </div>
            <div class="info-item">
              <i class="phone-icon"></i>
              <span>{{ t('phone') }}: 018-9501638</span>
            </div>
          </div>
        </div>
        <div class="image-placeholder">
          <div class="placeholder-text">Non-existent image</div>
        </div>
      </div>
    </section>

    <!-- 代理商信息 -->
    <section v-intersect class="agents-section section-card" >
      <h2 class="title-decorated">{{ t('agentsTitle') }}</h2>
      <div class="agents-grid">
        <div v-for="agent in agents" :key="agent.region" class="agent-card">
          <h3>{{ agent.region }}</h3>
          <div class="agent-info">
            <p class="agent-name">{{ t('contact') }}: {{ agent.contact }}</p>
            <button class="contact-btn" @click="contactAgent(agent)">
              {{ t('contactNow') }}
              <span class="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系表单 -->
    <section v-intersect class="contact-form-section section-card" >
      <h2 class="title-decorated">{{ t('contactFormTitle') }}</h2>
      <form class="contact-form" @submit.prevent="submitForm">
        <div class="form-group">
          <label>{{ t('name') }}</label>
          <input v-model="form.name" type="text" :placeholder="t('namePlaceholder')" required>
        </div>
        <div class="form-group">
          <label>{{ t('email') }}</label>
          <input v-model="form.email" type="email" :placeholder="t('emailPlaceholder')" required>
        </div>
        <div class="form-group">
          <label>{{ t('message') }}</label>
          <textarea v-model="form.message" :placeholder="t('messagePlaceholder')" required></textarea>
        </div>
        <button type="submit" class="submit-btn">
          {{ t('submit') }}
          <span class="submit-icon">→</span>
        </button>
      </form>
    </section>
  </div>
</template>

<script>
const translations = {
  zh: {
    headquartersTitle: '总部信息',
    agentsTitle: '全球代理商',
    contactFormTitle: '联系我们',
    address: '地址',
    phone: '电话',
    contact: '联系人',
    contactNow: '立即联系',
    name: '姓名',
    email: '邮箱',
    message: '留言',
    submit: '提交',
    namePlaceholder: '请输入您的姓名',
    emailPlaceholder: '请输入您的邮箱',
    messagePlaceholder: '请输入您的留言'
  },
  en: {
    headquartersTitle: 'Headquarters',
    agentsTitle: 'Global Agents',
    contactFormTitle: 'Contact Us',
    address: 'Address',
    phone: 'Phone',
    contact: 'Contact',
    contactNow: 'Contact Now',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    submit: 'Submit',
    namePlaceholder: 'Enter your name',
    emailPlaceholder: 'Enter your email',
    messagePlaceholder: 'Enter your message'
  }
}

export default {
  name: 'ContactView',
  data() {
    return {
      agents: [
        { region: '澳门', contact: '梁俊康' },
        { region: '香港', contact: '吴家豪' },
        { region: '英国', contact: '郭堂正' },
        { region: '新加坡', contact: '待定' }
      ],
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  computed: {
    currentLang() {
      return this.$store.state.language.currentLang
    }
  },
  methods: {
    t(key) {
      return translations[this.currentLang][key] || key
    },
    contactAgent(agent) {
      console.log('Contacting agent:', agent)
      // 实现代理商联系逻辑
    },
    submitForm() {
      console.log('Form submitted:', this.form)
      // 实现表单提交逻辑
    }
  }
}
</script>

<style scoped>
.contact {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.title-decorated {
  color: #2c3e50;
  font-size: 2em;
  margin-bottom: 30px;
  position: relative;
  padding-left: 20px;
}

.title-decorated::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 70%;
  background: #a49a82;
  border-radius: 2px;
}

.content-box {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.text-content {
  flex: 1;
  min-width: 300px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.info-item:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: translateX(5px);
}

.image-placeholder {
  width: 100%;
  padding-top: calc(5 / 16 * 100%);
  background: #f0f0f0;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.placeholder-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #999;
  font-size: 1.2em;
}

@media (min-width: 768px) {
  .content-box {
    flex-direction: row;
  }

  .text-content {
    flex: 0 0 300px;
    margin-right: 30px;
  }

  .image-placeholder {
    flex: 1;
  }
}

.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.agent-card {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.agent-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.agent-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.agent-info {
  color: #666;
}

.contact-btn {
  margin-top: 15px;
  padding: 8px 15px;
  background: #a49a82;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-btn:hover {
  background: #8a816c;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #f4f0d8;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #a49a82;
  outline: none;
  box-shadow: 0 0 0 3px rgba(164,154,130,0.2);
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #a49a82;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.submit-btn:hover {
  background: #8a816c;
}

@media (max-width: 768px) {
  .content-box {
    flex-direction: column;
  }

  .map-container {
    min-height: 200px;
  }

  .agents-grid {
    grid-template-columns: 1fr;
  }
}
</style>
