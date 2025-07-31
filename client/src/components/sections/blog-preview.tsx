import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogPosts } from "@/lib/blog";
import { Link } from "wouter";

export default function BlogPreview() {
  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ['/api/blog/posts'],
    queryFn: getAllBlogPosts
  });
  
  const featuredPosts = blogPosts.slice(0, 6);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Low-Code Solutions": "bg-green-600",
      "Training & Development": "bg-blue-600", 
      "Digital Transformation": "bg-purple-600",
      "Custom Development": "bg-orange-600"
    };
    return colors[category] || "bg-gray-600";
  };

  const getCategoryImage = (category: string) => {
    const images: { [key: string]: string } = {
      "Low-Code Solutions": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "Training & Development": "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "Digital Transformation": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "Custom Development": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    };
    return images[category] || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600";
  };

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-jpanda-primary mb-4">Latest Insights</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends in digital transformation, low-code solutions, and technology consulting
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-jpanda-primary"></div>
            <p className="mt-4 text-gray-600">Loading latest insights...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="bg-gray-50 overflow-hidden hover:shadow-lg transition-all duration-300 group">
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
                <CardHeader className="pb-3">
                  <div className="flex items-center mb-3">
                    <span className="text-gray-500 text-sm">{new Date(post.date).toLocaleDateString('en-GB')}</span>
                  </div>
                  <h3 className="text-xl font-bold text-jpanda-primary group-hover:text-jpanda-accent transition-colors leading-tight">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.id}`}>
                    <span className="text-jpanda-primary hover:text-jpanda-accent font-semibold transition-colors duration-200 cursor-pointer inline-flex items-center">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild className="bg-jpanda-primary text-white hover:bg-jpanda-primary/90">
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
