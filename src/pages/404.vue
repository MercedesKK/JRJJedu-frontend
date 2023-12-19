<template>
  <el-result icon="warning" title="404提示" sub-title="你找的页面走丢了~">
    <template #extra>
      <router-link to="/home"><el-button type="primary">返回首页</el-button></router-link>
    </template>
  </el-result>
</template>