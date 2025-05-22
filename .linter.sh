#!/bin/bash
cd /home/kavia/workspace/code-generation/medtrack-mobile-7035-7040/medtrack_mobile
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

