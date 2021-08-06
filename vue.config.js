//别名的配置。自己新建的文件。以后写文件路径的时候可以不写 ./  ../
//script里  import时可以直接用这个别名
//templete里 在img的src中，需要加“~”才能用别名
module.exports = {
  configureWebpack: {
    resolve: {
      // extensions:['.js','.vue','.json'], 配置后文件扩展名可省略
      alias: {
        // '@':'src'  默认配置的别名
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'router':'@/router', //router 和store 不需要配置，因为只有一处会引用this.$store  this.$router
        'store':'@/store',
        'views': '@/views',
      }
    }
  }
}
