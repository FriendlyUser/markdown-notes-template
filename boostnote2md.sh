#!/bin/bash

# Instructions:
# 1. Place this file in your Boostnote directory (the one with *.cson files);
# 2. Execute it specifying the output directory;
# 3. Enojoy.

# Synopsis: ./boostnote2md.sh <input directory> <output directory>
# Example:
#   $ mkdir out
#   $ ./boostnote2md.sh out

# Disclaimer:
# This script doesn't alter or delete your original Boostnote files.
# If for any reason you are unsure about it, take a backup :).
cd notes/
ls
outDir=$1

if [ ! -r "$outDir" ]; then
    (>&2 echo "The output directory is not readable.")
    exit 30
fi

if [ ! -d "$outDir" ]; then
    mkdir "$outDir"
fi

for fileName in `ls *.cson`; do
    # get note title
    title=`sed -n "/title/p" "$fileName" | head -1`
    title="${title:8:-1}"
    title=`echo $title | sed -r 's/[/:/"/^/*/</>/?/!/|///\]+/_/g'`

    # get the content
    content=`sed -n "/^content: '''$/,/^'''$/p" "$fileName"`
    content="${content:13:-4}"
    content=`echo "$content" | awk '{ print substr($0, 3) }'`
    
    # save it to file
    echo "$content" > "$outDir/$title.md"
done