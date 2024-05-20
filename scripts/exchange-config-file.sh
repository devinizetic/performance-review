#!/bin/bash

# get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# get both config files paths
DEV_CONF_FILE="$SCRIPT_DIR/config.toml"
PROD_CONF_FILE="$SCRIPT_DIR/../supabase/config.toml" 

# check if them exists
if [ -f "$DEV_CONF_FILE" ] && [ -f "$PROD_CONF_FILE" ]; then
    # exchange the files
    cp "$PROD_CONF_FILE" "$DEV_CONF_FILE.tmp"
    cp "$DEV_CONF_FILE" "$PROD_CONF_FILE.tmp" 
    mv "$DEV_CONF_FILE.tmp" "$DEV_CONF_FILE"
    mv "$PROD_CONF_FILE.tmp" "$PROD_CONF_FILE"
    echo "Files exchanged successfully."
else
    echo "Error! Files not found."
fi
