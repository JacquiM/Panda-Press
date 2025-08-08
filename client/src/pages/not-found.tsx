import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            
            <h1 className="text-6xl font-bold text-jpanda-primary mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Oops! The page you're looking for seems to have wandered off. 
              Don't worry, even our best automation can't keep track of everything!
            </p>
          </div>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What can you do?</h3>
              <div className="space-y-3 text-left mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-jpanda-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Check the URL for any typos</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-jpanda-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Go back to the previous page</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-jpanda-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Visit our homepage to start fresh</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-jpanda-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Explore our blog for the latest insights</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.history.back()}
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </Button>
                
                <Button 
                  onClick={() => setLocation("/")}
                  size="lg"
                  className="flex items-center gap-2 bg-jpanda-primary hover:bg-jpanda-accent"
                >
                  <Home className="h-4 w-4" />
                  Homepage
                </Button>
                
                <Button 
                  onClick={() => setLocation("/blog")}
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2"
                >
                  📝 Blog
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact us at{" "}
              <a href="mailto:hello@jpandasolutions.com" className="text-jpanda-accent hover:underline">
                hello@jpandasolutions.com
              </a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
