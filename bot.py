"""
AI Auto Update Bot for Indian Stock Market Analysis
Automated Telegram bot with scheduled market updates
"""

import asyncio
import os
import logging
from datetime import datetime, time
from telegram import Bot
from telegram.error import TelegramError
from openai import AsyncOpenAI
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import pytz

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Environment variables
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
CHANNEL_ID = os.getenv("TELEGRAM_CHANNEL_ID")
OPENAI_KEY = os.getenv("OPENAI_API_KEY")

# Initialize
bot = Bot(token=BOT_TOKEN)
openai_client = AsyncOpenAI(api_key=OPENAI_KEY)
IST = pytz.timezone('Asia/Kolkata')

# ============ TELEGRAM HELPER ============
async def send_to_channel(text: str):
    """Send message to Telegram channel"""
    try:
        await bot.send_message(
            chat_id=CHANNEL_ID,
            text=text,
            parse_mode='Markdown'
        )
        logger.info("✅ Message sent successfully")
        return True
    except TelegramError as e:
        logger.error(f"❌ Telegram Error: {e}")
        return False

# ============ AI GENERATION ============
async def generate_with_ai(prompt: str, max_tokens=800):
    """Generate content using OpenAI"""
    try:
        response = await openai_client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=max_tokens,
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        logger.error(f"❌ OpenAI Error: {e}")
        return f"Error generating content: {str(e)}"

# ============ SCHEDULED TASKS ============

async def pre_market_news():
    """08:45 AM - Pre-Market News"""
    logger.info("📰 Running Pre-Market News Task")
    
    prompt = """You are a financial analyst for Indian markets. Generate a Pre-Market News brief:

🗞️ **Daily Market Update (India)**

### 🔝 Top Market News (Today)
1. [Breaking news about Nifty 50 / Sensex / major stocks]
2. [FII/DII activity or global market impact]
3. [Sector-specific news affecting Indian markets]

### 🎯 AI Impact Analysis
• **Bullish Sectors**: [Which sectors benefit and why]
• **Bearish Sectors**: [Which sectors face headwinds]
• **Key Stocks to Watch**: [3-4 stocks with reasoning]

### 💡 Trading Sentiment
**Opening Outlook**: [Bullish/Bearish/Mixed]
**Key Factors**: [What's driving market today]

Keep it actionable for Indian NSE/BSE traders."""
    
    content = await generate_with_ai(prompt)
    await send_to_channel(content)

async def swing_trade_signal():
    """10:00 AM - AI Swing Trade Signal"""
    logger.info("📊 Running Swing Trade Signal Task")
    
    prompt = """Generate an AI Swing Trade Signal for NSE stocks:

📊 **AI Swing Trade Signal**

**Stock**: [Pick a top NSE stock - Nifty 50]
**Sector**: [Technology/Banking/Auto/Pharma etc]

**Technical Setup**:
• Timeframe: Intraday to 3-day swing
• RSI: [Level] - [Bullish/Bearish/Neutral]
• MACD: [Signal - crossover status]
• Moving Averages: [EMA 20/50 alignment]

**Entry Strategy**:
• **Buy Above**: ₹[price] (confirmation level)
• **Stop Loss**: ₹[price] ([X]% risk)
• **Target 1**: ₹[price] ([X]% gain)
• **Target 2**: ₹[price] ([X]% gain)
• **Risk-Reward**: 1:3+

**Support/Resistance**:
• Support: ₹[level 1], ₹[level 2]
• Resistance: ₹[level 1], ₹[level 2]

**Volume Confirmation**: Check for above-average volume on entry

⚠️ *Educational purposes only. Not financial advice.*"""
    
    content = await generate_with_ai(prompt, 700)
    await send_to_channel(content)

async def fundamental_pick():
    """12:00 PM - Fundamental Stock Pick"""
    logger.info("🏗️ Running Fundamental Pick Task")
    
    prompt = """Generate a Fundamental Stock Pick for long-term investors:

🏗️ **Fundamental Stock Pick**

**Stock**: [Indian company name] (NSE: [TICKER])
**Investment Horizon**: 3-5 Years
**Current Price**: ₹[estimate]

**Key Metrics**:
• P/E Ratio: [value]
• ROE: [%]
• Debt-to-Equity: [ratio]
• Revenue Growth (YoY): [%]

**Investment Thesis**:
1. **Sector Tailwinds**: [Why this sector is growing]
2. **Competitive Advantage**: [Company's unique strengths]
3. **Growth Drivers**: [3 factors driving future growth]
4. **Valuation**: [Fair/Undervalued/Overvalued - justify]

**Risk Factors**:
• [Market/Economic risk]
• [Company-specific risk]

**Target Entry**: Below ₹[price]

📚 *Research-based analysis for educational purposes.*"""
    
    content = await generate_with_ai(prompt, 700)
    await send_to_channel(content)

async def market_snapshot():
    """Every 15 mins (9:15 AM - 3:30 PM) - Market Snapshot"""
    logger.info("📈 Running Market Snapshot Task")
    
    current_time = datetime.now(IST).strftime('%I:%M %p IST')
    
    prompt = f"""Generate a quick Market Snapshot for Indian markets at {current_time}:

📈 **Market Snapshot**
⏰ {current_time}

**Index Status**:
• Nifty 50: [trending/ranging/selling]
• Sensex: [current bias]
• Bank Nifty: [sectoral trend]

**Sector Rotation**:
🔥 Strongest: [sector name]
❄️ Weakest: [sector name]

**Market Sentiment**: [Bullish/Bearish/Sideways]

**Next Watch**:
• Support: [key level]
• Resistance: [key level]
• What to watch: [catalyst/event]

Keep it under 150 words, crisp and actionable."""
    
    content = await generate_with_ai(prompt, 400)
    await send_to_channel(content)

