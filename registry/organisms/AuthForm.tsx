import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/molecules/FormField";
import { Separator } from "@/components/ui/separator";
import { Heading, Text, Logo } from "@/components/atoms";
import { useState } from "react";

interface AuthFormProps {
  mode?: "login" | "signup";
  onSubmit?: (data: { email: string; password: string; name?: string }) => void;
  className?: string;
}

export function AuthForm({ mode = "login", onSubmit, className }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ email, password, name: mode === "signup" ? name : undefined });
  };

  return (
    <div className={cn("w-full max-w-[400px] rounded-lg border border-border bg-card p-6 space-y-6", className)}>
      <div className="flex flex-col items-center space-y-1">
        <Logo size={32} />
        <Heading level="h2" className="font-display text-lg font-semibold">
          Sign In
        </Heading>
        <Text variant="muted" size="sm">
          {mode === "login" ? "Sign in to your account" : "Create a new account"}
        </Text>
      </div>

      {/* Social buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Button variant="secondary" className="font-body text-sm">
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"/></svg>
          Google
        </Button>
        <Button variant="secondary" className="font-body text-sm">
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/></svg>
          GitHub
        </Button>
      </div>

      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 font-body text-xs text-muted-foreground">or</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <FormField label="Full Name" htmlFor="auth-name" required>
            <Input id="auth-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="font-body" />
          </FormField>
        )}
        <FormField label="Email" htmlFor="auth-email" required>
          <Input id="auth-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="font-body" />
        </FormField>
        <FormField label="Password" htmlFor="auth-password" required>
          <Input id="auth-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="font-body" />
        </FormField>
        <Button type="submit" className="w-full">
          {mode === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <Text variant="muted" size="xs" className="text-center">
        {mode === "login" ? (
          <>Don't have an account? <a href="#" className="text-accent hover:underline">Sign up</a></>
        ) : (
          <>Already have an account? <a href="#" className="text-accent hover:underline">Sign in</a></>
        )}
      </Text>
    </div>
  );
}
