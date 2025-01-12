#!/bin/bash

# 创建 .ssh 目录
mkdir -p /opt/buildhome/.ssh

# 写入私钥到 deploy_key 文件
echo "$DEPLOY_KEY" > /opt/buildhome/.ssh/deploy_key

# 设置私钥权限
chmod 600 /opt/buildhome/.ssh/deploy_key
