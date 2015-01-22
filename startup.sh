#!/bin/bash

if [ ! -n "$1" ];then
  echo "参数不能为空，加入运行模式，例：test"
else
  echo "杀死正在运行的进程"
  for pid in $(ps -ef | grep node | grep -v grep | cut -c 10-14); do
     kill -9 $pid
  done
  echo "已经杀死进程，准备重启"
  nohup node /mcp-code/workspace/nodejs/node_mcp/Filter.js target=$1 > /data/mongo-log/fiter.out 2>&1 &
  nohup node /mcp-code/workspace/nodejs/node_mcp/Gateway.js gtPort=9090 target=$1 > /data/mongo-log/admin9090.out 2>&1 &
  nohup node /mcp-code/workspace/nodejs/node_mcp/Gateway.js gtPort=9091 target=$1 > /data/mongo-log/admin9091.out 2>&1 &
  nohup node /mcp-code/workspace/nodejs/node_mcp/Scheduler.js target=$1 /data/mongo-log/schedule.out 2>&1 &
  nohup node /mcp-code/workspace/nodejs/node_mcp/Notify.js target=$1 > /data/mongo-log/notify.js 2>&1 &
  nohup node /mcp-code/workspace/nodejs/node_mcp/SchClient.js target=$1 > /data/mongo-log/schclient.out 2>&1 &
  nohup node /mcp-code/workspace/nodejs/node_mcp/SchClient.js target=$1 > /data/mongo-log/schclient2.out 2>&1 &
  nohup node /mcp-code/workspace/nodejs/node_mcp/SchClient.js target=$1 > /data/mongo-log/schclient3.out 2>&1 &
  nohup node /mcp-code/workspace/nodejs/node_mcp/SchClient.js target=$1 > /data/mongo-log/schclient4.out 2>&1 &
  nohup node /mcp-code/workspace/nodejs/node_mcp/PrintTest.js target=$1 > /data/mongo-log/print.out 2>&1 &
  echo "已完成"
fi 
