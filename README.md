# miku-ssn4.1

##欢迎来到《湿湿娘V4.1》项目主页
本项目（前端部分）主要由三部分构成

1. 源码部分：<https://github.com/MIKUScallion/miku-ssn4.1/tree/master>。

2. 静态资源部分：<https://github.com/MIKUScallion/miku-ssn4.1_static/tree/gh-pages>。

3. 发布代码部分：<https://github.com/MIKUScallion/miku-ssn4.1/tree/gh-pages>。

源码部分主要为react组件代码（面向开发者），静态资源部分为源码提供静态资源的引用（面向开发者），发布代码则是发布打包完成的组件的地方（面向用户）

##关于工作流
###react组件开发部分（主要开发工作）
1. 检出<https://github.com/MIKUScallion/miku-ssn4.1/tree/master>到miku-ssn4.1目录
2. 接下来需要安装相关的node模块，在miku-ssn4.1/src目录下（package.json所在目录），使用npm install（Linux，Osx需要加sudo）命令即可
3. 在miku-ssn4.1/src/cpsrc/下可以完成各个组件的独立开发，测试，详细情况请参考各个组件文件夹下的README.md

###静态资源开发部分（次要开发工作，美术设计师工作）
1. 检出<https://github.com/MIKUScallion/miku-ssn4.1_static/tree/gh-pages>到static目录
2. 将完成的静态资源放置在相应目录下即可

###发布代码部分（核心人员工作）
1. 检出<https://github.com/MIKUScallion/miku-ssn4.1/tree/gh-pages>到build目录
2. 将开发测试完毕，编译打包完成的代码复制到build目录中，可以使用jekyll工具辅助这一过程

###代码提交与审核
1. 其他开发人员fork相关库后，进行开发测试，提交代码，pull request 请求合并即可
2. 注意请只提交自己修改的必要的代码（组件开发者只需提交相关组件代码即可）

##注意
1. 组件文件夹里的html文件要以主要html文件为准，缺少的引用等需要自己补充

##希望湿湿娘越来越好！大家一起努力！


