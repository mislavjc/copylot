# Copylot

Introducing Copylot, a prototype for A/B testing content generation utilizing AI. This project was developed as part of my bachelor's thesis.

## Tech Stack

**Frontend:** Next.js, TailwindCSS, shadcn/ui, visx

**Databases:** Clickhouse, PlanetScale, Upstash Redis

**Libraries:** React Email, Next Auth, Prisma, Zod, Vercel AI

## Some of the features

<h4 align="center">GDPR-compliant analytics tracking</h4>

![Screenshot of analytics dashboard](public/@index/stats.webp)

<h4 align="center">A/B testing content generation</h4>

![Screenshot of A/B testing dashboard](public/@index/variations.webp)

<h4 align="center">Chatting with experiments using AI</h4>

![Screenshot of chat with experiment](public/@index/chat.webp)

## Run Locally

To set up and run Copylot locally, follow these steps:

1. **Clone the Project**

   ```bash
   git clone https://github.com/mislavjc/copylot.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd copylot
   ```

3. **Install Dependencies**

   ```bash
   pnpm install
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   ```

## Environment Variables

To run this project, you'll need to add the following environment variables to your .env file:

### ClickHouse

- `CLICKHOUSE_HOST`
- `CLICKHOUSE_USER`
- `CLICKHOUSE_PASSWORD`

### UpStash Redis

- `REDIS_URL`
- `UPSTASH_URL`
- `UPSTASH_TOKEN`

### Turso

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`

### Authentication

- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `GOOGLE_ID`
- `GOOGLE_SECRET`

### Email (AWS SES)

- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM`
- `AWS_SES_REGION`

### OpenAI

- `OPENAI_API_KEY`
