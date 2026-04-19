#!/usr/bin/env python3
"""
Chrono — A general-purpose AI agent by ChronigenAI.

Tools: execute_code · shell_command · read_file · write_file
       list_files · calculate · search_web

Usage:
    ANTHROPIC_API_KEY=sk-ant-... python solver.py
    ANTHROPIC_API_KEY=sk-ant-... python solver.py --model sonnet
    ANTHROPIC_API_KEY=sk-ant-... python solver.py --model haiku
"""

import os
import sys
import math
import subprocess
import tempfile
import argparse
import time
from pathlib import Path

import anthropic
from rich.console import Console
from rich.panel import Panel
from rich.markdown import Markdown

console = Console()

# ── Models ────────────────────────────────────────────────────────────────────

MODELS = {
    "opus":   "claude-opus-4-6",
    "sonnet": "claude-sonnet-4-6",
    "haiku":  "claude-haiku-4-5-20251001",
}

# ── System prompt ─────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are Chrono, a highly capable AI agent specializing in coding, debugging, and complex problem solving.

Capabilities via tools:
- Execute Python code for algorithms, data analysis, visualization, simulations
- Run shell commands for system operations
- Read and write files (code, data, reports)
- Search the web for current information
- Perform precise mathematical calculations
- List directory contents
- Lint code to detect syntax errors, style issues, and potential bugs
- Run tests with pytest and report results
- Format code to PEP 8 standard using black

Bug-fixing approach:
1. Read the code and understand what it's supposed to do
2. Use lint_code to catch syntax/style errors immediately
3. Execute the code to reproduce the error — see the actual traceback
4. Identify the root cause (off-by-one, type mismatch, logic error, missing import, etc.)
5. Apply a minimal, targeted fix
6. Re-run to confirm the bug is gone
7. Run tests if available to check for regressions

Coding approach:
1. Understand requirements fully before writing
2. Write clean, readable code with good naming
3. Test the code immediately after writing
4. Handle edge cases and errors
5. Explain what the code does and why

Domains you handle well:
- Debugging Python, JavaScript, TypeScript, Java, C/C++, Go, Rust, and more
- Writing functions, classes, scripts, APIs, and CLI tools
- Code review — finding bugs, performance issues, security flaws
- Algorithm design and complexity analysis
- Data analysis (CSV/JSON processing, statistics, pandas)
- Mathematics (algebra, calculus, statistics, linear algebra)
- Research (web search, documentation lookup)

