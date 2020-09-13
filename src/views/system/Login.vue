<template>
  <div class="lowin">
    <div class="lowin-brand">
      <img src="http://demo.qfpffmp.cn/cssthemes5/twts_195_lowin/kodinger.jpg" alt="logo">
    </div>
    <div class="lowin-wrapper" style="min-height: 456px;">
      <div class="lowin-box lowin-login">
        <div class="lowin-box-inner">
          <form action="#login">
            <p>素材站后台管理</p>
            <div class="lowin-group">
              <label></label>
              <input type="email" autocomplete="email" v-model="username" name="email" class="lowin-input">
            </div>
            <div class="lowin-group password-group" style="height: 69px;">
              <label></label>
              <input type="password" name="password" v-model="password" autocomplete="current-password"
                     class="lowin-input">
            </div>
            <a class="lowin-btn login-btn" @click="login">
              登录
            </a>
          </form>
        </div>
      </div>
      <div class="lowin-box lowin-register lowin-flip">
        <div class="lowin-box-inner">
          <form>
            <p>Let's create your account</p>
            <div class="lowin-group">
              <label>Name</label>
              <input type="text" name="name" autocomplete="name" class="lowin-input">
            </div>
            <div class="lowin-group">
              <label>账号</label>
              <input type="text" name="username" class="lowin-input">
            </div>
            <div class="lowin-group">
              <label>密码</label>
              <input type="password" name="password" class="lowin-input">
            </div>
            <button class="lowin-btn">
              登录
            </button>

            <div class="text-foot">
              Already have an account? <a href="" class="login-link">Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
    <footer class="lowin-footer">
      Design By @sucai.biz. More Templates <a href="http://www.sucai.biz" target="_blank" title="素材站">素材站</a>
    </footer>
  </div>
</template>
<script>
import {ref} from 'vue'
import {login} from '@/api/login'
import sha1 from 'sha1'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'Login',
  setup() {
    const username = ref(''),
        password = ref('')
    return [
      username,
      password
    ]
  },
  computed:mapState(['access_token']),
  methods: {
    ...mapState([]),
    login() {
      const data = {
        username: this.username,
        password: sha1(this.password)
      }
      login(data)
          .then((data) => {
            if (data.success) {
              this.$store.dispatch('setAccessToken', data.data.token)
              this.$router.push({path: '/index'})
            }
          })
    }
  },
}
</script>

<style lang="scss">
.lowin {
  --color-primary: #44a0b3;
  --color-grey: rgba(68, 160, 179, .06);
  --color-dark: rgba(68, 160, 179, .5);
  --color-semidark: rgba(68, 160, 179, .5);
  text-align: center;
  font-family: 'Segoe UI';
  font-size: 14px;
  padding-top: 120px;
}

.lowin .lowin-brand {
  overflow: hidden;
  width: 100px;
  height: 100px;
  margin: 0 auto -50px auto;
  border-radius: 50%;
  -webkit-box-shadow: 0 4px 40px rgba(0, 0, 0, .07);
  box-shadow: 0 4px 40px rgba(0, 0, 0, .07);
  padding: 10px;
  background-color: #fff;
  z-index: 1;
  position: relative;
}

.lowin .lowin-brand img {
  width: 100%;
}

.lowin .lowin-wrapper {
  -webkit-transition: all 1s;
  -o-transition: all 1s;
  transition: all 1s;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  position: relative;
  height: 100%;
  width: 360px;
  margin: 0 auto;
}

.lowin * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.lowin .lowin-box {
  width: 100%;
  position: absolute;
  left: 0;
}

.lowin .lowin-box-inner {
  background-color: #fff;
  -webkit-box-shadow: 0 7px 25px rgba(0, 0, 0, .08);
  box-shadow: 0 7px 25px rgba(0, 0, 0, .08);
  padding: 60px 25px 25px 25px;
  text-align: left;
  border-radius: 3px;
}

form {
  display: block;
  margin-top: 0em;
}

.lowin .lowin-box p {
  color: var(--color-semidark);
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
}

.lowin .lowin-box .lowin-group {
  margin-bottom: 30px;
}

.lowin .lowin-box label {
  margin-bottom: 5px;
  display: inline-block;
  width: 100%;
  color: var(--color-semidark);
  font-weight: 700;
}

.lowin .lowin-box label a {
  float: right;
}

.lowin .lowin-box .lowin-input {
  background-color: var(--color-grey);
  color: var(--color-dark);
  border: none;
  border-radius: 3px;
  padding: 15px 20px;
  width: 100%;
  outline: 0;
}

.lowin .lowin-group.password-group {
  -webkit-transition: all 1s;
  -o-transition: all 1s;
  transition: all 1s;
}

.lowin .lowin-box .lowin-btn {
  display: inline-block;
  width: 100%;
  border: none;
  color: #fff;
  padding: 15px;
  border-radius: 3px;
  background-color: var(--color-primary);
  -webkit-box-shadow: 0 2px 7px var(--color-semidark);
  box-shadow: 0 2px 7px var(--color-semidark);
  font-weight: 700;
  outline: 0;
  cursor: pointer;
  -webkit-transition: all .5s;
  -o-transition: all .5s;
  transition: all .5s;
}

.lowin .text-foot {
  text-align: center;
  padding: 10px;
  font-weight: 700;
  margin-top: 20px;
  color: var(--color-semidark);
}

.lowin a {
  color: var(--color-primary);
  text-decoration: none;
  border-bottom: 1px dashed var(--color-semidark);
  margin-top: -3px;
  padding-bottom: 2px;
}

.lowin .lowin-box.lowin-flip {
  -webkit-transform: rotate3d(0, 1, 0, -180deg);
  transform: rotate3d(0, 1, 0, -180deg);
  display: none;
  opacity: 0;
}

.lowin .lowin-footer {
  text-align: center;
  font-size: 12px;
  color: var(--color-semidark);
  font-weight: 700;
  position: fixed;
  bottom: 0px;
  margin: 0 auto;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
</style>
