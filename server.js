/**
 * @description github的webhook监听服务
 * @author 王镇佳 <wzjfloor@163.com>
 *
 */

const exec = require('child_process').exec;
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const app = express();
const port = 7777;

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(methodOverride());
app.use(cookieParser());
app.use(flash());

/**
 *
 * @description POST: github webhook
 * @author 王镇佳 <wzjfloor@163.com>
 *
 */
app.post('/github', function(req, res) {
  try {
    let { repository, sender } = req.body;
    console.log(`GITHUB:\t${sender.login}\t${sender.url}\t发起一次PUSH`);
    execGitPullCommand(res, repository.name, 'master');
  } catch (error) {
    if (error) {
      res.status(400).end('失败：请求参数错误');
    }
  }
});

app.listen(port, function() {
  console.log('Return Webhook进程开始运行，端口是: ' + port);
});

/**
 *
 * 根据不同的分支，执行不同的命令
 *
 */
function execGitPullCommand(res, repository, branch) {
  console.log(`Repository: ${repository}, Branch: ${branch}`);
  let RB = `${repository}-${branch}`;
  let command = '';
  switch (RB) {
    case 'Raneto-master': command = `cd ~/www/Raneto && git pull origin master && npm install`; break;
    default: {
      console.log('Webhook监听失败: 没有对应的仓库或分支');
      res.status(400)
        .end('Webhook监听失败: 没有对应的仓库或分支');
      return;
    }
  }
  execCommand(res, command);
}

/**
 *
 * 执行命令
 *
 */
function execCommand(res, command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('命令执行失败: ' + command + '\n');
      return;
    }
    console.log('命令执行成功: ' + command + '\n');
  });
  res.status(200).end('Run Command');
}
