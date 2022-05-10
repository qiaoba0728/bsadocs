#!/bin/sh
echo "start build docs"

# ↓↓↓↓↓↓↓↓↓↓↓↓↓渲染表格↓↓↓↓↓↓↓↓↓↓↓↓↓↓

if [ ! -f "/data/bsa.json" ]; then
echo "file '/data/bsa.json don't' exists, exit"
exit 1
fi

cd /template

node render_table.js

gitbook build

# 替换 url 为 $1/index.html
grep -P "<a href=\"(.+?)/\">" -rl ./_book | xargs sed -i 's/<a href\(.*\)\/"/<a href\1\/index.html"/g'
# 逆向操作
#grep -P "<a href=\"(.+?)/index.html\"" -rl ./_book | xargs sed -i 's/<a href\(.*\)\/index.html"/<a href\1\/"/g'

# 去除powered by gitbook
grep "all right reserved&#xFF0C;powered by Gitbook" -rl ./_book | xargs sed -i 's/all right reserved&#xFF0C;powered by Gitbook//g'

# 去除时间
grep -P "[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}" -rl ./_book | xargs sed -i 's/[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\} [0-9]\{2\}:[0-9]\{2\}:[0-9]\{2\}//g'

# 替换 if(m)
sed -i 's/if(m)/if(false)/g' _book/gitbook/theme.js

# 替换箭头点击跳转链接
grep  "<a href=\"./index.html\" class" -rl ./_book | xargs sed -i 's/<a href=".\/index.html" class/<a href=".\/2\/index.html" class/g'

# 单独处理首页的箭头url
sed -i 's/<a href=".\/2\/index.html"/<a href=".\/1\/2\/index.html"/g' _book/index.html

gitbook pdf . 

if [ "$?" = "0" ]; then
   echo "gitbook pdf build success!"
else
   echo "gitbook pdf build fail!"
fi

mkdir -p /data/output/code_result/book

cp -rf /template/* /data/output/code_result/book/




if [ -d "/data/output/docs_result" ];then
rm -rf /data/output/docs_result
fi

mkdir /data/output/docs_result
cp -rf /data/output/code_result/book/_book/* /data/output/docs_result/
cp -rf /data/output/code_result/book/book.pdf /data/output/docs_result/


cd /data/output/docs_result/
rm Dockerfile render_table.js render_image.js manual.md

if [ "$1" != "dev" ];then
   echo "copy files"
   mkdir -p /data/output/docs_result/result/clean
   mkdir -p /data/output/docs_result/result/report
   mkdir -p /data/output/docs_result/result/note
   mkdir -p /data/output/docs_result/result/snp_index
   cp -r /data/output/clean/*.json /data/output/docs_result/result/clean/
   cp -r /data/output/clean/*.html /data/output/docs_result/result/clean/
   cp -r /data/output/report_result/*.clean_fastqc /data/output/docs_result/result/report/
   cp -r /data/output/note/* /data/output/docs_result/result/note/
   cp -r /data/output/bsa_result/* /data/output/docs_result/result/snp_index/
   cp -r /data/output/result/* /data/output/docs_result/result/snp_index/
fi


cd /data/output
tar -czf docs.tar.gz docs_result