Be thorough, accurate, and show your reasoning. Always verify fixes by running code."""

# ── Tool implementations ──────────────────────────────────────────────────────

def execute_code(code: str, language: str = "python") -> str:
    if language.lower() != "python":
        return f"Only Python is supported (got '{language}')."
    try:
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".py", delete=False, encoding="utf-8"
        ) as f:
            f.write(code)
            tmp = f.name
        result = subprocess.run(
            [sys.executable, tmp],
            capture_output=True, text=True, timeout=60,
        )
        os.unlink(tmp)
        parts = []
        if result.stdout.strip():
            parts.append(f"Output:\n{result.stdout.rstrip()}")
        if result.stderr.strip():
            parts.append(f"Stderr:\n{result.stderr.rstrip()}")
        if result.returncode != 0:
            parts.append(f"Exit code: {result.returncode}")
        return "\n\n".join(parts) if parts else "(no output)"
    except subprocess.TimeoutExpired:
        return "Error: timed out after 60 seconds."
    except Exception as e:
        return f"Error: {e}"


def shell_command(command: str) -> str:
    try:
        result = subprocess.run(
            command, shell=True, capture_output=True, text=True, timeout=30,
        )
        out = (result.stdout + result.stderr).strip()
        return out or "(no output)"
    except subprocess.TimeoutExpired:
        return "Error: timed out after 30 seconds."
    except Exception as e:
        return f"Error: {e}"


def read_file(path: str) -> str:
    try:
        content = Path(path).read_text(encoding="utf-8")
        return content or "(empty file)"
    except FileNotFoundError:
        return f"Error: file not found: {path}"
    except Exception as e:
        return f"Error: {e}"


def write_file(path: str, content: str) -> str:
    try:
        p = Path(path)
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(content, encoding="utf-8")
        return f"Wrote {len(content):,} characters to {path}"
    except Exception as e:
        return f"Error: {e}"


def list_files(directory: str = ".") -> str:
    try:
        p = Path(directory)
        if not p.exists():
            return f"Error: directory not found: {directory}"
        lines = []
        for item in sorted(p.iterdir()):
            tag = "DIR " if item.is_dir() else "FILE"
            size = "" if item.is_dir() else f"  {item.stat().st_size:,} bytes"
            lines.append(f"[{tag}] {item.name}{size}")
        return "\n".join(lines) or "(empty directory)"
    except Exception as e:
        return f"Error: {e}"


def calculate(expression: str) -> str:
    try:
        safe_ns = {k: getattr(math, k) for k in dir(math) if not k.startswith("_")}
        safe_ns.update({
            "abs": abs, "round": round, "min": min, "max": max,
            "sum": sum, "pow": pow, "int": int, "float": float,
            "str": str, "len": len, "list": list, "range": range,
        })
        result = eval(expression, {"__builtins__": {}}, safe_ns)
        return str(result)
    except Exception as e:
        return f"Error: {e}"


def lint_code(code: str, path: str = "") -> str:
    """Check code for syntax errors and style issues using ast + pyflakes/ruff."""
    results = []

    # 1. Syntax check via ast (always available)
    try:
        import ast
        ast.parse(code)
        results.append("✔ Syntax OK")
    except SyntaxError as e:
        results.append(f"✘ SyntaxError at line {e.lineno}: {e.msg}")
        results.append(f"  → {e.text.rstrip() if e.text else ''}")
        return "\n".join(results)

    # 2. Write to temp file for linters
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".py", delete=False, encoding="utf-8"
    ) as f:
        f.write(code)
        tmp = f.name

    try:
        # Try ruff first (fast, modern)
        r = subprocess.run(
            ["ruff", "check", "--select=E,F,W", tmp],
            capture_output=True, text=True, timeout=15,
        )
        if r.returncode == 0:
            results.append("✔ ruff: no issues found")
        else:
            for ln in r.stdout.strip().splitlines():
                results.append(ln.replace(tmp, path or "<code>"))
    except FileNotFoundError:
        # Fall back to pyflakes
        try:
            r = subprocess.run(
                [sys.executable, "-m", "pyflakes", tmp],
                capture_output=True, text=True, timeout=15,
            )
            out = (r.stdout + r.stderr).strip()
            if out:
                for ln in out.splitlines():
                    results.append(ln.replace(tmp, path or "<code>"))
            else:
                results.append("✔ pyflakes: no issues found")
        except Exception:
            results.append("(ruff and pyflakes not available — only syntax checked)")
    finally:
        os.unlink(tmp)

    return "\n".join(results)


def run_tests(path: str = ".", extra_args: str = "") -> str:
    """Run pytest on a file or directory and return the result."""
    cmd = f"{sys.executable} -m pytest {path} -v --tb=short {extra_args}"
    try:
        result = subprocess.run(
            cmd, shell=True, capture_output=True, text=True, timeout=120,
        )
        out = (result.stdout + result.stderr).strip()
        return out or "(no output from pytest)"
    except subprocess.TimeoutExpired:
        return "Error: tests timed out after 120 seconds."
    except Exception as e:
        return f"Error: {e}"


def format_code(code: str) -> str:
    """Format Python code using black. Returns formatted code or error."""
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".py", delete=False, encoding="utf-8"
    ) as f:
        f.write(code)
        tmp = f.name
    try:
        r = subprocess.run(
            [sys.executable, "-m", "black", "--quiet", tmp],
            capture_output=True, text=True, timeout=15,
        )
        if r.returncode == 0:
            formatted = Path(tmp).read_text(encoding="utf-8")
            return formatted
        else:
            return f"black error:\n{r.stderr.strip()}"
    except Exception as e:
        return f"Error: {e} (install black: pip install black)"
    finally:
        os.unlink(tmp)


def search_web(query: str, max_results: int = 5) -> str:
    try:
        from duckduckgo_search import DDGS
        with DDGS() as ddgs:
            hits = list(ddgs.text(query, max_results=max_results))
        if not hits:
            return "No results found."
        lines = []
        for i, h in enumerate(hits, 1):
            title = h.get("title", "No title")
            url = h.get("href", "")
            body = h.get("body", "")[:400]
            lines.append(f"{i}. {title}\n   {url}\n   {body}\n")
        return "\n".join(lines)
    except ImportError:
        return "Web search unavailable. Install: pip install duckduckgo-search"
    except Exception as e:
        return f"Search error: {e}"


# ── Tool registry + schemas ───────────────────────────────────────────────────

TOOL_FNS: dict = {
    "execute_code": execute_code,
    "shell_command": shell_command,
    "read_file":    read_file,
    "write_file":   write_file,
    "list_files":   list_files,
    "calculate":    calculate,
    "search_web":   search_web,
    "lint_code":    lint_code,
    "run_tests":    run_tests,
    "format_code":  format_code,
}

TOOLS = [
    {
        "name": "execute_code",
        "description": (
            "Execute Python code and capture stdout/stderr. Use for algorithms, data "
            "processing, math verification, file parsing, plotting, and simulations. "
            "Code runs in an isolated subprocess with a 60-second timeout."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "code":     {"type": "string", "description": "Python code to execute"},
                "language": {"type": "string", "description": "Language — only 'python' supported", "default": "python"},
            },
            "required": ["code"],
        },
    },
    {
        "name": "shell_command",
        "description": "Run a shell command and return its combined stdout+stderr output.",
        "input_schema": {
            "type": "object",
            "properties": {
                "command": {"type": "string", "description": "Shell command to run"},
            },
            "required": ["command"],
        },
    },
    {
        "name": "read_file",
        "description": "Read the full text content of a file by path.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path": {"type": "string", "description": "File path to read"},
            },
            "required": ["path"],
        },
    },
    {
        "name": "write_file",
        "description": "Write text to a file. Parent directories are created automatically.",
        "input_schema": {
            "type": "object",
            "properties": {
                "path":    {"type": "string", "description": "File path to write"},
                "content": {"type": "string", "description": "Text content to write"},
            },
            "required": ["path", "content"],
        },
    },
    {
        "name": "list_files",
        "description": "List files and subdirectories in a given directory.",
        "input_schema": {
            "type": "object",
            "properties": {
                "directory": {"type": "string", "description": "Directory path (default: current dir)"},
            },
            "required": [],
        },
    },
    {
        "name": "calculate",
        "description": (
            "Evaluate a safe mathematical expression using Python's math module. "
            "Examples: 'sqrt(144)', 'factorial(20)', 'log(1000, 10)', 'pi * 3**2', "
            "'sin(radians(45))'. For complex calculations prefer execute_code."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {"type": "string", "description": "Math expression to evaluate"},
            },
            "required": ["expression"],
        },
    },
    {
        "name": "search_web",
        "description": (
            "Search the web using DuckDuckGo. Returns titles, URLs, and text snippets. "
            "Use for current events, facts, documentation, research."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "query":       {"type": "string",  "description": "Search query"},
                "max_results": {"type": "integer", "description": "Number of results (1–10)", "default": 5},
            },
            "required": ["query"],
        },
    },
    {
        "name": "lint_code",
        "description": (
            "Check Python code for syntax errors, undefined names, unused imports, "
            "and style issues using ast + ruff or pyflakes. Always run this before "
            "executing unfamiliar or user-provided code."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "code": {"type": "string", "description": "Python source code to lint"},
                "path": {"type": "string", "description": "Optional display path for error messages"},
            },
            "required": ["code"],
        },
    },
    {
        "name": "run_tests",
        "description": (
            "Run pytest on a file or directory and return the full test output. "
            "Use after fixing a bug to confirm nothing is broken."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "path":       {"type": "string", "description": "File or directory to test (default: current dir)"},
                "extra_args": {"type": "string", "description": "Extra pytest args, e.g. '-k test_name --no-header'"},
            },
            "required": [],
        },
    },
    {
        "name": "format_code",
        "description": (
            "Format Python code with black (PEP 8 compliant). "
            "Returns the formatted source. Use to clean up code before saving."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "code": {"type": "string", "description": "Python source code to format"},
            },
            "required": ["code"],
        },
    },
]

# ── Display helpers ───────────────────────────────────────────────────────────

ICONS = {
    "execute_code":  "⚙",
    "shell_command": "$",
    "read_file":     "📄",
    "write_file":    "✏",
    "list_files":    "📁",
    "calculate":     "🔢",
    "search_web":    "🔍",
    "lint_code":     "🔎",
    "run_tests":     "🧪",
    "format_code":   "✨",
}


def _truncate(s: str, n: int = 80) -> str:
    return s[:n] + "…" if len(s) > n else s


def show_tool_call(name: str, inputs: dict) -> None:
    icon = ICONS.get(name, "🔧")
    first_val = _truncate(str(list(inputs.values())[0])) if inputs else ""
    console.print(f"  [dim]{icon} [bold]{name}[/bold]([/dim][cyan]{first_val}[/cyan][dim])[/dim]")


def show_tool_result(result: str) -> None:
    lines = result.strip().splitlines()
    preview = lines[:6]
    if len(lines) > 6:
        preview.append(f"  … ({len(lines) - 6} more lines)")
    for ln in preview:
        console.print(f"  [dim]│[/dim] {ln}")



# ── Agent loop (streaming) ────────────────────────────────────────────────────

def run_agent(
    client: anthropic.Anthropic,
    messages: list,
    model: str,
) -> tuple[str, int, int]:
    """
    Drive one complete agentic turn with real-time streaming.
    Text tokens appear as they are generated. Tool calls execute between turns.
    Returns (final_answer_text, total_input_tokens, total_output_tokens).
    """
    total_in = total_out = 0
    full_answer = ""

    while True:
        turn_text = ""

        console.print()
        console.print("[bold bright_green]Chrono[/bold bright_green] [dim]▸[/dim] ", end="")

        with client.messages.stream(
            model=model,
            max_tokens=8192,
            system=SYSTEM_PROMPT,
            tools=TOOLS,
            messages=messages,
        ) as stream:
            for event in stream:
                if (
                    hasattr(event, "type")
                    and event.type == "content_block_delta"
                    and hasattr(event, "delta")
                    and getattr(event.delta, "type", "") == "text_delta"
                ):
                    chunk = event.delta.text
                    console.print(chunk, end="")
                    turn_text += chunk

            final = stream.get_final_message()

        total_in  += final.usage.input_tokens
        total_out += final.usage.output_tokens
        console.print()  # newline after streamed text

        if final.stop_reason == "end_turn":
            full_answer = turn_text or next(
                (b.text for b in final.content if hasattr(b, "text")), "(no response)"
            )
            return full_answer, total_in, total_out

        if final.stop_reason == "tool_use":
            console.print()
            tool_results = []
            for block in final.content:
                if block.type == "tool_use":
                    show_tool_call(block.name, block.input)
                    fn = TOOL_FNS.get(block.name)
                    result = fn(**block.input) if fn else f"Unknown tool: {block.name}"
                    show_tool_result(result)
                    tool_results.append({
                        "type":        "tool_result",
                        "tool_use_id": block.id,
                        "content":     result,
                    })
            messages.append({"role": "assistant", "content": final.content})
            messages.append({"role": "user",      "content": tool_results})
        else:
            full_answer = turn_text or f"(stopped: {final.stop_reason})"
            return full_answer, total_in, total_out


# ── REPL ──────────────────────────────────────────────────────────────────────

HELP_TEXT = """
**Commands**

