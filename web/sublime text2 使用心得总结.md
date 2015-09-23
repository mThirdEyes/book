# Sublime text2 使用心得总结

> Sublime Text2 是一款轻量、简洁、高效、跨平台、代码高亮、语法提示、自动完成且反应快速的编辑器软件， 界面简单，支持插件扩展机制，可以说是程序猿开发代码的利器(或者叫做神奇也不为过吧)，用她来写代码，绝对是一种享受。

![](../_static/img/sublime-youdu.jpg)

> Sublime Text2 基本上是共享软件，免费版和收费版基本无区别，只是偶尔会弹框让你去购买，基本不影响使用。

## 插件篇
Sublime Text2 的强大之处体现在其大量优秀的插件扩展上，一般我在使用中会必装一些插件来丰富开发功能，让利器变得更加强大！

### [Package Control](https://packagecontrol.io/installation)
> Package Control 犹如Linux下的apt-get&yum等包管理工具一样，它是Sublime Text 的包管理工具，使用它可以非常方便的查找你所需要的插件以及管理你已安装的插件。

**Sublime Text 3**
```
import urllib.request,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

**Sublime Text 2**
```
import urllib2,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler()) ); by = urllib2.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); open( os.path.join( ipp, pf), 'wb' ).write(by) if dh == h else None; print('Error validating download (got %s instead of %s), please try manual install' % (dh, h) if dh != h else 'Please restart Sublime Text to finish installation')
```

### [Emmet](https://github.com/sergeche/emmet-sublime)
> Emmet 是一个前端开发的利器，前身(ex)是 Zen Coding。它让编写 HTML 代码变得简单。Emmet 的基本用法是：输入简写形式，然后按 Tab 键。查看Emmet[官方文档](http://docs.emmet.io/)

### DocBlockr
> [DocBlockr](https://github.com/spadgos/sublime-jsdocs) 可以很好的生成js ,php 等语言函数注释,只需要在函数上面输入/** ,然后按tab 就会自动生成注释。

### Less
> Less 语法高亮插件

### Markdown Preview
> Markdown 格式预览插件

##  参考

[Sublime Text 3 支持的热门插件推荐](http://www.imjeff.cn/blog/146/)