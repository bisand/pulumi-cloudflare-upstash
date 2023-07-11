#!/bin/sh

# Load environment variables from .env file
. ./.env

pulumi config set cloudflare:apiToken \"$CLOUDFLARE_API_TOKEN\" --secret --stack blog --emoji
pulumi config set cloudflare:accountId \"$CLOUDFLARE_ACCOUNT_ID\" --stack blog

pulumi up --stack blog --yes
