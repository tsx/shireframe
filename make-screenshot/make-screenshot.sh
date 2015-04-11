#!/bin/bash -e
if [ -z "$2" ]
then
	echo "Usage: $0 http://example.com image.png"
	exit 1
fi
echo "Rendering page.."
phantomjs --disk-cache=true --local-to-remote-url-access=true --web-security=false "`dirname $0`"/make-screenshot.js $1 /tmp/r.png
echo "Applying distortion filter..."
convert /tmp/r.png \( +clone -channel G +noise Random -virtual-pixel Tile -blur 0x15 -auto-level -separate +channel \) -swap 0,1 -resize 70% miff:- | composite - -displace 4 /tmp/r.jpg
mv /tmp/r.jpg "$2"
