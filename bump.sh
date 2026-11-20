#!/bin/sh
# 배포 전에 실행: 모든 페이지의 버전 표시를 새로 바꿉니다. (예: sh bump.sh)
B=$(date +%Y%m%d%H%M%S)
sed -i.bak "s/name=\"site-build\" content=\"[^\"]*\"/name=\"site-build\" content=\"$B\"/" *.html && rm -f *.html.bak
echo "site-build: $B"
