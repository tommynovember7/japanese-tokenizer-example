#!/usr/bin/env bash
set -euo pipefail

USER_DICT="/project/config/kuromoji/user-dic.csv"
COPIED_DICT="/kuromoji/node_modules/mecab-ipadic-seed/lib/dict/user-dic.csv"

if [[ $# -eq 0 ]]; then
    cd /kuromoji && \
    echo "Current: $(pwd)" && \
    if [ ! -e $USER_DICT ];then
        echo "User dictionary file not exists."
        exit 1
    fi
    echo "Preparing user dictionary..." && \
    cp $USER_DICT /kuromoji/node_modules/mecab-ipadic-seed/lib/dict/ && \
    if [ ! -e $COPIED_DICT ];then
        echo "User dictionary file not copied."
        exit 1
    fi
    ls ${COPIED_DICT} && \
    echo "Running 'npm run build-dict'..." && \
    /usr/local/bin/npm run build-dict && \
    echo "Copying newly generated dictionaries..." && \
    cp -R /kuromoji/dict/* /project/dict/ && \
    ls -la /project/dict/ && \
    echo "Fin."
fi

exec "$@"
