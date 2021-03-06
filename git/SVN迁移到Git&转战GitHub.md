# SVN迁移到Git&转战GitHub
本文主要整理了将svn版本库迁移到git版本控制的过程&记录，主要是记录一些git下的命令操作。

## 克隆svn版本库
>以[http://svn.sobird.me/wordpress/](http://svn.sobird.me/wordpress/)为例

```bash
$ git svn clone http://svn.sobird.me/wordpress/ -s --no-metadata wordpress
```

## 批量更新Log中的name和email

```bash
MacBookPro:wordpress sobird$ git log
commit 2cc006cf0044080bc6d0530cfa86ef5b0f869de7
Author: sobird <sobird@03cbcded-9dd1-4c32-97f2-e9e95ae9a827>
Date:   Thu Jan 8 03:44:21 2015 +0000

    添加博客favicon.ico图片文件
    
    git-svn-id: http://svn.sobird.me/wordpress/trunk@48 03cbcded-9dd1-4c32-97f2-e9e95ae9a827

commit 70531fe2f240430a651bd7bdfd954bafcb562769
```
以上log中Author的name为sobird，email为<sobird@03cbcded-9dd1-4c32-97f2-e9e95ae9a827>，可能并不是github对应的name和email，那么通过下面的一行命令即可批量更新。

```bash
git filter-branch -f --env-filter "GIT_AUTHOR_NAME='sobird'; GIT_AUTHOR_EMAIL='crossyou2009@gmail.com'; GIT_COMMITTER_NAME='sobird'; GIT_COMMITTER_EMAIL='crossyou2009@gmail.com';" HEAD
```

## 整理分支
在推送github之前，需要整理一下分之和标签.

移动标签，把它们从奇怪的远程分支变成实际的标签，然后把剩下的分支移动到本地。

```bash
$ cp -Rf .git/refs/remotes/tags/* .git/refs/tags/
$ rm -Rf .git/refs/remotes/tags
```

该命令将原本以tag/ 开头的远程分支的索引变成真正的（轻巧的）标签。接下来，把refs/remotes 下面剩下的索引变成本地分支：
```bash
$ cp -Rf .git/refs/remotes/* .git/refs/heads/
$ rm -Rf .git/refs/remotes
```

现在所有的旧分支都变成真正的Git 分支，所有的旧标签也变成真正的Git 标签。最后，一项工作就是把新建的Git服务器添加为远程服务器并且向它推送。为了让所有的分支和标签都得到上传，我们使用这条命令：

```bash
$ git push origin –all
```

推送所有tag到github
$ git push origin --tags

## git ignores

```bash
$ git svn show-ignore > .git/info/exclude
```

## 关联github远程仓库

```bash
$ git remote add origin git@github.com:crossyou/test.git
```

## 提交github远程仓库

```bash
$ git push -u origin master
```

## 参考资料

* [SVN迁移到Git的过程（+ 一些技巧）](http://www.blogjava.net/lishunli/archive/2012/01/15/368562.html)
* [git filter-branch使用方法](https://ruby-china.org/topics/7820)