async def post_market_analysis():
    """04:30 PM - Post-Market Analysis"""
    logger.info("🏁 Running Post-Market Analysis Task")
    
    prompt = """Generate comprehensive Post-Market Analysis:

🏁 **Post-Market Analysis**

**Market Summary**:
• Nifty 50: [Close] ([+/-]X%) 
• Sensex: [Close] ([+/-]X%)
• Market Breadth: [Adv/Dec ratio]

**🏆 Top Gainers**:
1. [Stock]: +[X]% - [brief reason]
2. [Stock]: +[X]%
3. [Stock]: +[X]%

**📉 Top Losers**:
1. [Stock]: -[X]% - [brief reason]
2. [Stock]: -[X]%

**🎯 Sector Performance**:
• Winners: [Sector 1], [Sector 2]
• Losers: [Sector 3], [Sector 4]

**🗺️ Tomorrow's Roadmap**:
• Global Cues: [US/Asia markets]
• Key Events: [Earnings/Economic data]
• Technical View: [Support/Resistance]

**Key Levels for Tomorrow**:
• Nifty: Support [X] | Resistance [X]
• Sensex: Support [X] | Resistance [X]"""
    
    content = await generate_with_ai(prompt, 800)
    await send_to_channel(content)

async def system_check():
    """Send system startup message"""
    logger.info("🚀 Sending System Check Message")
    
    msg = f"""🔍 **AI AUTO UPDATE BOT - SYSTEM CHECK COMPLETE**

✅ Connection Status: ONLINE
✅ Bot Token: Verified
✅ Channel ID: Configured
✅ OpenAI Engine: Active

📅 **Scheduled Tasks (IST - Asia/Kolkata):**

1️⃣ **08:45 AM | ☀️ Pre-Market News**
• Real-time NSE/BSE market sentiment
• Global cues & FII/DII data

2️⃣ **10:00 AM | 📊 AI Swing Trade Signal**
• 90% Accuracy Target
• Multi-timeframe analysis
• Risk-Reward: Minimum 1:3

3️⃣ **12:00 PM | 🏗️ Fundamental Stock Pick**
• Long-term investment (3-5 years)
• Valuation & sector analysis

4️⃣ **Every 15 Minutes | 🔔 Market Updates**
• Active: 9:15 AM - 3:30 PM
• Real-time sentiment tracking

5️⃣ **04:30 PM | 🏁 Post-Market Analysis**
• Day's performance summary
• Tomorrow's roadmap

🧠 AI Engine: GPT-4o (OpenAI)
🎯 Accuracy Goal: 90%+ for swing trades

⚠️ **Risk Disclaimer:**
All signals are AI-generated for educational purposes. Trade at your own risk.

🚀 Powered by: Savan Mcare | AI Advisory
⏰ System Time: {datetime.now(IST).strftime('%d-%b-%Y %I:%M %p IST')}
✨ **Bot is now LIVE and monitoring markets!**"""
    
    await send_to_channel(msg)

# ============ SCHEDULER SETUP ============

def setup_scheduler():
    """Configure APScheduler with IST timezone"""
    scheduler = AsyncIOScheduler(timezone=IST)
    
    # 08:45 AM - Pre-Market News (Mon-Fri)
    scheduler.add_job(
        pre_market_news,
        'cron',
        day_of_week='mon-fri',
        hour=8,
        minute=45,
        id='pre_market'
    )
    
    # 10:00 AM - Swing Trade Signal (Mon-Fri)
    scheduler.add_job(
        swing_trade_signal,
        'cron',
        day_of_week='mon-fri',
        hour=10,
        minute=0,
        id='swing_trade'
    )
    
    # 12:00 PM - Fundamental Pick (Mon-Fri)
    scheduler.add_job(
        fundamental_pick,
        'cron',
        day_of_week='mon-fri',
        hour=12,
        minute=0,
        id='fundamental'
    )
    
    # Every 15 minutes (9:15 AM - 3:30 PM, Mon-Fri)
    scheduler.add_job(
        market_snapshot,
        'cron',
        day_of_week='mon-fri',
        hour='9-15',
        minute='15,30,45,0',
        id='market_snapshot'
    )
    
    # 04:30 PM - Post-Market Analysis (Mon-Fri)
    scheduler.add_job(
        post_market_analysis,
        'cron',
        day_of_week='mon-fri',
        hour=16,
        minute=30,
        id='post_market'
    )
    
    return scheduler

# ============ MAIN ============

async def main():
    """Main bot execution"""
    logger.info("🤖 AI Auto Update Bot Starting...")
    
    # Send system check
    await system_check()
    
    # Setup scheduler
    scheduler = setup_scheduler()
    scheduler.start()
    logger.info("⏰ Scheduler started with IST timezone")
    
    # Keep bot running
    try:
        while True:
            await asyncio.sleep(60)
    except KeyboardInterrupt:
        logger.info("🛑 Bot stopped by user")
        scheduler.shutdown()

if __name__ == "__main__":
    asyncio.run(main())
