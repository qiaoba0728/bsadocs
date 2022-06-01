FROM dockerhub.qingcloud.com/zqzoffice/gitbook:v0.1
WORKDIR /template
COPY . /template/
RUN rm -rf .gitignore
# CMD ["/bin/sh", "/template/code.sh"]
CMD ["/bin/sh", "/template/docs.sh"]
