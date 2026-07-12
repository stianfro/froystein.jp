# Build stage
FROM oven/bun:1.3.14-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Validate and build the application
RUN bun run lint && bun run build && bun run test

# Production stage
FROM nginx:1.27-alpine

# Copy custom nginx config for static routing
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    absolute_redirect off;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/markdown text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # Serve clean Markdown mirrors for llms.txt consumers without indexing duplicates
    location ~* \.md$ {
        types { text/markdown md; }
        charset utf-8;
        charset_types text/markdown;
        add_header X-Robots-Tag "noindex, follow";
        try_files \$uri =404;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Serve only generated static routes and return a real 404 otherwise
    error_page 404 /404.html;

    location = /404.html {
        internal;
    }

    location / {
        try_files \$uri \$uri/ =404;
    }

    # Health check endpoint
    location /healthz {
        return 200 'ok';
        add_header Content-Type text/plain;
    }
}
EOF

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Run as non-root user
RUN sed -i 's|pid.*;|pid /tmp/nginx.pid;|' /etc/nginx/nginx.conf && \
    chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/run /tmp && \
    chmod -R 755 /usr/share/nginx/html

USER nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
