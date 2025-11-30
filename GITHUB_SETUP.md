# GitHub 发布指南

本指南将帮助您将项目发布到 GitHub 并启用 GitHub Pages。

## 前置要求

1. **GitHub 账户** - 如果没有，请访问 https://github.com 注册
2. **Git** - 需要安装 Git 命令行工具

## 安装 Git

如果您的系统还没有安装 Git：

1. 访问 https://git-scm.com/download/win
2. 下载并安装 Git for Windows
3. 安装时选择默认选项即可
4. 安装完成后重启终端

## 发布步骤

### 1. 在 GitHub 上创建新仓库

1. 登录 GitHub
2. 点击右上角的 "+" 号，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `fabric-pattern-extractor` (或您喜欢的名称)
   - **Description**: 服装印花图案提取和四方连续生成工具
   - **Visibility**: 选择 Public（如果要使用免费的 GitHub Pages）
   - **不要**勾选 "Initialize this repository with a README"（因为我们已经有了）
4. 点击 "Create repository"

### 2. 初始化本地 Git 仓库

在项目目录中打开终端，运行以下命令：

```bash
# 进入项目目录
cd C:\Users\Administrator.WIN-RNQ2DS2IQN7\Desktop\fabric-pattern-extractor

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 创建初始提交
git commit -m "Initial commit: 服装印花图案提取工具"
```

### 3. 连接到 GitHub 仓库

将本地仓库连接到 GitHub（替换 `YOUR_USERNAME` 为您的 GitHub 用户名）：

```bash
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/fabric-pattern-extractor.git

# 或者使用 SSH（如果您配置了 SSH 密钥）
# git remote add origin git@github.com:YOUR_USERNAME/fabric-pattern-extractor.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

**注意**: 首次推送时，GitHub 可能会要求您输入用户名和密码（或 Personal Access Token）。

### 4. 配置 GitHub Pages

#### 方法 A: 使用 GitHub Actions（推荐，已配置）

1. 在 GitHub 仓库页面，点击 "Settings"
2. 在左侧菜单中找到 "Pages"
3. 在 "Source" 下选择 "GitHub Actions"
4. 保存设置

每次推送到 `main` 分支时，GitHub Actions 会自动构建并部署网站。

#### 方法 B: 手动部署

1. 构建项目：
   ```bash
   npm run build
   ```

2. 安装 gh-pages：
   ```bash
   npm install --save-dev gh-pages
   ```

3. 在 `package.json` 的 `scripts` 中添加：
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```

4. 运行部署：
   ```bash
   npm run deploy
   ```

5. 在 GitHub 仓库设置中：
   - 进入 Settings → Pages
   - 在 "Source" 下选择 `gh-pages` 分支

### 5. 访问您的网站

部署完成后，您的网站将在以下地址可用：

```
https://YOUR_USERNAME.github.io/fabric-pattern-extractor/
```

## 更新代码

当您修改代码后，使用以下命令更新 GitHub：

```bash
# 添加更改的文件
git add .

# 提交更改
git commit -m "描述您的更改"

# 推送到 GitHub
git push
```

如果使用 GitHub Actions，推送后会自动重新部署。

## 故障排除

### Git 认证问题

如果遇到认证问题，可以：

1. **使用 Personal Access Token**:
   - 访问 https://github.com/settings/tokens
   - 生成新的 token（选择 `repo` 权限）
   - 使用 token 作为密码

2. **配置 SSH 密钥**:
   - 参考 https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### 修改 base 路径

如果您的仓库名称不是 `fabric-pattern-extractor`，需要修改 `vite.config.js`：

```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
});
```

然后重新构建和部署。

## 下一步

- 添加项目描述和标签
- 创建 Issues 和 Projects 来管理开发任务
- 邀请协作者
- 添加更多功能！

祝您使用愉快！🎉

