import { CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

import LinkedIn_Logo from "@assets/LinkedIn Logo.png";

export default function About() {
  const achievements = [
    "Expert consultation across IT lifecycles & solutions",
    "Develop & execute customised training programmes",
    "Custom solution & product development",
    "Low-code and pro-code expertise"
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={LinkedIn_Logo} 
              alt="Professional consultant working on technology solutions" 
              className="rounded-2xl shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-jpanda-primary mb-6">About JPanda Solutions</h2>
            
            <p className="text-lg text-gray-600 mb-8">
              At JPanda Solutions, we specialise in empowering organisations through technology consulting, training, and custom development. Our mission is to put critical tech and skills back into the hands of our people, enabling them to lead and innovate in today's digital landscape.
            </p>
            
            <div className="space-y-4 mb-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="text-jpanda-accent mr-3 h-5 w-5" />
                  <span className="text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
