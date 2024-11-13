# 🌿🌲 pauls.garden infrastructure 🌳🌱

This is the infrastructure behind hosting my [Memos](https://usememos.com) powered digital garden. 

[Instructions for running this with EC2 and Caddy reverse proxy.](./docs/setup-server.md)

## Deploying updated code on the server
This repo has no CICD so changes must be deployed manually.

```bash
# Make your code changes
# git commit and git push the changes

# Start ssh session
ssh -i key-pair-file.pem ec2-user@<your.ip.address>

# Within ssh session...
cd pauls.garden 
git pull 

# Then run your changes
```

## Running docker changes on the server 
```bash
cd pauls.garden/server
git pull
docker-compose down 
docker-compose up -d
```

## Updating server OS
```bash
sudo yum update -y 
```

## Actions
 