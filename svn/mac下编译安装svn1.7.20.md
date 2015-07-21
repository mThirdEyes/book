# mac下编译安装svn-1.7.20

## 背景
作为一名有节操的青年，时不时折腾一下，绝对不是一件坏事情，话说本人的mac系统版本为10.10.3(14D136)，已自带了svn(1.7.19版本)。

那么为什么还要编译安装svn(1.7.20)？
其实主要是因为mac系统并没有自带apache的mod_dav_svn.so和mod_authz_svn.so模块，本人想在自己的mac上搭建一个基于apache的svn服务而已。

## 下载安装neon
让svn客户端通过http协议访问svn仓库必装软件之一。 

```bash
# 下载
wget http://www.webdav.org/neon/neon-0.30.1.tar.gz
# 解压
tar xzvf neon-0.30.1.tar.gz

cd neon-0.30.1

./configure -prefix=/usr/local/neon -enable-shared
# 编译安装
make && make install
```

## 下载subversion源码

访问：[http://subversion.apache.org/download/](http://subversion.apache.org/download/) 选择你喜欢编译的版本。

### 下载
```bash
$ wget http://apache.fayea.com/subversion/subversion-1.7.20.tar.gz
```

### 解压
```bash
tar -zxvf subversion-1.7.20.tar.gz
```

### 编译
```bash
cd subversion-1.7.20

./configure --with-apxs=/usr/sbin/apxs -with-neon=/usr/local/neon/

make && make install
```

## 查看安装的版本

```bash
# 如果没有安转neon，则会出现如下版本信息，即缺少了handles 'http' scheme 模块
MacBookPro:subversion-1.7.20 root# svn --version
svn, version 1.7.20 (r1667490)
   compiled Jul 21 2015, 14:34:03

Copyright (C) 2014 The Apache Software Foundation.
This software consists of contributions made by many people; see the NOTICE
file for more information.
Subversion is open source software, see http://subversion.apache.org/

The following repository access (RA) modules are available:

* ra_svn : Module for accessing a repository using the svn network protocol.
  - with Cyrus SASL authentication
  - handles 'svn' scheme
* ra_local : Module for accessing a repository on local disk.
  - handles 'file' scheme
```

## 命令安装位置

```bash
MacBookPro:subversion-1.7.20 root# which svn
/usr/local/bin/svn
```

## 参考
[安装日志](https://github.com/crossyou/book/blob/master/_static/svn-compile-install.log)
