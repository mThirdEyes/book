# Sublime text2 插件开发教程

subime text2 作为前端开发的一款神器，而其插件扩展使得原本就是神器的sublime2更加强大，作为一名弱弱的前端工程师，有必要了解并熟悉其插件开发流程&步骤，方便扩展自己所需的功能。

## 插件制作步骤

1、通过`Tools -> New Plugin...`来打开一个初始化的插件编辑文件，它将有如下的内容：

```python
import sublime, sublime_plugin

class ExampleCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        self.view.insert(edit, 0, "Hello, World!")

```
2、通过`Preferences -> Browse Packages...`打开Packages文件夹，在该文件夹下建立个子文件夹，名字为你想开发的插件名字，如：`KeymapManager`。回到插件开发的初始化编辑器页面，通过`ctrl+s`(Windows/Linux) or `cmd+s` (OS X)保存这个文件，并放到你建立的子文件夹下，文件名如：`KeymapManager.py`

其实，直接保存这个文件就可以，它会默认给你保存到 `\Data\Packages\User` 目录下。

3、通过ctrl+`快捷键打开SublimeText的控制台，执行如下的命令：
```
view.run_command('example')
```
如果你在当前文件最前面看到插入了Hello, Word!，那表明插件执行成功了。

4、ExampleCommand名字改为你想要的插件名字，如： KeymapmanagerCommand，然后就可以开发该插件对应的功能了。

5、通过官方的API文档查找你需要的接口，文档见：[http://www.sublimetext.com/docs/2/api_reference.html](http://www.sublimetext.com/docs/2/api_reference.html)

6、插件开发完成后，下面就需要给插件绑定快捷键了，在你的插件目录下建立Default (Windows).sublime-keymap, Default (Linux).sublime-keymap and Default (OSX).sublime-keymap文件，他们分别是给不同的平台使用的。内容大致如下：
```javascript
[
    {
        "keys": [
            "ctrl+alt+j"
        ],
        "command": "keymapmanager"
    }
]
```

这个文件是个JSON格式，ctrl+alt+j就表示这个插件的快捷键了，当然这个快捷键最好不要跟其他插件的快捷键冲突了。

7、如果你想把你的插件植入到顶部菜单或者右键菜单里，你可以通过建立下面的文件方式进行：

* Main.sublime-menu 顶部菜单
* Side Bar.sublime-menu 右键操作左侧Side Bar菜单
* Context.sublime-menu controls 右键操作文件菜单 文件内容也是个JSON个是，如：我想把插件植入到顶部菜单View下，可以通过下面的配置进行:
```javascript
[
    {
        "id": "view",
        "children": [
            {
                "caption": "Keymap Manager",
                "id": "keymap-manager",
                "command": "keymapmanager"
            }
        ]
    }
]
```

8、这样下来一个插件差不多就开发完了，你可以将插件文件夹打包发给需要安装的同学。当然这种方式太麻烦了，现在有各`Package Control`的插件，专门来管理插件安装的，相信你已经安装了。可以通过下面的步骤进行：

* 你需要有个github帐号，并fork https://github.com/wbond/package_control_channel
* 通过git clone命令下载你fork完的地址，如: git@github.com:welefen/package_control_channel.git
* 修改repositories.json这个文件，把你的插件名称和对应的github项目地址添加进去
* ci并push到你的package control里，然后通过pull request推到官方的github里，如果他们审批通过了，那么你的插件就会放到package control里，别人就可以通过install直接安装了

## 一个插件示例



## 参考

[如何开发Sublime Text2插件](http://www.welefen.com/how-to-develop-sublime-text-plugin.html)