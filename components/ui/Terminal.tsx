"use client";

import { AnimatePresence, motion } from "framer-motion";
import { JetBrains_Mono } from "next/font/google";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  jokes,
  mobileLines,
  terminalCommandMap,
  terminalCommandNames,
  type TerminalAction,
  type TerminalLine,
  welcomeLines
} from "@/data/commands";

const terminalFont = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-terminal"
});

const DEFAULT_WIDTH = 680;
const DEFAULT_HEIGHT = 420;
const MIN_WIDTH = 480;
const MIN_HEIGHT = 280;
const MAX_HISTORY_LINES = 200;
const LINE_DELAY_MS = 40;

type DisplayLine = TerminalLine & {
  id: string;
  kind: "command" | "output";
};

type ThemeMode = "cyan" | "purple";
type Dimensions = { width: number; height: number };
type Position = { x: number; y: number };

const lineToneClassName: Record<NonNullable<TerminalLine["tone"]>, string> = {
  default: "text-[#e0e0e0]",
  muted: "text-[#808080]",
  accent: "text-[#7c3aed]",
  success: "text-[#7ef29a]",
  error: "text-[#ff6b6b]"
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getViewportDimensions() {
  if (typeof window === "undefined") {
    return { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

function getCenteredPosition(width: number, height: number): Position {
  const viewport = getViewportDimensions();
  return {
    x: Math.max((viewport.width - width) / 2, 16),
    y: Math.max((viewport.height - height) / 2, 32)
  };
}

function createDisplayLine(line: TerminalLine, indexSeed: number, kind: DisplayLine["kind"]): DisplayLine {
  return {
    ...line,
    id: `${kind}-${Date.now()}-${indexSeed}-${Math.random().toString(16).slice(2, 8)}`,
    kind
  };
}

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [draftInput, setDraftInput] = useState("");
  const [themeMode, setThemeMode] = useState<ThemeMode>("cyan");
  const [lines, setLines] = useState<DisplayLine[]>([]);
  const [dimensions, setDimensions] = useState<Dimensions>({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
  const [position, setPosition] = useState<Position>(() => getCenteredPosition(DEFAULT_WIDTH, DEFAULT_HEIGHT));
  const [matrixVisible, setMatrixVisible] = useState(false);
  const [sessionTimestamp, setSessionTimestamp] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const resumeAnchorRef = useRef<HTMLAnchorElement>(null);
  const previousBodyOverflowRef = useRef<string | null>(null);
  const previousBoundsRef = useRef<{ position: Position; dimensions: Dimensions } | null>(null);
  const dragStateRef = useRef<{ offsetX: number; offsetY: number } | null>(null);
  const resizeStateRef = useRef<{ startX: number; startY: number; startWidth: number; startHeight: number } | null>(null);
  const timeoutIdsRef = useRef<number[]>([]);
  const matrixFrameRef = useRef<number | null>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  const commandSuggestions = useMemo(() => terminalCommandNames.slice().sort((a, b) => a.localeCompare(b)), []);

  const clearScheduledTasks = useCallback(() => {
    timeoutIdsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutIdsRef.current = [];
  }, []);

  const appendLines = useCallback((nextLines: TerminalLine[], kind: DisplayLine["kind"] = "output", delayMs = LINE_DELAY_MS) => {
    if (!nextLines.length) {
      return 0;
    }

    nextLines.forEach((line, index) => {
      const timeoutId = window.setTimeout(() => {
        setLines((currentLines) => [...currentLines, createDisplayLine(line, index, kind)].slice(-MAX_HISTORY_LINES));
      }, index * delayMs);

      timeoutIdsRef.current.push(timeoutId);
    });

    return (nextLines.length - 1) * delayMs;
  }, []);

  const closeTerminal = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
    setHistoryIndex(null);
  }, []);

  const openTerminal = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
  }, []);

  const focusInput = useCallback(() => {
    window.setTimeout(() => {
      inputRef.current?.focus();
    }, 60);
  }, []);

  const applyTheme = useCallback((nextTheme: ThemeMode) => {
    document.documentElement.dataset.accent = nextTheme;
    localStorage.setItem("portfolio-terminal-theme", nextTheme);
    setThemeMode(nextTheme);
  }, []);

  const runConfetti = useCallback(async () => {
    const confettiModule = await import("canvas-confetti");
    confettiModule.default({
      particleCount: 180,
      spread: 110,
      startVelocity: 38,
      ticks: 240,
      zIndex: 120,
      origin: { y: 0.6 }
    });
  }, []);

  const runMatrix = useCallback(() => {
    setMatrixVisible(true);
  }, []);

  const runAction = useCallback(
    (action: TerminalAction | undefined, outputDurationMs: number) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case "close": {
          const timeoutId = window.setTimeout(closeTerminal, 120);
          timeoutIdsRef.current.push(timeoutId);
          break;
        }
        case "clear":
          setLines([]);
          break;
        case "downloadResume": {
          const timeoutId = window.setTimeout(() => {
            resumeAnchorRef.current?.click();
          }, Math.max(outputDurationMs + LINE_DELAY_MS, 100));
          timeoutIdsRef.current.push(timeoutId);
          break;
        }
        case "scroll": {
          const timeoutId = window.setTimeout(() => {
            closeTerminal();
            scrollToSection(action.target);
          }, action.closeAfterMs ?? 600);
          timeoutIdsRef.current.push(timeoutId);
          break;
        }
        case "contactCelebration": {
          const timeoutId = window.setTimeout(async () => {
            await runConfetti();
            scrollToSection("contact");
          }, action.delayMs);
          timeoutIdsRef.current.push(timeoutId);
          break;
        }
        case "matrix": {
          const timeoutId = window.setTimeout(() => {
            runMatrix();
          }, Math.max(outputDurationMs + 120, 120));
          timeoutIdsRef.current.push(timeoutId);
          break;
        }
        case "toggleTheme": {
          const nextTheme = themeMode === "cyan" ? "purple" : "cyan";
          applyTheme(nextTheme);
          const timeoutId = window.setTimeout(() => {
            setLines((currentLines) =>
              [
                ...currentLines,
                createDisplayLine(
                  { text: `Switched to: ${nextTheme === "purple" ? "PURPLE MODE" : "CYAN MODE"}`, tone: "success" },
                  currentLines.length,
                  "output"
                )
              ].slice(-MAX_HISTORY_LINES)
            );
          }, outputDurationMs + LINE_DELAY_MS);
          timeoutIdsRef.current.push(timeoutId);
          break;
        }
        case "showJoke": {
          appendLines(jokes[Math.floor(Math.random() * jokes.length)]);
          break;
        }
      }
    },
    [appendLines, applyTheme, closeTerminal, runConfetti, runMatrix, themeMode]
  );

  const executeCommand = useCallback(
    (rawCommand: string) => {
      const normalizedCommand = rawCommand.trim().toLowerCase();
      if (!normalizedCommand) {
        return;
      }

      if (normalizedCommand === "clear") {
        setInput("");
        setHistory((currentHistory) => [...currentHistory, normalizedCommand]);
        setHistoryIndex(null);
        setDraftInput("");
        setLines([]);
        return;
      }

      const definition = terminalCommandMap.get(normalizedCommand);

      setHistory((currentHistory) => [...currentHistory, normalizedCommand]);
      setHistoryIndex(null);
      setDraftInput("");
      appendLines([{ text: `> ${normalizedCommand}`, tone: "accent" }], "command", 0);

      if (!definition) {
        appendLines([{ text: `command not found: ${normalizedCommand} — type 'help' for available commands`, tone: "error" }]);
        setInput("");
        return;
      }

      let outputDurationMs = 0;
      if (definition.lines?.length) {
        outputDurationMs = appendLines(definition.lines);
      }

      runAction(definition.action, outputDurationMs);
      setInput("");
    },
    [appendLines, runAction]
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem("portfolio-terminal-theme");
    applyTheme(storedTheme === "purple" ? "purple" : "cyan");
    setSessionTimestamp(new Date().toLocaleString());

    const initialLines = [...welcomeLines];
    if (window.matchMedia("(max-width: 767px)").matches) {
      initialLines.push(...mobileLines);
    }

    setLines(initialLines.map((line, index) => createDisplayLine(line, index, "output")));
    setPosition(getCenteredPosition(DEFAULT_WIDTH, DEFAULT_HEIGHT));
  }, [applyTheme]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      focusInput();
    }
  }, [focusInput, isMinimized, isOpen]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setSessionTimestamp(new Date().toLocaleString());
    }
  }, [isMinimized, isOpen]);

  useEffect(() => {
    if (!outputRef.current) {
      return;
    }

    outputRef.current.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [lines]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "o") {
        event.preventDefault();
        openTerminal();
        return;
      }

      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        closeTerminal();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeTerminal, isOpen, openTerminal]);

  useEffect(() => {
    if (!(isOpen && !isMinimized)) {
      if (previousBodyOverflowRef.current !== null) {
        document.body.style.overflow = previousBodyOverflowRef.current;
        previousBodyOverflowRef.current = null;
      }
      return;
    }

    if (previousBodyOverflowRef.current === null) {
      previousBodyOverflowRef.current = document.body.style.overflow;
    }

    document.body.style.overflow = "hidden";

    return () => {
      if (previousBodyOverflowRef.current !== null) {
        document.body.style.overflow = previousBodyOverflowRef.current;
        previousBodyOverflowRef.current = null;
      }
    };
  }, [isMinimized, isOpen]);

  useEffect(() => {
    if (!matrixVisible) {
      return;
    }

    const canvas = matrixCanvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const chars = "01アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;
    let drops: number[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = Array.from({ length: Math.ceil(canvas.width / fontSize) }, () => Math.random() * -100);
    };

    const draw = () => {
      context.fillStyle = "rgba(0, 0, 0, 0.14)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#4ade80";
      context.font = `${fontSize}px ${terminalFont.style.fontFamily}, monospace`;

      drops.forEach((drop, index) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        context.fillText(text, index * fontSize, drop * fontSize);
        drops[index] = drop * fontSize > canvas.height && Math.random() > 0.975 ? 0 : drop + 1;
      });

      matrixFrameRef.current = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    context.fillStyle = "rgba(0, 0, 0, 1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    draw();

    const timeoutId = window.setTimeout(() => {
      if (matrixFrameRef.current) {
        window.cancelAnimationFrame(matrixFrameRef.current);
      }
      matrixFrameRef.current = null;
      setMatrixVisible(false);
    }, 3000);

    timeoutIdsRef.current.push(timeoutId);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (matrixFrameRef.current) {
        window.cancelAnimationFrame(matrixFrameRef.current);
      }
      matrixFrameRef.current = null;
    };
  }, [matrixVisible]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (dragStateRef.current && !isFullscreen) {
        const maxX = window.innerWidth - dimensions.width - 16;
        const maxY = window.innerHeight - dimensions.height - 16;

        setPosition({
          x: clamp(event.clientX - dragStateRef.current.offsetX, 16, Math.max(maxX, 16)),
          y: clamp(event.clientY - dragStateRef.current.offsetY, 16, Math.max(maxY, 16))
        });
      }

      if (resizeStateRef.current && !isFullscreen) {
        const nextWidth = resizeStateRef.current.startWidth + (event.clientX - resizeStateRef.current.startX);
        const nextHeight = resizeStateRef.current.startHeight + (event.clientY - resizeStateRef.current.startY);
        setDimensions({
          width: clamp(nextWidth, MIN_WIDTH, window.innerWidth - 32),
          height: clamp(nextHeight, MIN_HEIGHT, window.innerHeight - 32)
        });
      }
    };

    const handlePointerUp = () => {
      dragStateRef.current = null;
      resizeStateRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dimensions.height, dimensions.width, isFullscreen]);

  useEffect(() => {
    return () => {
      clearScheduledTasks();
      if (matrixFrameRef.current) {
        window.cancelAnimationFrame(matrixFrameRef.current);
      }
    };
  }, [clearScheduledTasks]);

  const terminalStyle = isFullscreen
    ? {
        width: "calc(100vw - 32px)",
        height: "calc(100vh - 32px)",
        left: 16,
        top: 16
      }
    : {
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        left: `${position.x}px`,
        top: `${position.y}px`
      };

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isFullscreen) {
      return;
    }

    dragStateRef.current = {
      offsetX: event.clientX - position.x,
      offsetY: event.clientY - position.y
    };
  };

  const startResize = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (isFullscreen) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    resizeStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      startWidth: dimensions.width,
      startHeight: dimensions.height
    };
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      const previousBounds = previousBoundsRef.current;
      setIsFullscreen(false);
      if (previousBounds) {
        setDimensions(previousBounds.dimensions);
        setPosition(previousBounds.position);
      }
      return;
    }

    previousBoundsRef.current = { position, dimensions };
    setIsFullscreen(true);
  };

  const handleHistoryNavigation = (direction: "up" | "down") => {
    if (!history.length) {
      return;
    }

    if (direction === "up") {
      if (historyIndex === null) {
        setDraftInput(input);
        setHistoryIndex(history.length - 1);
        setInput(history[history.length - 1]);
        return;
      }

      const nextIndex = Math.max(historyIndex - 1, 0);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
      return;
    }

    if (historyIndex === null) {
      return;
    }

    if (historyIndex >= history.length - 1) {
      setHistoryIndex(null);
      setInput(draftInput);
      return;
    }

    const nextIndex = historyIndex + 1;
    setHistoryIndex(nextIndex);
    setInput(history[nextIndex]);
  };

  const autocompleteCommand = () => {
    const normalizedInput = input.trim().toLowerCase();
    if (!normalizedInput) {
      return;
    }

    const exactMatch = commandSuggestions.find((command) => command === normalizedInput);
    if (exactMatch) {
      setInput(exactMatch);
      return;
    }

    const partialMatch = commandSuggestions.find((command) => command.startsWith(normalizedInput));
    if (partialMatch) {
      setInput(partialMatch);
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      event.preventDefault();
      appendLines([{ text: `> ${input}^C`, tone: "default" }], "command", 0);
      setInput("");
      setHistoryIndex(null);
      setDraftInput("");
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setInput("");
      setHistoryIndex(null);
      setDraftInput("");
      setLines([]);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      executeCommand(input);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      handleHistoryNavigation("up");
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      handleHistoryNavigation("down");
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      autocompleteCommand();
    }
  };

  return (
    <>
      <a ref={resumeAnchorRef} href="/resume.pdf" download className="hidden" aria-hidden="true">
        Download resume
      </a>

      <AnimatePresence>
        {matrixVisible ? (
          <motion.canvas
            ref={matrixCanvasRef}
            key="matrix-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none fixed inset-0 z-[95]"
          />
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={openTerminal}
        className={`fixed bottom-6 right-6 z-[70] hidden items-center rounded border border-[rgba(var(--accent-rgb),0.45)] bg-[#0d0d0d]/90 px-3 py-2 text-sm font-medium text-[var(--accent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.25)] transition hover:-translate-y-0.5 hover:bg-[rgba(var(--accent-rgb),0.08)] md:flex ${terminalFont.className}`}
      >
        ⌃O
      </button>

      <AnimatePresence>
        {isOpen && !isMinimized ? (
          <>
            <motion.button
              type="button"
              aria-label="Close terminal overlay"
              onClick={closeTerminal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[79] bg-black/70"
            />

            <motion.section
              key="terminal-window"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={terminalStyle}
              className={`${terminalFont.className} fixed z-[80] overflow-hidden rounded-[10px] border border-[#1e1e2e] bg-[#1e1e1e] shadow-[0_24px_90px_rgba(0,0,0,0.55)]`}
            >
              <div
                onPointerDown={startDrag}
                className="relative flex h-11 cursor-move items-center border-b border-[#1e1e2e] bg-[#2d2d2d] px-4"
              >
                <div className="group relative z-10 flex items-center gap-2">
                  <button
                    type="button"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={closeTerminal}
                    className="flex size-4 items-center justify-center rounded-full bg-[#ff5f57] text-[10px] leading-none text-[#1a1a1a] transition-all"
                    aria-label="Close terminal"
                  >
                    <span className="opacity-0 transition-opacity duration-150 group-hover:opacity-100">✕</span>
                  </button>
                  <button
                    type="button"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={() => setIsMinimized(true)}
                    className="flex size-4 items-center justify-center rounded-full bg-[#febc2e] text-[10px] leading-none text-[#1a1a1a] transition-all"
                    aria-label="Minimize terminal"
                  >
                    <span className="opacity-0 transition-opacity duration-150 group-hover:opacity-100">−</span>
                  </button>
                  <button
                    type="button"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={toggleFullscreen}
                    className="flex size-4 items-center justify-center rounded-full bg-[#28c840] text-[10px] leading-none text-[#1a1a1a] transition-all"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    <span className="opacity-0 transition-opacity duration-150 group-hover:opacity-100">{isFullscreen ? "+" : "⤢"}</span>
                  </button>
                </div>

                <p className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-xs text-[#808080]">
                  chandan@portfolio ~ terminal
                </p>
              </div>

              <div className="flex h-[calc(100%-2.75rem)] flex-col">
                <div
                  ref={outputRef}
                  className="terminal-body-scroll flex-1 cursor-text overflow-y-auto px-4 py-4 text-[13px] leading-[1.6] text-[#e0e0e0]"
                  onClick={() => inputRef.current?.focus()}
                  style={{ scrollbarWidth: "thin", scrollbarColor: "#555 #333" }}
                >
                  <p className="mb-3 text-[#808080]">Last login: {sessionTimestamp} on portfolio</p>
                  {lines.map((line) => (
                    <motion.p
                      key={line.id}
                      initial={{ opacity: line.kind === "output" ? 0 : 1, y: line.kind === "output" ? 6 : 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className={`whitespace-pre-wrap break-words ${
                        line.kind === "command" ? "text-[#00d4ff]" : lineToneClassName[line.tone ?? "default"]
                      }`}
                    >
                      {line.text || "\u00A0"}
                    </motion.p>
                  ))}

                  <div className="mt-1 flex min-h-6 items-center gap-2 whitespace-pre-wrap break-all">
                    <span className="text-[#00d4ff]">{">"}</span>
                    <div className="relative flex-1">
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={handleInputKeyDown}
                        spellCheck={false}
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        className="absolute inset-0 h-full w-full opacity-0"
                        aria-label="Terminal command input"
                      />
                      <div className="pointer-events-none flex min-h-6 items-center whitespace-pre-wrap break-all text-[#e0e0e0]">
                        <span>{input}</span>
                        <span className="ml-[1px] inline-block animate-[terminal-blink_0.5s_steps(1,end)_infinite] text-[#00d4ff]">█</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onPointerDown={startResize}
                className="absolute bottom-1 right-1 z-10 flex h-5 w-5 items-end justify-end text-[#6b7280] transition hover:text-[var(--accent)]"
                aria-label="Resize terminal"
              >
                <span className="block h-3 w-3 border-b border-r border-current" />
              </button>
            </motion.section>
          </>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && isMinimized ? (
          <motion.button
            key="terminal-minimized"
            type="button"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setIsMinimized(false)}
            className={`${terminalFont.className} fixed bottom-5 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-full border border-[#1e1e2e] bg-[#0d0d0d]/95 px-5 py-3 text-sm text-[#d4d4d8] shadow-[0_12px_40px_rgba(0,0,0,0.45)]`}
          >
            <span>chandan@portfolio ~</span>
            <span className="animate-[terminal-blink_1s_steps(1,end)_infinite] text-[var(--accent)]">█</span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <style jsx>{`
        .terminal-body-scroll::-webkit-scrollbar {
          width: 4px;
        }

        .terminal-body-scroll::-webkit-scrollbar-track {
          background: #333;
        }

        .terminal-body-scroll::-webkit-scrollbar-thumb {
          background: #555;
          border-radius: 999px;
        }
      `}</style>
    </>
  );
}
