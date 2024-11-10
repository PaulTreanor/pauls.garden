# 🌿🌲 pauls.garden infrastructure 🌳🌱

This is the infrastructure behind hosting my [Memos](https://usememos.com) powered digital garden. 


```txt
memos-infrastructure/
├── README.md
├── server/
│   ├── docker-compose.yml
│   ├── nginx/
│   │   └── conf.d/
│   │       └── memos.conf
│   └── backup/
│       └── backup.py
└── serverless/
    ├── serverless.yml
    ├── package.json
    └── .gitignore

```

## Architecture Plan
- EC2 t2.mico host
- Nginx as reverse proxy (port 80/443) → Memos (port 5230)
- Let's Encrypt SSL for pauls.garden
- Python backup script to S3


## Architecture Diagram 


## Actions

- updating all garden dependencies (nginx, memos, serverless framework) 