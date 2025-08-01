import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogPosts, getBlogPost, type BlogPostMeta, type BlogPost } from "@/lib/blog";
import { Search, Calendar, User, ArrowLeft, Clock } from "lucide-react";
import { useRoute, useLocation } from "wouter";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [match, params] = useRoute("/blog/:id");
  const [location, setLocation] = useLocation();

  // Set selected post from URL parameter
  useEffect(() => {
    console.log('Blog routing debug:', { match, params, location });
    if (params?.id) {
      setSelectedPost(params.id);
      console.log('Setting selected post from params:', params.id);
    } else if (match) {
      // Extract ID from current location if useRoute doesn't work with base path
      const pathParts = location.split('/');
      const blogIndex = pathParts.indexOf('blog');
      if (blogIndex !== -1 && pathParts[blogIndex + 1]) {
        const postId = pathParts[blogIndex + 1];
        setSelectedPost(postId);
        console.log('Setting selected post from location parsing:', postId);
      }
    }
  }, [params?.id, match, location]);

  // Fetch all blog posts
  const { data: blogPosts = [], isLoading: isLoadingPosts } = useQuery({
    queryKey: ['/api/blog/posts'],
    queryFn: getAllBlogPosts
  });

  // Fetch selected blog post content
  const { data: currentPost, isLoading: isLoadingPost } = useQuery({
    queryKey: ['/api/blog/posts', selectedPost],
    queryFn: () => selectedPost ? getBlogPost(selectedPost) : null,
    enabled: !!selectedPost
  });

  const categories = ["all", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Technology Solutions": "bg-blue-600",
      "Low-Code Solutions": "bg-green-600",
      "Digital Solutions": "bg-purple-600",
      "Custom Development": "bg-orange-600",
      "Training & Development": "bg-blue-600",
      "Digital Transformation": "bg-purple-600"
    };
    return colors[category] || "bg-gray-600";
  };

  const getCategoryImage = (category: string) => {
    const images: { [key: string]: string } = {
      "Low-Code Solutions": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "Training & Development": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "Digital Transformation": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "Custom Development": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "Technology Solutions": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "Digital Solutions": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    };
    return images[category] || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="from-jpanda-primary to-jpanda-secondary text-white py-20 bg-[#005a7a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Technology Insights & Tutorials
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto">
                Explore in-depth articles on digital transformation, low-code solutions, and cutting-edge technology consulting
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {selectedPost && currentPost ? (
              // Single Blog Post View
              (<div className="max-w-4xl mx-auto">
                <Button 
                  onClick={() => {
                    setSelectedPost(null);
                    setLocation("/blog");
                  }}
                  variant="ghost" 
                  className="mb-8 text-jpanda-primary bg-white hover:bg-[#005a7a] hover:text-[#ffffff]"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Articles
                </Button>
                <article className="prose prose-lg max-w-none">
                  <div className="mb-8">
                    <Badge className={`${getCategoryColor(currentPost.category)} text-white mb-4`}>
                      {currentPost.category}
                    </Badge>
                    <h1 className="text-4xl font-bold text-jpanda-primary mb-4">{currentPost.title}</h1>
                    <div className="flex items-center text-gray-600 mb-6">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="mr-6">{new Date(currentPost.date).toLocaleDateString('en-GB')}</span>
                      <User className="h-4 w-4 mr-2" />
                      <span className="mr-6">{currentPost.author}</span>
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{currentPost.readTime}</span>
                    </div>
                    <p className="text-xl text-gray-700 leading-relaxed">{currentPost.excerpt}</p>
                  </div>
                  
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-jpanda-primary prose-links:text-jpanda-accent prose-strong:text-jpanda-primary"
                    dangerouslySetInnerHTML={{ __html: currentPost.content }}
                  />
                </article>
              </div>)
            ) : (
              // Blog Posts Grid
              (<>
                {isLoadingPosts ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-jpanda-primary"></div>
                    <p className="mt-4 text-gray-600">Loading articles...</p>
                  </div>
                ) : filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-2xl font-bold text-gray-600 mb-4">No articles found</h3>
                    <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                      <Card 
                        key={post.id} 
                        className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
                        onClick={() => setLocation(`/blog/${post.id}`)}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={getCategoryImage(post.category)} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <Badge className={`${getCategoryColor(post.category)} text-white text-xs font-semibold`}>
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="mr-4">{new Date(post.date).toLocaleDateString('en-GB')}</span>
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{post.readTime}</span>
                          </div>
                          <CardTitle className="text-xl font-bold text-jpanda-primary group-hover:text-jpanda-accent transition-colors leading-tight">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">By {post.author}</span>
                            <span className="text-jpanda-accent font-medium text-sm">Read More →</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>)
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-jpanda-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-gray-200 mb-8">
              Get the latest insights on digital transformation and technology solutions delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white text-gray-800"
              />
              <button className="bg-jpanda-accent text-white px-6 py-2 rounded-lg hover:bg-jpanda-accent/90 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
