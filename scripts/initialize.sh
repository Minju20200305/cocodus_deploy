#!/bin/bash
set -e
cd /home/ubuntu/cocodus/server
npm install
npm install pm2@latest -g
sudo apt-get update