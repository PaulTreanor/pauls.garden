## Setting up EC2 server
1. Go to AWS Console > EC2 > Launch Instance
2. Configure the instance:
   - Name: your-project-name
   - AMI: Amazon Linux 2023
   - Instance type: t2.micro
   - Key pair: Create new - this will download a `pem` file
   - Default network settings should be fine
3. Launch instance

4. Important: Note down these details
   - Public IPv4 address
   - Public IPv4 DNS
   - Instance ID

## Connecting to your server
```bash
ssh -i path/to/your-key.pem ec2-user@your-public-ip
```

## Configuring your server
```bash 
sudo yum update -y 
sudo yum install -y docker git

# Start and enable Docker 
sudo systemctl start docker 
sudo systemctl enable docker

# Add your user to docker group 
sudo usermod -aG docker ${USER} 
# Log out and back in for this to take effect

# Install Docker Compose v2 
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose 
sudo chmod +x /usr/local/bin/docker-compose

cd ~
git clone https://github.com/PaulTreanor/pauls.garden.git
cd pauls.garden/
```

## Run Caddy and Memos services
```bash
docker-compose up -d
```


## DNS records
Add these DNS records in your domain provider's dashboard:
- Type: A Record
- Name: @ (or subdomain) (or just leave it blank)
- Value: Your-EC2-Public-IP
- TTL: 3600 (or default)