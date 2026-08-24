#!/bin/sh
set -e

# Gera um arquivo JS com as variáveis de ambiente do container/pod,
# para o frontend ler em runtime (window._env_) em vez de tempo de build.
cat <<EOF > /usr/share/nginx/html/env-config.js
window._env_ = {
  VITE_API_URL: "${VITE_API_URL}"
};
EOF

echo "env-config.js gerado com sucesso:"
cat /usr/share/nginx/html/env-config.js

# Inicia o Nginx normalmente
exec nginx -g "daemon off;"
