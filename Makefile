all: package spmpackage gulptask 
package:
	cnpm install -d
	cd ./examples/yo.demo/server/ && cnpm install -d
	cd ./examples/yo.demo/spm && cnpm install -d 
	cd ./examples/yo.yohobuy-mobile/server && cnpm install -d
	cd ./examples/yo.yohobuy-mobile/spm && cnpm install -d
spmpackage:
	cd ./examples/yo.demo/spm && spm install
	cd ./examples/yo.yohobuy-mobile/spm && spm install
gulptask:
	cd ./examples/yo.yohobuy-mobile/spm && gulp
