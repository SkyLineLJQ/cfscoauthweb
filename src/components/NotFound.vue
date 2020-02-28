<template>
    <div>
      <h1> 你看到我说明你迷路了,请好好检查网址路径</h1>
      <el-button @click="returnLogin">返回登录</el-button>
    </div>
</template>

<script>
    export default {
        name: "NotFound",
        data() {
            return {}
        },
        methods: {
          returnLogin(){
            this.$router.push('/')
          }
        }
    }
</script>

<style scoped>

</style>
