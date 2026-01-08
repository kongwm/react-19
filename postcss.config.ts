// postcss.config.js - 基础配置

export default {
  plugins: {
    // Tailwind CSS 插件
    '@tailwindcss/postcss': {},

    // Autoprefixer - 自动添加浏览器前缀
    autoprefixer: {},

    // 可选: PostCSS Preset Env - 使用现代 CSS 特性
    // 'postcss-preset-env': {
    //   stage: 3,
    //   features: {
    //     'nesting-rules': true,
    //   },
    // },

    // 可选: CSS 压缩 (生产环境)
    ...(process.env.NODE_ENV === 'production'
      ? {
          cssnano: {
            preset: [
              'default',
              {
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          },
        }
      : {}),
  },
};

// ========================================
// 其他常用配置格式
// ========================================

// 1. CommonJS 格式 (如果项目不支持 ES modules)
/*
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
*/

// 2. 完整配置示例
/*
export default {
  plugins: {
    // Tailwind CSS
    tailwindcss: {},
    
    // Autoprefixer 配置
    autoprefixer: {
      overrideBrowserslist: [
        '>0.2%',
        'not dead',
        'not op_mini all',
      ],
      grid: true,
    },
    
    // PostCSS Import - 处理 @import
    'postcss-import': {},
    
    // PostCSS Nested - CSS 嵌套
    'postcss-nested': {},
    
    // PostCSS Preset Env - 现代 CSS 特性
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true,
      },
    },
    
    // CSS Nano - 生产环境压缩
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          minifyFontValues: true,
          minifyGradients: true,
        }],
      },
    } : {}),
  },
}
*/

// 3. 使用配置函数
/*
export default (ctx) => ({
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(ctx.env === 'production' ? { cssnano: {} } : {}),
  },
})
*/
