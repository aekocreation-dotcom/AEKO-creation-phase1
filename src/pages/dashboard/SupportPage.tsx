import { useState } from "react";
import { motion } from "framer-motion";
import { 
  HelpCircle, 
  MessageCircle, 
  Book, 
  ExternalLink,
  ChevronDown,
  Send,
  Mail,
  Github,
  Twitter
} from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "How do AI credits work?",
    answer: "AI credits are consumed each time you generate content. Different actions use different amounts of credits. For example, generating an image uses more credits than a simple chat message. You can view your credit usage in your account settings.",
  },
  {
    question: "Can I use generated content commercially?",
    answer: "Yes! All paid plans include a commercial license for the content you generate. You can use images and videos in your projects, products, and marketing materials.",
  },
  {
    question: "What AI models are available?",
    answer: "We offer access to GPT-4, GPT-3.5, Claude 3, FLUX Pro, Stable Diffusion XL, DALL-E 3, and various video generation models. The available models depend on your subscription plan.",
  },
  {
    question: "How do I upgrade my plan?",
    answer: "You can upgrade your plan anytime from your Account settings. Go to Account → Subscription and click 'Manage Plan' to view available options.",
  },
  {
    question: "Is there an API available?",
    answer: "Yes! Standard and Pro plans include API access. You can generate an API key from your Account settings and integrate AEKO into your applications.",
  },
];

const SupportPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          Help & Support
        </h1>
        <p className="text-muted-foreground">
          Find answers to common questions or get in touch
        </p>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid sm:grid-cols-3 gap-4"
      >
        <a
          href="#"
          className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all group"
        >
          <Book className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Documentation
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Guides and API reference
          </p>
          <div className="flex items-center gap-1 text-sm text-primary">
            <span>Read docs</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </a>

        <a
          href="#"
          className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all group"
        >
          <MessageCircle className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Discord Community
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Chat with other creators
          </p>
          <div className="flex items-center gap-1 text-sm text-primary">
            <span>Join Discord</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </a>

        <a
          href="mailto:support@aeko.ai"
          className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all group"
        >
          <Mail className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Email Support
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Get help from our team
          </p>
          <div className="flex items-center gap-1 text-sm text-primary">
            <span>Contact us</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </a>
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-secondary/30 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-medium text-foreground">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-4 pb-4"
                >
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Feedback Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Send Feedback
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Have a suggestion or found a bug? Let us know!
        </p>

        <textarea
          value={feedbackMessage}
          onChange={(e) => setFeedbackMessage(e.target.value)}
          placeholder="Tell us what you think..."
          className="w-full h-32 px-4 py-3 rounded-xl bg-secondary/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none mb-4"
        />

        <Button variant="hero" className="gap-2">
          <Send className="w-4 h-4" />
          Send Feedback
        </Button>
      </motion.div>

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-4"
      >
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </motion.div>
    </div>
  );
};

export default SupportPage;
