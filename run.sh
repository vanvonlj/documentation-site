#!/bin/bash
# Helper script to run npm commands with the correct Node version

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Run the command passed as arguments
exec "$@"
