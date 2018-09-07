# title

## 方法：

### init(option)

######    option.URL   请求的地址
######    option.fetchBefore(opts)   请求前处理函数
######    option.success(rst,opts)   请求成功处理函数，这里需要返回值(没有则直接返回)
######    option.error(err)    请求错误函数
#



###  del(url,options)  delete方法
###  post(url,options)  post方法
###  upload(url,body)  上传文件
###  put(url,options)  put方法
###  get(url,options)  get方法
#

######    options.deal    是否处理结果
######    options.load    是否loading
######    options.data    上传 json 字符串
