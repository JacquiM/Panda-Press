import { Button } from "@/components/ui/button";

import JPANDA_SOLUTIONS_COLLATERAL_VIDEO from "@assets/JPANDA SOLUTIONS COLLATERAL.mp4";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="pt-16 bg-gradient-to-br from-jpanda-primary to-jpanda-secondary text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-20 bg-[#005a7abf]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Powering the future, 
              <span className="text-jpanda-accent"> one solution at a time</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-gray-200 font-light">
              Technology consulting that makes a difference and helps businesses thrive in a digital world, while building future skills
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('services')}
                className="bg-jpanda-accent text-white hover:bg-jpanda-accent/90 px-8 py-4 text-lg font-semibold"
                size="lg"
              >
                Our Services
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border-2 border-white text-[#003c52] bg-white hover:bg-[#ffffff] hover:text-[#005a7a] px-8 py-4 text-lg font-semibold"
                size="lg"
              >
                Get in Touch
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl w-full max-w-lg mx-auto">
              <video 
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={JPANDA_SOLUTIONS_COLLATERAL_VIDEO} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
