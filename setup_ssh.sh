#!/bin/bash

# 创建 .ssh 目录
mkdir -p /opt/buildhome/.ssh

# 输出 DEPLOY_KEY 的第一行（隐藏私钥内容，仅用于调试确认 DEPLOY_KEY 是否传递成功）
echo "DEPLOY_KEY first line: $(echo "$DEPLOY_KEY" | head -n 1)"

# 写入私钥到 /tmp/deploy_key（临时存储）
echo "$DEPLOY_KEY" > /tmp/deploy_key

# 检查 /tmp/deploy_key 是否成功写入（用于调试）
if [ -f /tmp/deploy_key ]; then
    echo "Temporary deploy key file created at /tmp/deploy_key"
else
    echo "Error: /tmp/deploy_key not created"
    exit 1
fi

# 设置私钥权限（必须为 600，否则 SSH 会拒绝使用该密钥）
chmod 600 /tmp/deploy_key

# 将私钥复制到 .ssh 目录
cp /tmp/deploy_key /opt/buildhome/.ssh/deploy_key

# 再次设置私钥权限，确保 /opt/buildhome/.ssh/deploy_key 的权限正确
chmod 600 /opt/buildhome/.ssh/deploy_key

# 调试：检查私钥文件是否成功复制到目标位置
if [ -f /opt/buildhome/.ssh/deploy_key ]; then
    echo "Deploy key successfully copied to /opt/buildhome/.ssh/deploy_key"
    ls -l /opt/buildhome/.ssh/deploy_key
    echo "Deploy key file size:"
    wc -c < /opt/buildhome/.ssh/deploy_key
else
    echo "Error: Deploy key not found at /opt/buildhome/.ssh/deploy_key"
    exit 1
fi
