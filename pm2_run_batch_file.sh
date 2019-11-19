#!/bin/bash
curr_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${curr_dir}/
pm2 stop DataUploadTool
yarn install
pm2 start DataUploadTool

cd server
pm2 stop DataUploadServer
yarn install
pm2 start DataUploadServer
