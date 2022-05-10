#!/bin/sh
# ↓↓↓↓↓↓↓↓↓↓↓复制&渲染图片↓↓↓↓↓↓↓↓↓↓↓↓

if [ -d "/data/output/code_result" ];then
rm -rf /data/output/code_result
fi

mkdir -p /data/output/code_result/book

cp -rf /template/* /data/output/code_result/book/

node /template/render_image.js

# ↓↓↓↓↓↓↓↓↓↓↓↓↓渲染表格↓↓↓↓↓↓↓↓↓↓↓↓↓↓

if [ ! -f "/data/bsa.json" ]; then
echo "file '/data/bsa.json don't' exists, exit"
exit 1
fi

node /template/render_table.js

cd /data/output/code_result/book

gitbook build

# 替换 url 为 $1/index.html
grep -P "<a href=\"(.+?)/\">" -rl ./_book | xargs sed -i 's/<a href\(.*\)\/"/<a href\1\/index.html"/g'
# 逆向操作
#grep -P "<a href=\"(.+?)/index.html\"" -rl ./_book | xargs sed -i 's/<a href\(.*\)\/index.html"/<a href\1\/"/g'

# 去除powered by gitbook
grep "" -rl ./_book | xargs sed -i 's///g'

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

if [ -d "/data/output/docs_result" ];then
rm -rf /data/output/docs_result
fi

mkdir /data/output/docs_result

cp -rf /data/output/code_result/book/_book/* /data/output/docs_result/

cd /data/output/docs_result/


# ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓删除多余文件↓↓↓↓↓↓↓↓↓↓↓↓↓↓
rm Dockerfile docs.sh code.sh manual.md render_table.js render_image.js