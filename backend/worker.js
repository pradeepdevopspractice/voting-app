const redis = require('redis');
const { Client } = require('pg');

// Connects to PostgreSQL using K8s internal DNS hostname 'db'
const pgClient = new Client({ host: 'db', user: 'postgres', password: 'password123', database: 'postgres' });
const redisClient = redis.createClient({ url: 'redis://redis:6379' });

async function init() {
  await pgClient.connect();
  await redisClient.connect();
  await pgClient.query('CREATE TABLE IF NOT EXISTS votes (id SERIAL PRIMARY KEY, vote TEXT)');
  console.log("Worker connected to DB and Redis. Processing votes...");
  
  while (true) {
    const vote = await redisClient.blPop('votes', 0); // Blocking pop from Redis queue
    if (vote) {
      await pgClient.query('INSERT INTO votes (vote) VALUES ($1)', [vote.element]);
      console.log(`Saved vote: ${vote.element}`);
    }
  }
}
init().catch(console.error);