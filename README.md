# 🤖 AI Auto Update Bot - Indian Stock Market Analysis

Complete AI-powered Telegram bot for automated Indian stock market analysis with 5 scheduled tasks. Built for 24/7 operation with real-time NSE/BSE data integration.

## 🚀 System Check Message

When properly configured, the bot will post this system check message:

```
🔍 AI AUTO UPDATE BOT - SYSTEM CHECK COMPLETE

✅ Connection Status: ONLINE
✅ Bot Token: Verified
✅ Channel ID: Configured  
✅ OpenAI Engine: Active

📅 Scheduled Tasks (IST - Asia/Kolkata):

1️⃣ 08:45 AM | ☀️ Pre-Market News
• Real-time NSE/BSE market sentiment
• Global cues & FII/DII data
• Key events for the day

2️⃣ 10:00 AM | 📊 AI Swing Trade Signal  
• 90% Accuracy Target with:
• Multi-timeframe analysis (5m/15m/1h/Daily)
• Technical indicators: RSI, MACD, EMA/SMA
• Support/Resistance levels
• Real-time NSE data integration
• Risk-Reward: Minimum 1:3
• Entry, Stop Loss, Target 1 & 2
• Volume & momentum confirmation

3️⃣ 12:00 PM | 🏗️ Fundamental Stock Pick
• Long-term investment (3-5 years)
• Fundamental analysis  
• Sector trends
• Valuation metrics

4️⃣ Every 15 Minutes | 🔔 Market Updates
• Active: 9:15 AM - 3:30 PM
• Real-time sentiment tracking
• Quick market pulse

5️⃣ 04:30 PM | 🏁 Post-Market Analysis
• Day's performance summary
• Sector winners/losers  
• Roadmap for next trading day
• Key levels to watch

🛡️ System Features:
• 24/7 Uptime Monitoring
• Auto-recovery on failures
• Health checks every 5 minutes  
• Error logging & alerts
• Retry mechanism for failed posts

🧠 AI Engine: GPT-4 (OpenAI)
📊 Data Sources: NSE, BSE, MCX Real-time
🎯 Accuracy Goal: 90%+ for swing trades

⚠️ Risk Disclaimer:
All signals are AI-generated for educational purposes. Trade at your own risk with proper position sizing.

🚀 Powered by: Savan Mcare | AI Advisory

✨ Bot is now LIVE and monitoring markets!
```

## 📋 Features

### 🎯 Automated Scheduled Tasks
- **08:45 AM**: Pre-Market News & Sentiment Analysis
- **10:00 AM**: AI Swing Trade Signal (90% accuracy target)
- **12:00 PM**: Fundamental Stock Pick for Long-term
- **Every 15 min** (9:15 AM - 3:30 PM): Market Updates  
- **04:30 PM**: Post-Market Analysis & Next Day Roadmap

### 🧠 AI-Powered Analysis
- OpenAI GPT-4 integration for market analysis
- Real-time data fetching from NSE/BSE
- Technical indicators: RSI, MACD, EMA/SMA
- Support/Resistance level calculation
- Multi-timeframe analysis (5m, 15m, 1h, Daily)

### 🛡️ Production Ready
- Automatic error recovery
- Health checks every 5 minutes
- Retry mechanism for failed posts
- Comprehensive logging
- IST timezone support (Asia/Kolkata)
- Trading days only (Monday-Friday)

## ⚙️ Environment Variables

### Required Variables:

```bash
BOT_TOKEN=your_telegram_bot_token_here
CHANNEL_ID=-your_channel_id_here
OPENAI_API_KEY=your_openai_api_key_here
```

### How to Get These Values:

#### 1. BOT_TOKEN (from BotFather)
1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot` command
3. Follow instructions to create your bot
4. Copy the token provided (format: `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

#### 2. CHANNEL_ID (from your Telegram channel)
1. Create a Telegram channel or use existing one
2. Add your bot as administrator to the channel
3. Option A: Use [@userinfobot](https://t.me/userinfobot)
   - Forward any message from your channel to this bot
   - It will show the channel ID (e.g., `-1001234567890`)
4. Option B: Check the URL in Telegram Web
   - Open your channel in [web.telegram.org](https://web.telegram.org)
   - The URL will show the ID (e.g., `#-1001234567890`)

**Note**: Channel IDs always start with a minus sign (-)

#### 3. OPENAI_API_KEY (from OpenAI)
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new secret key
5. Copy the key (format: `sk-proj-...`)

**Important**: Make sure you have credits in your OpenAI account

## 🚀 Deployment on Railway

### Step 1: Prepare GitHub Repository
1. Fork or clone this repository
2. Make sure `bot.py` and `requirements.txt` are present

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose `savan2004/SK_TelegramBot`
6. Railway will automatically detect the Python app

### Step 3: Configure Environment Variables
1. In Railway dashboard, click on your service
2. Go to **"Variables"** tab
3. Add the three required variables:
   - `BOT_TOKEN` = (your bot token from BotFather)
   - `CHANNEL_ID` = (your channel ID with minus sign)
   - `OPENAI_API_KEY` = (your OpenAI API key)
4. Click **"Add"** for each variable

### Step 4: Deploy and Monitor
1. Railway will automatically deploy your bot
2. Check the **"Deployments"** tab for build logs
3. Once deployed, check **"Logs"** to verify bot started successfully
4. Look for the system check message in your Telegram channel

## 📊 Monitoring

### Health Checks
The bot performs automatic health checks every 5 minutes:
- Verifies bot connection
- Checks OpenAI API status
- Ensures all scheduled tasks are running
- Posts error alerts if issues detected

### Log Monitoring
Check Railway logs for:
- `[HEALTH CHECK]` - Health check messages every 5 minutes
- `[JOB: ...]` - Scheduled task execution logs
- `[ERROR]` - Error messages with stack traces

## 🔧 Troubleshooting

### Bot Not Posting
1. **Check Environment Variables**
   - Verify all three variables are set correctly
   - Ensure CHANNEL_ID has minus sign (-)
   - Confirm bot is admin in the channel

2. **Check Railway Logs**
   - Look for error messages
   - Verify bot started successfully  
   - Check for API connection errors

3. **Verify Scheduled Tasks**
   - Check if timezone is IST (Asia/Kolkata)
   - Confirm current time matches schedule
   - Ensure it's a trading day (Monday-Friday)

### OpenAI API Errors
- **Insufficient Credits**: Add credits to your OpenAI account
- **Rate Limit**: Reduce request frequency or upgrade plan
- **Invalid Key**: Regenerate API key and update variable

### Bot Not Responding
1. Check Railway deployment status
2. Restart the service in Railway dashboard
3. Verify no recent code errors in logs

## 📜 License

MIT License - Free for personal and commercial use

## 💡 Support

For issues and questions:
- Open an issue on GitHub
- Contact: Savan Mcare | AI Advisory

⚠️ **Disclaimer**: This bot provides AI-generated analysis for educational purposes only. Always conduct your own research and trade at your own risk.
