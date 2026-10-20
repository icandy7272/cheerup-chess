# 腾讯云部署

生产目标：`https://chess.cheerup.tech`。

该子域名已由用户配置 A 记录，指向其现有腾讯云 Ubuntu / nginx 服务器。因此第一版复用现有服务器，不额外开通 EdgeOne，不引入新付费资源。

## 构建与上传

本地：`npm ci && npm test && npm run build`，输出 `dist/`。

SSH 账户需有创建 `/var/www/cheerup-chess` 和配置 nginx 的权限。不要将私钥或令牌写进仓库。配置好服务器后：

```sh
./deploy/release.sh YOUR_SSH_HOST
```

脚本上传到带版本号的 `releases/`，然后原子切换 `current` 软链接。旧版本保留，回滚时将 `current` 切回已知可用版本即可。不删除其他站点或历史发布。

## 首次配置

1. 确认 DNS 指向当前服务器；查看现有配置，确保没有已占用的同名站点。
2. 为此站单独创建 HTTP server 块，仅匹配 `chess.cheerup.tech`，root 指向 `/var/www/cheerup-chess/current`。
3. `/.well-known/acme-challenge/` 使用现有 ACME webroot `/var/www/letsencrypt`。
4. `nginx -t` 成功后 reload；用现有 Certbot 账户签发该子域名证书：

```sh
certbot certonly --webroot -w /var/www/letsencrypt -d chess.cheerup.tech --non-interactive
```

如果没有现有账户，需要由服务器管理员先完成账户和服务条款设置。

5. 证书签发成功后，将 `deploy/chess.nginx.conf` 放到独立站点配置并启用。再次 `nginx -t` 和 reload。
6. 配置 Certbot deploy hook：`nginx -t && systemctl reload nginx`，使续期证书生效。不要修改其他站点证书。
7. 验证 HTTPS、HTTP→HTTPS、静态资产 MIME、未知路径 404 和现有其他站点健康状态。

HTML 使用 no-cache；当前所有静态资源也采用保守缓存。部署目录仅包含生产构建，不含开发服务器、测试或个人题库。应用没有后台写接口。

## GitHub

公共仓库：`icandy7272/cheerup-chess`。CI 在 push 和 PR 时执行 `npm ci`、测试和生产构建。当前使用手动执行部署脚本，GitHub push 不会自动操作生产服务器。

## EdgeOne 备选

若以后迁移到腾讯云 EdgeOne Pages，可连接公开仓库，构建命令 `npm ci && npm run build`，输出目录 `dist`。迁移时再按腾讯云控制台给出的记录修改 DNS，保留原服务器直到新站 HTTPS 验证通过。

## 主站入口

2026-10-20 已在 cheerup.tech 主页加入淡粉色「小马战术乐园」卡片，位于第三项（Shadow、openGym 之后）。`deploy/homepage-entry.patch` 保留这次入口的源码差异，主站完整页面仍由 `/var/www/cheerup-home/index.html` 管理，不随棋站 release 脚本覆盖。

主站修改先备份到服务器 `/var/backups/cheerup-home/`，核对原页面摘要后原子替换。以后更改入口时先读取主站当前版本，避免用旧副本覆盖其他卡片。
