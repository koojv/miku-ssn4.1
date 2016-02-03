# miku-ssn4.1

##关于开发工作流－0

1. 以下两条命令可以帮助您快速建立本项目的开发环境
2. 确保您使用的是您自己的fork库的地址

```
git clone -b master https://github.com/MIKUScallion/miku-ssn4.1.git
cd miku-ssn4.1
git clone -b gh-pages https://github.com/MIKUScallion/miku-ssn4.1.git build

```

接下来需要安装相关的node模块，在src目录下（package.json所在目录下），使用npm install（Linux，Osx需要加sudo）命令即可

##关于开发工作流－1

1. 检出master分支到任意目录（默认:miku-ssn4.1）
2. 在master分支根目录下检出gh-pages分支到build目录
3. 在master分支根目录下的src目录中完成全部的开发，测试
4. 在src目录下，使用"jekyll build"命令（需要安装jekyll）将指定的目录发布到build目录中
5. 将build目录提交到gh-pages分支，即可完成正式发布
6. 将master分支目录提交到master分支，即可完成源码托管
7. 使用push.rb脚本（需要安装ruby）可以自动化代码提交过程

##关于开发工作流－2

1. 本项目主要基于react与webpack进行组件式开发
2. 请先根据package.json安装好相关的开发环境
3. 组件的源码，测试代码放置在cpsrc中，用webpack打包后的组件放置在cp中
4. 您可以维护已经正在开发的组件（推荐），也可以新建组件进行开发，相关的配置均在webpack.config.js中
5. 组件开发过程使用"node_modules/.bin/webpack --progress --colors --watch"来打包组件，之后查看效果
6. 已经开发的组件:AsideCp(网站侧边栏组件)

