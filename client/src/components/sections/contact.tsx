import { useState } from "react";
import { Mail, Phone, Globe, Linkedin } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      service: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "Thank you for your message! We will get back to you soon.",
    });

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      service: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      value: "info@thejpanda.com",
      href: "mailto:info@thejpanda.com"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      value: "+27 62 845 0489",
      href: "tel:+27628450489"
    },
    {
      icon: <FaWhatsapp className="h-5 w-5" />,
      title: "WhatsApp",
      value: "Message us on WhatsApp",
      href: "https://wa.me/27628450489"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Website",
      value: "thejpanda.com",
      href: "https://thejpanda.com"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      title: "LinkedIn",
      value: "Connect with JPanda Solutions",
      href: "https://www.linkedin.com/company/jpanda-solutions/"
    },
    {
      icon: <FaFacebook className="h-5 w-5" />,
      title: "Facebook",
      value: "Follow us on Facebook",
      href: "https://www.facebook.com/profile.php?id=61573689921203"
    },
    {
      icon: <FaInstagram className="h-5 w-5" />,
      title: "Instagram",
      value: "Follow @jpanda.solutions",
      href: "https://www.instagram.com/jpanda.solutions/"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-jpanda-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Connect With Us Today!</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Ready to power your future with innovative technology solutions? Let's start the conversation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white text-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-jpanda-primary">
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="mt-2"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@company.com"
                    className="mt-2"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="company" className="text-sm font-semibold text-gray-700">
                    Company
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your Company"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="service" className="text-sm font-semibold text-gray-700">
                    Service Interest
                  </Label>
                  <Select value={formData.service} onValueChange={handleSelectChange}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">IT Consultation</SelectItem>
                      <SelectItem value="training">Training Programmes</SelectItem>
                      <SelectItem value="development">Custom Development</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project requirements..."
                    rows={4}
                    className="mt-2"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-jpanda-primary text-white hover:bg-jpanda-primary/90"
                  size="lg"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center">
                  <div className="bg-jpanda-accent p-3 rounded-lg mr-4">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold">{info.title}</h4>
                    <a 
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-gray-200 hover:text-white transition-colors"
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-semibold mb-4">South African Business</h4>
              <p className="text-gray-200">
                Proudly serving clients across South Africa and internationally with local expertise and global standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
