all: package spmpackage gulptask 
package:
	cd ./yo/ && cnpm install -d
	cd ./yo.demo/server/ && cnpm install -d
	cd ./yo.demo/spm && cnpm install -d 
	cd ./yo.yohobuy-mobile/server && cnpm install -d
	cd ./yo.yohobuy-mobile/spm && cnpm install -d
spmpackage:
	cd ./yo.demo/spm && spm install
	cd ./yo.yohobuy-mobile/spm && spm install
gulptask:
	cd ./yo.yohobuy-mobile/spm && gulp
	cd ./yo.yohobuy-mobile/spm && gulp start
