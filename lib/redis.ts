import { Redis } from "@upstash/redis"

// Check for required environment variables before initializing
if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.error('⚠️  Redis environment variables missing!')
    console.error('Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN')
}

export const redis = Redis.fromEnv()