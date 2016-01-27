#!/usr/bin/ruby
# -*- coding: UTF-8 -*-

=begin
自动编译提交本项目到github
需要一个命令行参数作为master分支的提交注释
=end

#判断命令行参数是否正确（有且只有一个）
if ARGV.size != 1
    puts "[miku:need only one parm to be the master commit msg]";
    exit;
end

#测试命令行错误！！！！！！！！！！！！！！！！！！
#puts "git commit -m [M:+#{ARGV[0]}+]";

puts "[miku:bulid start]";
print <<`EOC` 
    cd src
	jekyll build
EOC
puts "[miku:bulid done]";

puts "[miku:push master to git start]";
print <<`EOC` 
    git add --all
    git commit -m [M:#{ARGV[0]}]
    git push origin master
EOC
puts "[miku:push master to git done]";

puts "[miku:push gh-pages to git start]";
print <<`EOC` 
    cd build
    git add --all
    git commit -m "update"
    git push origin gh-pages
EOC
puts "[miku:push gh-pages to git done]";

exit;
