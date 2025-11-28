import fm from 'front-matter';

// 1. Load all .md files
const modules = import.meta.glob('../content/*.md', { 
  eager: true, 
  query: '?raw', 
  import: 'default' 
});

export const articles = Object.keys(modules).map((path) => {
  const content = modules[path];
  
  // FIX: Added space between 'const' and 'parsed'
  const parsed = fm(content);
  
  // 2. Parse Wiki Links: [[article-slug.md]] or [[article-slug]]
  // Regex looks for [[text]] and captures "text"
  const wikiLinkRegex = /\[\[(.*?)(?:\.md)?\]\]/g;
  const outboundLinks = [];
  let match;
  
  while ((match = wikiLinkRegex.exec(parsed.body)) !== null) {
    // match[1] is the slug (e.g., "understanding-algorithms")
    outboundLinks.push(match[1]);
  }

  return {
    ...parsed.attributes,
    content: parsed.body,
    outboundLinks // We will use this to draw lines in the graph
  };
});
