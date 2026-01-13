import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Loader2, Apple, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authAPI } from "@/lib/api";
import { toast } from "sonner";
import logoDark from "@/assets/ChatGPT Image Dec 25, 2025, 03_45_44 PM.png";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: any) => void }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

const AuthSignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleGoogleCallback = useCallback(async (response: any) => {
    setIsGoogleLoading(true);
    try {
      const res = await authAPI.googleLogin(response.credential);
      if (res.success) {
        toast.success("Welcome! Signed in with Google");
        navigate("/dashboard");
      } else {
        toast.error(res.message || "Google sign-in failed");
      }
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast.error(error.message || "Failed to sign in with Google");
    } finally {
      setIsGoogleLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
          callback: handleGoogleCallback,
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [handleGoogleCallback]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password");
      return;
    }
    setIsLoading(true);
    try {
      if (isSignUp) {
        // Registration logic - you may need to add name field
        const res = await authAPI.register(email.split("@")[0], email, password);
        if (res.success) {
          toast.success("Account created! Welcome!");
          navigate("/dashboard");
        } else {
          toast.error(res.message || "Registration failed");
        }
      } else {
        const res = await authAPI.login(email, password);
        if (res.success) {
          toast.success("Welcome back!");
          navigate("/dashboard");
        } else {
          toast.error(res.message || "Invalid credentials");
        }
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    if (!window.google) {
      toast.error("Google Sign-In is loading. Please wait a moment and try again.");
      return;
    }
    if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      toast.info(
        "Google OAuth is not configured. Please use email/password login.",
        { duration: 4000 }
      );
      return;
    }
    setIsGoogleLoading(true);
    window.google.accounts.id.prompt();
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a1a]">
      {/* Left Panel - Login/Signup UI */}
      <div className="w-full lg:w-[480px] bg-[#12162A] flex flex-col p-8 lg:p-12 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center ring-2 ring-white">
            <img 
              src={logoDark} 
              alt="AEKO" 
              className="w-10 h-10 object-contain" 
            />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white">AEKO</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">.Ai</span>
          </div>
        </motion.div>

        {/* Sign up or Login with */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-white text-2xl font-semibold mb-1">
            {isSignUp ? "Create your account" : "Sign up or Login with"}
          </h2>
          <p className="text-gray-400 text-sm">
            {isSignUp ? "Join AEKO Creative Suite today" : "Get started with AI-powered creativity"}
          </p>
        </motion.div>

        {/* Login Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3 flex-1"
        >
          {/* Canva */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 bg-[#1a1f3a] border-[#2a2f4a] hover:bg-[#252a4a] text-white justify-start gap-3 rounded-xl"
            onClick={() => toast.info("Canva integration coming soon")}
          >
            <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-medium">Canva</span>
          </Button>

          {/* Apple */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 bg-[#1a1f3a] border-[#2a2f4a] hover:bg-[#252a4a] text-white justify-start gap-3 rounded-xl"
            onClick={() => toast.info("Apple sign-in coming soon")}
          >
            <Apple className="w-5 h-5 text-white" />
            <span className="font-medium">Apple</span>
          </Button>

          {/* Google */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 bg-[#1a1f3a] border-[#2a2f4a] hover:bg-[#252a4a] text-white justify-start gap-3 rounded-xl"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#4285F4]">G</span>
              </div>
            )}
            <span className="font-medium">Google</span>
          </Button>

          {/* Microsoft */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 bg-[#1a1f3a] border-[#2a2f4a] hover:bg-[#252a4a] text-white justify-start gap-3 rounded-xl"
            onClick={() => toast.info("Microsoft sign-in coming soon")}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <div className="w-3 h-3 bg-[#00A4EF]"></div>
            </div>
            <span className="font-medium">Microsoft</span>
          </Button>

          {/* Continue with Email */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 bg-[#1a1f3a] border-[#2a2f4a] hover:bg-[#252a4a] text-white justify-start gap-3 rounded-xl"
            onClick={() => setShowEmailForm(!showEmailForm)}
          >
            <Mail className="w-5 h-5 text-white" />
            <span className="font-medium">Continue with Email</span>
          </Button>

          {/* Email/Password Form - Show when Continue with Email is clicked */}
          {showEmailForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="mt-4 space-y-4 p-4 bg-[#1a1f3a] rounded-xl border border-[#2a2f4a]"
            >
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#0f1320] border-[#2a2f4a] text-white placeholder:text-gray-500"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#0f1320] border-[#2a2f4a] text-white placeholder:text-gray-500"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 border-[#2a2f4a] text-white ${
                    !isSignUp ? "bg-purple-500/20 border-purple-500" : "bg-[#0f1320]"
                  }`}
                >
                  Sign In
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 border-[#2a2f4a] text-white ${
                    isSignUp ? "bg-purple-500/20 border-purple-500" : "bg-[#0f1320]"
                  }`}
                >
                  Sign Up
                </Button>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    {isSignUp ? "Creating account..." : "Signing in..."}
                  </>
                ) : (
                  isSignUp ? "Create Account" : "Sign In"
                )}
              </Button>
            </motion.form>
          )}

          {/* Need help link */}
          <div className="pt-4">
            <Link to="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              Need help?
            </Link>
          </div>
        </motion.div>

        {/* Mobile App Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-auto pt-8"
        >
          <p className="text-white text-sm mb-4">Available now on iOS and Android</p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-12 bg-[#1a1f3a] border-[#2a2f4a] hover:bg-[#252a4a] text-white rounded-xl"
              onClick={() => toast.info("App Store link coming soon")}
            >
              <Apple className="w-5 h-5 mr-2" />
              <span className="text-xs">App Store</span>
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-12 bg-[#1a1f3a] border-[#2a2f4a] hover:bg-[#252a4a] text-white rounded-xl"
              onClick={() => toast.info("Google Play link coming soon")}
            >
              <Chrome className="w-5 h-5 mr-2" />
              <span className="text-xs">Google Play</span>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Right Panel - Background Image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Futuristic Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&q=80')`,
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#12162A]/80 via-[#12162A]/60 to-transparent" />
        {/* Animated Glow Effects */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(34, 211, 238, 0.25) 0%, transparent 50%)",
              "radial-gradient(circle at 60% 20%, rgba(34, 211, 238, 0.3) 0%, transparent 50%), radial-gradient(circle at 30% 80%, rgba(168, 85, 247, 0.25) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(34, 211, 238, 0.25) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default AuthSignIn;
