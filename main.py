"""
SkateHubba™ – Replit Entrypoint (2025)
This file is only here because Replit requires a main.py
It launches the real monorepo via pnpm
"""

import os
import subprocess
import sys
from pathlib import Path

def main():
    print("SkateHubba™ – Starting the revolution...")
    print("One shot. Own it.\n")

    repo_root = Path(__file__).parent.resolve()
    
    # Change to project root
    os.chdir(repo_root)
    
    # Install dependencies (first run)
    if not (repo_root / "node_modules").exists():
        print("Installing dependencies...")
        subprocess.run(["pnpm", "install"], check=True)
    
    # Start both mobile + web in parallel
    print("Launching Mobile (Expo) + Web (Next.js)...")
    print("Mobile → Expo QR code")
    print("Web → https://your-repl.replit.app")
    
    # This runs both apps simultaneously
    subprocess.run([
        "pnpm", "dev"
    ], cwd=repo_root)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nSkateHubba™ stopped. Keep pushing.")
        sys.exit(0)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)
