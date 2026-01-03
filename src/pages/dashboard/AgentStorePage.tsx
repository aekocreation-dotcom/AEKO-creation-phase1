import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  MoreVertical,
  ExternalLink,
  Code,
  Bot,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Agent {
  id: string;
  name: string;
  description: string;
  status: "UNPUBLISHED" | "PUBLISHED";
  pricing: "FREE" | "PAID";
  icon?: string;
  createdAt: Date;
}

const AgentStorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "1",
      name: "Cnergee",
      description: "Cnergee Technologies provides integrated network security products—SD-WAN, NGFW, Managed WiFi, and Endpoint Security—built in...",
      status: "UNPUBLISHED",
      pricing: "FREE",
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Instagram",
      description: "No description available",
      status: "UNPUBLISHED",
      pricing: "FREE",
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Yamaha Motor India",
      description: "Presenting the new & best in the class - ✓ Mileage Scooters ✓ Performance Motorcycles ✓ Superbikes from Yamaha....",
      status: "UNPUBLISHED",
      pricing: "FREE",
      createdAt: new Date(),
    },
    {
      id: "4",
      name: "Hi Focus",
      description: "Explore advanced CCTV solutions from the most reliable and trusted CCTV camera brand in India, Hi Focus. Shop for HD CCTV Cameras, IP, PTZ...",
      status: "UNPUBLISHED",
      pricing: "FREE",
      createdAt: new Date(),
    },
    {
      id: "5",
      name: "Aavas Financiers Ltd",
      description: "Aavas Financiers Limited - a leading housing loan finance company in India offering various types of home loans at attractive interest rates...",
      status: "UNPUBLISHED",
      pricing: "FREE",
      createdAt: new Date(),
    },
    {
      id: "6",
      name: "Cloud",
      description: "This agent helps the user to raise support requests on the Scogo Cloud Platform",
      status: "UNPUBLISHED",
      pricing: "FREE",
      createdAt: new Date(),
    },
    {
      id: "7",
      name: "Globalnet",
      description: "As a market leader in Myanmar, our suite of ICT Solutions is backed up by an extensive data network and infrastructure that spans key...",
      status: "UNPUBLISHED",
      pricing: "FREE",
      createdAt: new Date(),
    },
    {
      id: "8",
      name: "IIT Roorkee",
      description: "IIT Roorkee primarily functions as a leading technical research university, offering undergraduate, postgraduate, and doctoral...",
      status: "UNPUBLISHED",
      pricing: "FREE",
      createdAt: new Date(),
    },
  ]);

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="mb-3 px-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Agent Store</h1>
          </div>
          <Button
            variant="hero"
            size="default"
            className="gap-2"
            onClick={() => {
              toast.info("Create Agent feature coming soon!");
            }}
          >
            <Plus className="w-4 h-4" />
            Create Agent
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Agents..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-card border border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
          />
        </div>
      </div>

      {/* Agent Grid - Full Width */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 px-1">
        {filteredAgents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-card border border-border/50 rounded-xl p-4 hover:border-primary/50 hover:shadow-lg transition-all group"
          >
            {/* Card Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {agent.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-secondary/50 text-muted-foreground">
                      {agent.status}
                    </span>
                    <span className="text-xs text-muted-foreground">|</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-500">
                      {agent.pricing}
                    </span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-1.5 hover:bg-secondary/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => toast.info("Edit agent")}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Delete agent")}>
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast.info("Duplicate agent")}>
                    Duplicate
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground mb-3 line-clamp-3 leading-relaxed">
              {agent.description}
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div className="flex items-center gap-2">
                <button
                  className="p-2 hover:bg-secondary/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  title="Share"
                  onClick={() => toast.info("Share agent")}
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  className="p-2 hover:bg-secondary/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                  title="View Code"
                  onClick={() => toast.info("View code")}
                >
                  <Code className="w-4 h-4" />
                </button>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  toast.info(`Interacting with ${agent.name}`);
                }}
              >
                Interact
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-8">
          <Bot className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No agents found</p>
        </div>
      )}
    </div>
  );
};

export default AgentStorePage;






