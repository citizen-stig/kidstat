#!/usr/bin/env bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list

sudo apt-get update
sudo apt-get upgrade -y

sudo apt-get install -y build-essential python3 python3-dev python3-setuptools python3-pip git
sudo apt-get install -y mongodb-org

sudo pip3 install -r /vagrant/kidstat/requirements/develop.txt
