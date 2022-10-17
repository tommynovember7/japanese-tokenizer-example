#!/usr/bin/env bash
set -euo pipefail

DICT_DEST="/kuromoji/node_modules/mecab-ipadic-seed/lib/dict/user-dic.csv"

if [[ $# -eq 0 ]]; then
    cd /kuromoji && \
    echo "Current: $(pwd)" && \
    echo "SRC: ${DICT_SRC}" && \
    if [ ! -e ${DICT_SRC} ];then
        echo "[ERROR] User dictionary file not found."
        exit 1
    fi
    echo "Preparing user dictionary source..." && \
    cp ${DICT_SRC} /kuromoji/node_modules/mecab-ipadic-seed/lib/dict/user-dic.csv && \
    if [ ! -e ${DICT_DEST} ];then
        echo "[ERROR] Failed to copy the user dictionary file."
        exit 1
    fi
    ls ${DICT_DEST} && \
    echo "Running 'npm run build-dict'..." && \
    /usr/local/bin/npm run build-dict && \
    echo "Copying newly generated dictionaries..." && \
    cp -R /kuromoji/dict/* /project/dict/ && \
    ls -la /project/dict/ && \
    echo "Fin."
fi

exec "$@"
