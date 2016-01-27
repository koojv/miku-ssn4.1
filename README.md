# miku-ssn4.1

##关于开发工作流

1. 检出master分支到任意目录（默认:miku-ssn4.1）
2. 在master分支根目录下检出gh-pages分支到build目录
3. 在master分支根目录下的src目录中完成全部的开发，测试
4. 在src目录下，使用"jekyll build"命令（需要安装jekyll）将指定的目录发布到build目录中
5. 将build目录提交到gh-pages分支，即可完成正式发布
6. 将master分支目录提交到master分支，即可完成源码托管
7. 使用push.rb脚本（需要安装ruby）可以自动化代码提交过程