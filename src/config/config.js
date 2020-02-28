/**
 * @author LiuJiaqing
 * @date 2020-02-26
 * @Description: 认证中心配置文件
 */
const config = {
  /** 认证中心 配置 **/
  // 认证中心后端授权地址域名端口
  userAuthorizationPort: 'http://172.28.31.115:7001',
  // 认证中心后端授权API
  userAuthorizationApi: '/cfsoc-auth/oauth/authorize',
  // 认证中心前端域名端口
  authWebPort: 'http://172.28.31.115:7001', //router 拦截到登录首页
  /** 认证中心 配置END **/


  /** 管理中心 配置**/

  // 管理中心前端域名端口
  cfscPort: 'http://172.28.31.115:7001',
  // 管理中心前端地址
  cfscUrl: '/cfsc/manage/',
  // 管理中心客户端ID
  cfsc_client_id: 'study2',
  // 管理中心客户端password
  cfsc_password: '654321',
  // 管理中心权限 code
  cfscPermissionCode: 'CFSCENTER',
  /** 管理中心配置END**/


  /** 通关中心配置**/

  // 通关中心前端域名端口
  customWebPort: 'http://127.0.0.1:8083',
  // 通关中心前端地址
  customWebUrl: '/cfsc/manage/',
  // 通关中心客户端 ID
  customWeb_client_id: 'customs',
  // 管理中心客户端password
  customWeb_password: '',
  // 通关中心权限 code
  customPermissionCode: 'CUSTOMS',
  /** 通关中心 配置 END**/

  /** BPM 中心配置**/

  // BPM前端域名端口
  bpmPort: '',
  // 通关中心前端地址
  bpmUrl: '',
  // 通关中心客户端 ID
  bpm_client_id: '',
  // 管理中心客户端password
  bpm_password: '',
  // 通关中心权限 code
  bpmPermissionCode: '',
  /** 通关中心 配置 END**/

}

export default config
