<template>
  <div style="color: #666; font-size: 14px">
    <el-card>
     
      <div>欢迎光临！</div>
    </el-card>
  </div>
</template>
   

   
<style lang="scss" scoped>
.title {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 5px;
  text-align: center;
}

.list {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 5px;

  .listitem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    margin-bottom: 5px;
    font-weight: 500;
    padding-bottom: 8px;
    border-bottom: 1px dashed #333;

  }
}

.list::-webkit-scrollbar {
  display: none
}</style>