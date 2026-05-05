import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { TokenCounter } from "@/components/molecules/TokenCounter";
import { Play } from "lucide-react";

interface PlaygroundPanelProps {
  compiledPrompt: string;
  response?: string;
  model?: string;
  tokenCount?: number;
  maxTokens?: number;
  isRunning?: boolean;
  onRun?: () => void;
  userInput?: string;
  onUserInputChange?: (value: string) => void;
  className?: string;
}

/**
 * PlaygroundPanel — test prompts against a model. Shows the compiled prompt,
 * an optional user message input, and the model response area.
 */
export function PlaygroundPanel({
  compiledPrompt,
  response,
  model = "claude-3.5-sonnet",
  tokenCount,
  maxTokens = 4096,
  isRunning = false,
  onRun,
  userInput = "",
  onUserInputChange,
  className,
}: PlaygroundPanelProps) {
  return (
    <div className={cn("rounded-md border border-border bg-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-medium text-foreground">Playground</span>
          <Badge variant="outline" size="sm">
            <span className="font-mono">{model}</span>
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          {tokenCount !== undefined && (
            <TokenCounter current={tokenCount} max={maxTokens} compact />
          )}
          <Button size="sm" onClick={onRun} loading={isRunning} disabled={isRunning}>
            <Play className="h-3.5 w-3.5" /> Run
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 divide-y divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
        {/* Left — System prompt + User input */}
        <div className="flex flex-col">
          <div className="border-b border-border px-3 py-1.5">
            <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">System Prompt</span>
          </div>
          <div className="flex-1 overflow-auto p-3">
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted-foreground">
              {compiledPrompt || "No compiled prompt available."}
            </pre>
          </div>
          <div className="border-t border-border p-3">
            <span className="mb-1.5 block font-mono text-2xs uppercase tracking-widest text-muted-foreground">User Message</span>
            <Textarea
              value={userInput}
              onChange={(e) => onUserInputChange?.(e.target.value)}
              placeholder="Type a test message…"
              className="min-h-[60px] text-xs"
            />
          </div>
        </div>

        {/* Right — Response */}
        <div className="flex flex-col">
          <div className="border-b border-border px-3 py-1.5">
            <span className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">Response</span>
          </div>
          <div className="flex-1 overflow-auto p-3">
            {isRunning ? (
              <div className="flex items-center gap-2 py-8 justify-center">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-accent animate-ai-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                <span className="font-body text-sm text-muted-foreground">Generating…</span>
              </div>
            ) : response ? (
              <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-foreground">
                {response}
              </pre>
            ) : (
              <p className="py-8 text-center font-body text-sm text-foreground-subtle italic">
                Click Run to test the prompt.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
