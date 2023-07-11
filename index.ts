import * as cloudflare from "@pulumi/cloudflare";
import * as fs from "fs";
import * as dotenv from 'dotenv';

dotenv.config();

const workerCode = fs.readFileSync(__dirname + "/worker.js", {
  encoding: "utf-8",
});

const blogScript = new cloudflare.WorkerScript("blog-api", {
  name: "blog-api",
  content: workerCode,
  plainTextBindings: [{ name: "DB_URL", text: process.env.UPSTASH_DB_URL as string }],
  secretTextBindings: [{ name: "DB_TOKEN", text: process.env.UPSTASH_DB_TOKEN as string }],
});

new cloudflare.WorkerRoute("blog-route", {
  zoneId: process.env.CLOUDFLARE_ZONE_ID as string,
  pattern: process.env.CLOUDFLARE_WORKER_ROUTE_PATTERN as string,
  scriptName: blogScript.name,
});
