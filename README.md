<<<<<<< HEAD
# eatingwang012.github.io
=======
# 个人网站模板

## 🎯 项目简介

这是一个基于React + TypeScript + Tailwind CSS构建的个人作品集网站模板，可以快速搭建个人网站。

## ✨ 特性

- 🚀 **快速搭建** - 开箱即用，几分钟内搭建个人网站
- 🎨 **现代化设计** - 使用Tailwind CSS，响应式设计
- 📱 **移动端友好** - 完美适配各种设备
- 🔧 **易于定制** - 简单的配置文件，轻松修改内容
- 📊 **多页面支持** - 首页、作品集、经验等页面
- 🎭 **动画效果** - 使用Framer Motion，流畅的交互体验

## 🏗️ 技术栈

- **前端框架**: React 18.3.1 + TypeScript
- **构建工具**: Vite 6.3.5
- **样式框架**: Tailwind CSS
- **动画库**: Framer Motion
- **包管理**: pnpm

## 🚀 快速开始

### 1. 克隆模板
```bash
git clone https://github.com/yourusername/personal-website-template.git
cd personal-website-template
```

### 2. 安装依赖
```bash
pnpm install
```

### 3. 修改个人信息
编辑以下文件，替换为你的个人信息：

#### 个人信息 (`src/data/personal.ts`)
```typescript
export const personalInfo = {
  name: "你的名字",
  position: "你的职位",
  introduction: "你的个人介绍",
  email: "your.email@example.com",
  linkedin: "你的LinkedIn链接",
  github: "你的GitHub链接",
  profileImage: "你的头像图片URL",
  bio: "你的详细个人简介"
};
```

#### AI项目 (`src/data/aiProjects.ts`)
```typescript
export const aiProjects = [
  {
    id: 1,
    title: "项目标题",
    description: "项目描述",
    imageUrl: "项目图片URL",
    tags: ["标签1", "标签2"],
    githubUrl: "GitHub链接"
  }
];
```

#### 建筑项目 (`src/data/architectureProjects.ts`)
```typescript
export const architectureProjects = [
  {
    id: 1,
    title: "建筑项目标题",
    description: "项目描述",
    imageUrl: "项目图片URL",
    tags: ["建筑设计", "概念设计"],
    githubUrl: "项目链接"
  }
];
```

#### 个人经验 (`src/data/experiences.ts`)
```typescript
export const experiences = [
  {
    id: 1,
    title: "职位名称",
    company: "公司名称",
    period: "2023-2024",
    description: "工作描述",
    skills: ["技能1", "技能2"]
  }
];
```

#### 头像图片 (`src/data/profileImages.ts`)
```typescript
export const profileImages = [
  "头像图片1的URL",
  "头像图片2的URL"
];
```

### 4. 启动开发服务器
```bash
pnpm dev
```

访问 http://localhost:3000 查看效果

### 5. 构建生产版本
```bash
pnpm build
```

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Navigation.tsx   # 导航栏组件
│   ├── PortfolioCard.tsx # 项目卡片组件
│   ├── ProjectModal.tsx # 项目详情模态框
│   ├── ExperienceCard.tsx # 经验卡片组件
│   └── Empty.tsx        # 空状态组件
├── pages/               # 页面组件
│   ├── Home.tsx         # 首页
│   ├── AiPortfolio.tsx  # AI作品集
│   ├── ArchitecturePortfolio.tsx # 建筑作品集
│   └── Experience.tsx   # 经验页面
├── data/                # 数据文件（需要修改）
│   ├── personal.ts      # 个人信息
│   ├── aiProjects.ts    # AI项目数据
│   ├── architectureProjects.ts # 建筑项目数据
│   ├── experiences.ts   # 经验数据
│   └── profileImages.ts # 头像图片
├── contexts/            # React上下文
├── hooks/               # 自定义钩子
└── lib/                 # 工具函数
```

## 🎨 自定义样式

### 修改主题色
编辑 `tailwind.config.js`：
```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',    // 主色调
        secondary: '#10B981',  // 次要色调
      }
    }
  }
}
```

### 修改字体
在 `src/index.css` 中添加：
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;500;600;700&display=swap');

body {
  font-family: 'Your Font', sans-serif;
}
```

## 🚀 部署

### 使用PowerShell脚本（Windows）
```powershell
.\deploy.ps1
```

### 手动部署
```bash
pnpm build
# 将 dist/static 目录下的文件上传到你的服务器
```

## 📝 注意事项

1. **图片资源**: 确保所有图片URL都是可访问的
2. **个人信息**: 仔细检查所有个人信息是否正确
3. **链接**: 确保所有外部链接都是有效的
4. **SEO**: 根据需要添加meta标签和描述

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个模板！

## 📄 许可证

本项目采用 MIT 许可证

## 🙏 致谢

感谢所有为这个模板做出贡献的开发者！

---

**开始使用**: 克隆这个仓库，按照上面的步骤修改个人信息，然后部署到你的服务器上！

**有问题?**: 请提交Issue，我会尽快回复！
>>>>>>> a41a367 (first commit)
