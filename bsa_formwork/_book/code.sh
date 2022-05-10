#!/bin/sh

mkdir -p /data/output/code_result/book

cp -rf /template/* /data/output/code_result/book/

node /template/render_image.js