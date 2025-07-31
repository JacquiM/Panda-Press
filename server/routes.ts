import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

interface BlogPostMeta {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  slug: string;
}

interface BlogPost extends BlogPostMeta {
  content: string;
}

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Helper function to create slug from filename
function createSlug(filename: string): string {
  return filename.replace('.md', '').toLowerCase();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog API routes
  
  // Get all blog posts metadata
  app.get('/api/blog/posts', async (req, res) => {
    try {
      const postsDir = path.join(process.cwd(), 'posts');
      
      // Check if posts directory exists
      try {
        await fs.access(postsDir);
      } catch {
        return res.json([]);
      }

      const files = await fs.readdir(postsDir);
      const markdownFiles = files.filter(file => file.endsWith('.md'));
      
      const posts: BlogPostMeta[] = [];
      
      for (const file of markdownFiles) {
        const filePath = path.join(postsDir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data } = matter(fileContent);
        
        const slug = createSlug(file);
        
        posts.push({
          id: slug,
          slug,
          title: data.title || 'Untitled',
          excerpt: data.excerpt || '',
          date: data.date || new Date().toISOString().split('T')[0],
          category: data.category || 'General',
          author: data.author || 'JPanda Solutions',
          readTime: data.readTime || '5 min read'
        });
      }
      
      // Sort posts by date (newest first)
      posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      res.json(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  });

  // Get single blog post by slug
  app.get('/api/blog/posts/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const postsDir = path.join(process.cwd(), 'posts');
      const filePath = path.join(postsDir, `${slug}.md`);
      
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(fileContent);
        
        const htmlContent = await marked(content);
        
        const post: BlogPost = {
          id: slug,
          slug,
          title: data.title || 'Untitled',
          excerpt: data.excerpt || '',
          date: data.date || new Date().toISOString().split('T')[0],
          category: data.category || 'General',
          author: data.author || 'JPanda Solutions',
          readTime: data.readTime || '5 min read',
          content: htmlContent
        };
        
        res.json(post);
      } catch (error) {
        res.status(404).json({ error: 'Blog post not found' });
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).json({ error: 'Failed to fetch blog post' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