| Command      | Action                                    |
|--------------|-------------------------------------------|
| `/clear`     | Reset conversation history                |
| `/save`      | Save session to a Markdown file           |
| `/history`   | Show conversation summary                 |
| `/tools`     | List available tools                      |
| `/model`     | Show current model                        |
| `/help`      | Show this help                            |
| `exit`       | Quit                                      |

**Code & Bug Fix examples**

- *"Here's my Python code — find and fix the bug: [paste code]"*
- *"Lint this code and fix all issues: [paste code]"*
- *"Write a binary search function, test it, fix any bugs"*
- *"Read main.py and find any potential runtime errors"*
- *"Run the tests in test_app.py and fix any failures"*

**General examples**

- *"Solve the quadratic equation 3x² - 7x + 2 = 0"*
- *"What is the latest version of Python? Search the web."*
- *"Create a CSV with 5 employees and compute average salary"*
"""


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Chrono — a general-purpose AI agent by ChronigenAI"
    )
    parser.add_argument(
        "--model",
        default="sonnet",
        choices=list(MODELS.keys()),
        help="Model to use: sonnet (default), opus, haiku",
    )
    args = parser.parse_args()

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        console.print("[red]Error:[/red] Set ANTHROPIC_API_KEY before running.")
        sys.exit(1)

    model      = MODELS[args.model]
    client     = anthropic.Anthropic(api_key=api_key)
    messages   : list = []
    session_in = session_out = turns = 0

    console.print(Panel(
        f"[bold cyan]Chrono[/bold cyan] [dim]by ChronigenAI[/dim]\n"
        f"[dim]General-purpose AI agent · model: {model}[/dim]\n\n"
        f"[dim]Tools: execute_code · lint · run_tests · format · shell · read/write · calculate · search_web[/dim]\n"
        f"[dim]Responses stream in real-time  ·  /help for commands  ·  Ctrl+C to quit[/dim]",
        border_style="cyan",
        padding=(1, 2),
    ))

    try:
        while True:
            console.print()
            try:
                user_input = console.input("[bold blue]You:[/bold blue] ").strip()
            except EOFError:
                break

            if not user_input:
                continue

            # Built-in commands
            cmd = user_input.lower()
            if cmd in {"exit", "quit", "bye"}:
                break

            if cmd == "/clear":
                messages.clear()
                session_in = session_out = turns = 0
                console.print("[dim]Conversation cleared.[/dim]")
                continue

            if cmd == "/help":
                console.print(Panel(Markdown(HELP_TEXT), border_style="dim", padding=(1, 2)))
                continue

            if cmd == "/model":
                console.print(f"[dim]Model: {model}[/dim]")
                continue

            if cmd == "/tools":
                rows = "\n".join(
                    f"- **{t['name']}** — {t['description'][:70]}…"
                    for t in TOOLS
                )
                console.print(Panel(Markdown(rows), title="Tools", border_style="dim", padding=(1, 2)))
                continue

            if cmd == "/save":
                filename = f"chrono_{int(time.time())}.md"
                lines = ["# Chrono Session\n"]
                for m in messages:
                    role = "**You**" if m["role"] == "user" else "**Chrono**"
                    content = m["content"] if isinstance(m["content"], str) else "(tool interaction)"
                    lines.append(f"### {role}\n{content}\n")
                Path(filename).write_text("\n".join(lines), encoding="utf-8")
                console.print(f"[dim]Session saved → {filename}[/dim]")
                continue

            if cmd == "/history":
                if not messages:
                    console.print("[dim]No history yet.[/dim]")
                else:
                    for m in messages:
                        if not isinstance(m["content"], str):
                            continue
                        color = "blue" if m["role"] == "user" else "bright_green"
                        label = "You" if m["role"] == "user" else "Chrono"
                        preview = m["content"][:180]
                        if len(m["content"]) > 180:
                            preview += "…"
                        console.print(f"[{color}]{label}:[/{color}] {preview}")
                continue

            messages.append({"role": "user", "content": user_input})

            answer, in_tok, out_tok = run_agent(client, messages, model)
            messages.append({"role": "assistant", "content": answer})

            turns      += 1
            session_in  += in_tok
            session_out += out_tok
            console.print(
                f"\n[dim]  tokens: {in_tok:,} in / {out_tok:,} out "
                f"· session total: {session_in:,} / {session_out:,}[/dim]"
            )

    except KeyboardInterrupt:
        pass

    console.print(
        f"\n[dim]Chrono session ended · {turns} turn(s) · "
        f"{session_in:,} input / {session_out:,} output tokens[/dim]"
    )


if __name__ == "__main__":
    main()
