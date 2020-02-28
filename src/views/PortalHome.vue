/**
* @author LiuJiaqing
* @date 2020-02-25
* @Description: 门户首页
*/
<template>
  <div class="protHome" :style="{height: fullHeight +'px'}">
    <div class="water">
      <div class="ripple"></div>
    </div>
    <header class="homeHead">
      <img :src="logoUrl" class="headLogo">
      <div class="userLoginOut">
        <img :src="userUrl" class="userImg">
        <span> {{ userName}}</span>
        <span>&nbsp;|&nbsp;</span>
        <img :src="logoutUrl" style="cursor: pointer"/>
        <el-button type="text" class="outBtn" @click="loginOut">退出</el-button>
      </div>
    </header>
    <section class="homeBody">
      <div class="line">
        <div class="nodeCenter">
          <img :src="bpmActive" class="centerImg"/>
          <label class="centerTitle"> 流程中心 </label>
          <p class="centerDetail">描述内容待定...</p>
        </div>
        <div class="nodeCenter"
             @click="goCenter( cfsc_client_id, userResourses.includes(cfscPermissionCode) && ProductsArray.find(val=>{return val.productCode === cfscPermissionCode}).isAuth === 'Y' )">
          <img :src="cfscActive" class="centerImg"
               v-if="userResourses.includes(cfscPermissionCode) && ProductsArray.find(val=>{return val.productCode === cfscPermissionCode}).isAuth === 'Y'"/>
          <img :src="cfscFailure" class="centerImg" v-else/>
          <label class="centerTitle"> 管理中心 </label>
          <p class="centerDetail">描述内容待定...</p>
        </div>
        <div class="nodeCenter"
             @click="goCenter( customWeb_client_id, userResourses.includes(customPermissionCode) && ProductsArray.find(val=>{return val.productCode === customPermissionCode}).isAuth === 'Y' )">
          <img :src="customActive" class="centerImg"
               v-if="userResourses.includes(customPermissionCode) && ProductsArray.find(val=>{return val.productCode === customPermissionCode}).isAuth === 'Y'"/>
          <img :src="customFailure" class="centerImg" v-else/>
          <label class="centerTitle"> 通关中心 </label>
          <p class="centerDetail">描述内容待定...</p>
        </div>
        <div class="nodeCenter">
          <img :src="centerActive" class="centerImg"/>
          <label class="centerTitle"> 中控中心 </label>
          <p class="centerDetail">描述内容待定...</p>
        </div>
      </div>
      <div class="line">
        <div class="nodeCenter">
          <img :src="riskActive" class="centerImg"/>
          <label class="centerTitle"> 风控中心 </label>
          <p class="centerDetail">描述内容待定...</p>
        </div>
        <div class="nodeCenter">
          <img :src="schedulActive" class="centerImg"/>
          <label class="centerTitle"> 调度中心 </label>
          <p class="centerDetail">描述内容待定...</p>
        </div>
        <div class="nodeCenter">
          <img :src="cusServerActive" class="centerImg"/>
          <label class="centerTitle"> 客服中心 </label>
          <p class="centerDetail">描述内容待定...</p>
        </div>
        <div class="nodeCenter">
          <img :src="orderActive" class="centerImg"/>
          <label class="centerTitle"> 订单中心 </label>
          <p class="centerDetail">描述内容待定...</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import querystring from 'querystring'
  import {mapGetters} from 'vuex'
  import oauthConfig from '../config/config'

  export default {
    name: "PortalHome",
    mounted() {
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          this.fullHeight = window.fullHeight
        })()
      }
      this.userName = window.sessionStorage.getItem('userName')
      this.getProducts()
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
      return {
        fullHeight: document.documentElement.clientHeight,
        logoUrl: require('../assets/img/ZWY.png'),
        userUrl: require('../assets/img/userImg.png'),
        logoutUrl: require('../assets/img/icon/logout.png'),
        bpmActive: require('../assets/img/bpm_Active.png'),
        bpmFailure: require('../assets/img/bpm_Failure.png'),
        customActive: require('../assets/img/custom_Active.png'),
        customFailure: require('../assets/img/custom_Failure.png'),
        cfscActive: require('../assets/img/cfsc_Active.png'),
        cfscFailure: require('../assets/img/cfsc_Failure.png'),
        centerActive: require('../assets/img/central_Active.png'),
        centerFailure: require('../assets/img/central_Failure.png'),
        riskActive: require('../assets/img/risk_Active.png'),
        riskFailure: require('../assets/img/risk_Failure.png'),
        schedulActive: require('../assets/img/schedul_Active.png'),
        schedulFailure: require('../assets/img/schedul_Failure.png'),
        cusServerActive: require('../assets/img/cusServer_Active.png'),
        cusServerFailure: require('../assets/img/cusServer_Failure.png'),
        orderActive: require('../assets/img/order_Active.png'),
        orderFailure: require('../assets/img/order_Failure.png'),
        userName: '',
        userResourses: [],
        ProductsArray: [],
        cfsc_client_id: oauthConfig.cfsc_client_id,
        cfscPermissionCode: oauthConfig.cfscPermissionCode,
        customWeb_client_id: oauthConfig.customWeb_client_id,
        customPermissionCode: oauthConfig.customPermissionCode
      }
    },
    computed: {},
    methods: {
      /**
       * 跳转中心
       * @param value client_id
       * @param perFlag 权限控制
       */
      async goCenter(value, perFlag) {
        let self = this
        try {
          let resouses = await self.getProducts()
          if (!perFlag) { // 无权限
            self.$message.error('暂无权限访问')
            return false
          }
          switch (value) {
            case self.cfsc_client_id: {
              self.getCodeByAouth(value, oauthConfig.cfscPort, oauthConfig.cfscUrl)
              break;
            }
          }
        } catch (e) {
          // 跳转登录
          setTimeout(() => {
            window.location.href = '/'
          }, 1000)
        }
      },
      /**
       * 重定向到中心系统
       * @param value   中心id
       * @param webPort 端口
       * @param webUrl  url
       */
      getCodeByAouth(value, webPort, webUrl) {
        let self = this
        // var authorUrl = 'http://127.0.0.1:9000/cfsoc-auth/oauth/authorize'
        var authorUrl = oauthConfig.userAuthorizationPort + oauthConfig.userAuthorizationApi
        authorUrl =
          authorUrl +
          ('?' +
            querystring.stringify({
              client_id: value,
              response_type: 'code',
              // redirect_uri: 'http://127.0.0.1:8081/cfsc/manage' // 登录'管理中心'成功的页面URL
              redirect_uri: webPort + webUrl // 登录'管理中心'成功的页面URL
            }))
        //   window.location.href = authorUrl
        window.open(authorUrl, '_blank')
      },
      /**
       * 退出登录
       */
      loginOut() {
        let self = this
        self.axios({
          method: "get",
          url: "/cfsoc-auth/logout",
        }).then(function (res) {
          if (res.data && res.data.code == 0) {
            // window.location.href = 'http://127.0.0.1:8082/cfsoc/login'
            self.$router.push('/cfsauth/login')
          } else {
            self.$notify.error({
              title: "提示",
              message: res.data.message
            })
          }
        }).catch(function (e) {
          console.info(e)
          self.$notify.error({
            title: "提示",
            message: '请求接口失败，请检查网络'
          })
        })
      },
      /**
       * 获取中心权限
       */
      getProducts() {
        let self = this
        return new Promise((resolve, reject) => {
          self.axios({
            method: "post",
            url: "/cfsoc-auth/user/getProducts",
          }).then(res => {
            if (res.data.code === 1) {
              reject('Not Login')
            } else {
              self.ProductsArray = res.data.data
              for (let el of res.data.data) {
                self.userResourses.push(el.productCode)
              }
              resolve(res.data.data)
            }
          }).catch(e => {
            reject(e)
          })
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../src/assets/scss/portHome";
</style>
