<template>
  <div class="login-ctx">
    <el-container class="login-wrp " :style="{height: fullHeight +'px'}">
      <div class="customs-login" :style="{backgroundImage: 'url(' + backImgUrl + ')'}">
        <header class="logoHead">
          <img :src="logoImg"/>
        </header>
        <div class="main-body">
          <div class="left-body" :style="{backgroundImage: 'url(' + fontImgUrl + ')'}">
            <label>外运 E拼 -- 运营中心</label>
            <div class="left-divider"></div>
            <div class="bottom-title">
              开城箱见，E享未来
            </div>
          </div>
          <div class="right-body">
            <div class="login-pannel">
              <el-link :underline="false" class="pannel-choose" :class="{ grayLabel: (chooseLoginType == 'tokenLogin')}"
                       @click="chooseLoginType = 'password'">密码登录
              </el-link>
              <div class="divider"></div>
              <el-link :underline="false" class="pannel-choose" :class="{ grayLabel: (chooseLoginType == 'password')}"
                       @click="chooseLoginType = 'tokenLogin'">验证码登录
              </el-link>
              <div class="left-form">
                <el-form label-position="left" :rules="rules" ref="loginForm" :model="loginForm">
                  <el-form-item prop="username">
                    <el-input v-model.trim="loginForm.username" placeholder="请输入用户名" @keyup.enter.native="toLogin">
                      <i slot="prefix" class="icon icon-user_new">
                        <img :src="user_new" style="margin-top: 10px"/>
                      </i>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"
                              @keyup.enter.native="toLogin">
                      <i slot="prefix" class="icon icon-password_new">
                        <img :src="password_new" style="margin-top: 10px"/>
                      </i>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="tokenValue">
                    <el-input v-model="loginForm.tokenValue" placeholder="请输入验证码" @keyup.enter.native="toLogin"
                              style="position: relative">
                      <i slot="prefix" class="icon icon-token">
                        <img :src="token_new" style="margin-top: 10px"/>
                      </i>
                    </el-input>
                    <div class="code" @click="refreshCode">
                      <SIdentify :identifyCode="identifyCode"></SIdentify>
                    </div>
                  </el-form-item>
                </el-form>
                <el-button type="primary" class="login-button" @click="toLogin">登录</el-button>
                <p class="errorMessage">{{errMsg}}</p>
              </div>
            </div>
          </div>
          <div class="wx-icon">
            <label>公众号</label>
            <img :src="WxImgUrl" style="width: 100px;height: 100px"/>
          </div>
        </div>
        <footer class="login-footer">
          <p>本网站建议使用Chrome浏览器访问 下载链接：<a href="https://www.google.com/intl/zh-CN/chrome/">Chrome</a></p>
          <p style="margin: 10px auto">粤ICP备14004400号 | 增值电信业务经营许可编号：粤B2-20140394 | Copyright© 2013-2018 <a
            href="http://www.y2t.com">www.y2t.com</a> All Rights Reserved</p>
        </footer>
      </div>
    </el-container>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import querystring from 'querystring'
  import constants from '../assets/js/constants'
  import SIdentify from '../components/identify'

  export default {
    name: 'OathLogin',
    components: {
      SIdentify
    },
    mounted() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          this.fullHeight = window.fullHeight
        })()
      }
    },
    watch: {
      fullHeight(val) {
        if (!this.timer) {
          this.fullHeight = val
          this.timer = true
          let that = this
          setTimeout(function () {
            that.timer = false
          }, 400)
        }
      }
    },
    data() {
      let checkTokenValue = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          if (this.loginForm.tokenValue !== this.identifyCode) {
            callback(new Error('验证码不正确'));
          }
          callback();
        }
      };
      return {
        tableHeight: constants.WindowHeight,
        logoImg: require('../assets/img/logo.png'),
        backImgUrl: require('../assets/img/bpm-bg.jpg'),
        fontImgUrl: require('../assets/img/bpm-bg1.png'),
        WxImgUrl: require('../assets/img/wx.jpg'),
        user_new: require('../assets/img/icon/user_new.png'),
        token_new: require('../assets/img/icon/token.png'),
        password_new: require('../assets/img/icon/password_new.png'),
        activeName: 'first',
        loginForm: {
          username: '',
          password: '',
          tokenValue: ''
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          tokenValue: [{
            required: true,
            trigger: 'blur',
            validator: checkTokenValue
          }],
        },
        identifyCodes: "1234567890",
        identifyCode: "",
        fullHeight: document.documentElement.clientHeight,
        chooseLoginType: 'password',
        errMsg: ''
      }
    },
    computed: {
      ...mapGetters(['access_token'])
    },
    methods: {
      toLogin() {
        let self = this
        const subData = new FormData()
        self.$refs.loginForm.validate((valid) => {
          if (valid) {
            subData.append('username', self.loginForm.username)
            subData.append('password', self.loginForm.password)
            self.axios({
              method: 'post',
              url: '/cfsoc-auth/login',
              data: subData
            })
              .then(res => {
                if (res.data.code != 0) {
                  // 密码错误
                  self.$message.error(res.data.message)
                  self.errMsg = '账号或密码错误！'
                } else {
                  // 跳转门户首页
                  window.sessionStorage.setItem('userName',res.data.data.userName)
                  self.$router.push('/cfsauth/Home')
                  self.errMsg = ''
                }
              })
              .catch(e => {
                self.$message.error('系统异常')
              })
          } else {
            return false
          }
        })
      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
        // console.log(this.identifyCode);
      }
    }
  }
</script>
<style lang="scss">
  @import "../assets/scss/customsLogin";
</style>

