import { Settings, GraduationCap, Code, Zap, Users, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Services() {
  const services = [
    {
      icon: <Settings className="h-10 w-10" />,
      title: "Expert IT Consultation",
      description: "Expert consultation across IT lifecycles & solutions. From strategy to implementation, we guide your technology transformation journey.",
      features: [
        "IT Strategy & Planning",
        "System Architecture Design",
        "Digital Transformation",
        "Technology Lifecycle Management"
      ]
    },
    {
      icon: <GraduationCap className="h-10 w-10" />,
      title: "Customised Training",
      description: "Develop & execute customised training programmes tailored to your team's specific needs and skill gaps.",
      features: [
        "Technology Skills Development",
        "Custom Training Programmes",
        "Low-Code Platform Training",
        "Future Skills Building"
      ]
    },
    {
      icon: <Code className="h-10 w-10" />,
      title: "Custom Development",
      description: "Custom solution & product development using both low-code and pro-code approaches to meet your unique requirements.",
      features: [
        "Custom Solution Development",
        "Low-Code & Pro-Code Solutions",
        "Enterprise Applications",
        "Integration Services"
      ]
    }
  ];

  const technologies = [
    {
      icon: <Code className="h-8 w-8" />,
      name: "Low-Code",
      description: "Rapid Development Solutions"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      name: "Pro-Code",
      description: "Custom Development"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      name: "Digital Solutions",
      description: "Modern Technology Stack"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      name: "Innovation",
      description: "Future-Ready Solutions"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-jpanda-primary mb-4">What Do We Do?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering people to lead and innovate by putting critical tech and skills back into the hands of our people
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="bg-gray-50 hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="text-jpanda-primary mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-jpanda-primary mb-4">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="text-gray-600 space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className="w-2 h-2 bg-jpanda-accent rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Stack */}
        <Card className="bg-jpanda-primary text-white">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Technology We Trust, Solutions We Build</h3>
              <p className="text-xl text-gray-200">We are low-coders and pro-coders</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {technologies.map((tech, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-jpanda-accent flex justify-center">
                    {tech.icon}
                  </div>
                  <h4 className="font-semibold">{tech.name}</h4>
                  <p className="text-sm text-gray-300">{tech.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
