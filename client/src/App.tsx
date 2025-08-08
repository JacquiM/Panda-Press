import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Blog from "@/pages/blog";
import { useEffect } from "react";
import { useLocation } from "wouter";

function HashRedirectHandler() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Handle hash-based redirects from 404.html
    const hash = window.location.hash;
    if (hash && hash.startsWith('#/')) {
      const path = hash.slice(1); // Remove the #
      console.log('Hash redirect detected:', hash, '->', path);
      window.history.replaceState({}, '', path);
      setLocation(path);
    }
  }, [setLocation]);

  return null;
}

function AppRouter() {
  return (
    <Router base="/">
      <HashRedirectHandler />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={Blog} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
