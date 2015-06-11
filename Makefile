package:
	npm install -g  -d cnpm --registry=https://registry.npm.taobao.org 
	cnpm install -g -d gulp
	cnpm install -g -d spm
	cd ./yo/ && cnpm install -d
	cd ./yo.demo/server/ && cnpm install -d
	cd ./yo.demo/spm && cnpm install -d 
	cd ./yo.yohobuy-mobile/server && cnpm install -d
	cd ./yo.yohobuy-mobile/spm && cnpm install -d
installCompass:
	gem sources --remove https://ruby.taobao.org/
	gem sources --remove https://rubygems.org/
	gem sources -a https://ruby.taobao.org/
	gem sources -l
	gem install compass -V
spmpackage:
	spm config set registry http://spm.yoho.cn
	cd ./yo.demo/spm && spm install
	cd ./yo.yohobuy-mobile/spm && spm install
gulptask:
	cd ./yo.yohobuy-mobile/spm && gulp
	cd ./yo.yohobuy-mobile/spm && gulp start
