import matter from 'gray-matter';
import { marked } from 'marked';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  content: string;
  slug: string;
}

export interface BlogPostMeta {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  slug: string;
}

// Function to get all blog post metadata
export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  try {
    // For GitHub Pages deployment, use comprehensive blog data
    if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
      const { blogPosts } = await import('@/data/blog-posts-complete');
      return blogPosts.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        category: post.category,
        author: post.author,
        readTime: post.difficulty || "5 min read", // Use difficulty as readTime fallback
        slug: post.slug
      }));
    }
    
    const response = await fetch('/api/blog/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Fallback to comprehensive blog data if API fails
    try {
      const { blogPosts } = await import('@/data/blog-posts-complete');
      return blogPosts.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        category: post.category,
        author: post.author,
        readTime: post.difficulty || "5 min read", // Use difficulty as readTime fallback
        slug: post.slug
      }));
    } catch {
      return [];
    }
  }
}

// Function to get a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // For GitHub Pages deployment, use comprehensive blog data
    if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
      const { blogPosts } = await import('@/data/blog-posts-complete');
      const post = blogPosts.find(p => p.slug === slug);
      if (post) {
        return {
          ...post,
          readTime: post.difficulty || "5 min read"
        };
      }
      return null;
    }
    
    const response = await fetch(`/api/blog/posts/${slug}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch blog post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    // Fallback to comprehensive blog data if API fails
    try {
      const { blogPosts } = await import('@/data/blog-posts');
      const post = blogPosts.find(p => p.slug === slug);
      if (post) {
        return {
          ...post,
          readTime: post.difficulty || "5 min read"
        };
      }
      return null;
    } catch {
      return null;
    }
  }
}

// Function to get blog posts by category
export async function getBlogPostsByCategory(category: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(post => post.category === category);
}

// Configure marked options for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

export { marked };