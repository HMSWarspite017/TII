// 新闻维护文件：只需要编辑下面的数组，不需要改页面和样式。
// 当前为空，不会显示示例或虚构新闻。
// 添加新闻：复制下方注释中的对象，放入 [] 内。多条新闻之间用英文逗号分隔。
// 日期格式 YYYY-MM-DD；最新日期的新闻自动成为左侧重点新闻。
// image 留空时显示品牌色背景；图片可上传到 assets/news/ 后填写相对路径。
// 中英文内容分别填写；暂未翻译时可将 en 留空，页面会显示中文原文。
window.TII_NEWS = [];

/* 单条新闻填写模板（复制时不要复制本行及末尾的注释符号）：
{
  date: "2026-09-23",
  title: { zh: "在这里填写中文标题", en: "English title" },
  summary: { zh: "在这里填写简短摘要", en: "English summary" },
  image: "./assets/news/news-01.jpg",
  imageAlt: { zh: "图片说明", en: "Image description" },
  body: {
    zh: ["中文正文第一段。", "中文正文第二段。"],
    en: ["First English paragraph.", "Second English paragraph."]
  }
}
*/
