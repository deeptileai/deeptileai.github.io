# 服装印花图案提取工具

一个纯前端的 AI 驱动工具，用于从服装照片中提取印花图案并生成四方连续（seamless）图案。

## ✨ 功能特性

- 📸 **图像上传**: 支持拖拽或点击上传服装照片
- 🎨 **智能抠图**: 使用浏览器端 AI 模型自动识别并抠出服装区域
- 🔍 **图案提取**: 
  - 自动提取：AI 自动识别并提取印花图案
  - 手动选择：用户可手动框选图案区域
- 🔄 **四方连续生成**: 自动生成无缝平铺的四方连续图案
- 📥 **多格式下载**: 支持 PNG 单文件下载和 ZIP 多尺寸打包下载
- 🌐 **GitHub Pages 部署**: 完全静态，可直接部署到 GitHub Pages

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览生产构建

```bash
npm run preview
```

### 运行测试

```bash
# 运行所有测试
npm test

# 运行测试并查看覆盖率
npm run test:coverage

# 运行测试 UI
npm run test:ui
```

## 📁 项目结构

```
fabric-pattern-extractor/
├── src/
│   ├── components/          # React 组件
│   │   ├── Header.jsx       # 页面头部
│   │   ├── ImageUploader.jsx # 图片上传组件
│   │   ├── ImageSegmentation.jsx # 图像分割组件
│   │   ├── PatternExtractor.jsx  # 图案提取组件
│   │   └── SeamlessPattern.jsx   # 四方连续生成组件
│   ├── utils/               # 工具函数
│   │   ├── imageSegmentation.js  # 图像分割算法
│   │   ├── patternExtractor.js   # 图案提取算法
│   │   ├── seamlessPattern.js    # 四方连续生成算法
│   │   └── downloadUtils.js      # 下载工具
│   ├── App.jsx             # 主应用组件
│   └── main.jsx            # 应用入口
├── public/                  # 静态资源
├── .github/workflows/      # GitHub Actions 配置
├── vite.config.js          # Vite 配置
└── package.json
```

## 🛠️ 技术栈

- **React 18**: UI 框架
- **Vite**: 构建工具
- **Canvas API**: 图像处理
- **JSZip**: ZIP 文件生成
- **Vitest**: 测试框架
- **Testing Library**: React 组件测试

## 📖 使用说明

### 步骤 1: 上传图片

1. 点击上传区域或拖拽图片到页面
2. 支持 JPG、PNG 等常见图片格式
3. 上传后会自动显示预览

### 步骤 2: 服装抠图

1. 点击"开始抠图"按钮
2. 系统会自动识别并抠出服装区域
3. 查看抠图结果，确认无误后继续

### 步骤 3: 提取图案

**自动提取模式：**
1. 选择"自动提取"模式
2. 点击"自动提取图案"按钮
3. 系统会自动识别并提取印花图案

**手动选择模式：**
1. 选择"手动选择"模式
2. 在图片上拖拽选择图案区域
3. 系统会提取选中区域的图案

### 步骤 4: 生成四方连续

1. 调整图块尺寸和数量参数
2. 点击"重新生成"查看效果
3. 预览满意后，点击下载按钮
4. 可选择下载 PNG 单文件或 ZIP 多尺寸包

## 🚀 部署到 GitHub Pages

### 方法 1: 使用 GitHub Actions（推荐）

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 GitHub Actions 作为部署源
4. 每次推送到 `main` 分支时，会自动构建并部署

### 方法 2: 手动部署

1. 构建项目：
   ```bash
   npm run build
   ```

2. 将 `dist` 目录的内容推送到 `gh-pages` 分支

3. 在仓库设置中配置 GitHub Pages 源为 `gh-pages` 分支

### 配置仓库名称

如果您的仓库名称不是 `fabric-pattern-extractor`，请修改 `vite.config.js` 中的 `base` 配置：

```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
});
```

## 🧪 测试

项目包含单元测试和集成测试：

- **组件测试**: 测试 React 组件的渲染和交互
- **工具函数测试**: 测试核心算法和工具函数
- **覆盖率报告**: 使用 `npm run test:coverage` 查看测试覆盖率

## 📝 许可证

MIT License

## 🙏 致谢

- [Vite](https://vitejs.dev/) - 快速的前端构建工具
- [React](https://react.dev/) - UI 框架

