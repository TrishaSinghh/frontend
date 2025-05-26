import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HelpCircle, Info, FileText, Mail, Book, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const CARD_BG = "bg-white/80 backdrop-blur border border-[#e0e7ef] shadow-lg";
const ICON_BG = "bg-gradient-to-br from-[#3B82F6] to-[#2563eb]";
const ICON_COLOR = "text-white";

const subpages = [
  {
    title: "FAQs",
    icon: HelpCircle,
    description: "Answers to commonly asked questions",
    link: "/faqs"
  },
  {
    title: "About",
    icon: Info,
    description: "Learn about our mission and team",
    link: "/about"
  },
  {
    title: "Jobs",
    icon: Briefcase,
    description: "Find MBBS internships and opportunities",
    link: "/jobs"
  },
  {
    title: "Privacy Policy",
    icon: FileText,
    description: "How we protect your data",
    link: "/privacy"
  },
  {
    title: "Contact Us",
    icon: Mail,
    description: "Get in touch with our support team",
    link: "/contact"
  },
  {
    title: "Blog",
    icon: Book,
    description: "Latest news and articles for medical professionals",
    link: "/blog"
  }
];

const SubpageNav = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1e293b] mb-4 tracking-tight">
            Resources & Information
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Everything you need to know about our platform and how we support the medical community.
          </p>
          <motion.div 
            className="h-1 w-24 bg-[#3B82F6] mx-auto mt-5 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {subpages.map((page, index) => (
            <motion.div 
              key={index}
              className={`${CARD_BG} rounded-2xl p-7 flex flex-col justify-between min-h-[240px] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ scale: 1.04 }}
            >
              <div className="flex items-center mb-5">
                <div className={`w-12 h-12 rounded-full ${ICON_BG} flex items-center justify-center shadow-md mr-4 transition-all group-hover:scale-110`}>
                  <page.icon className={`w-6 h-6 ${ICON_COLOR}`} />
                </div>
                <h3 className="text-xl font-semibold text-[#1e293b]">{page.title}</h3>
              </div>
              <p className="text-gray-600 mb-6">{page.description}</p>
              <Link to={page.link} tabIndex={-1}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-[#3B82F6] text-[#2563eb] font-semibold hover:bg-[#3B82F6]/10 hover:text-[#1e40af] transition-all"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubpageNav;
