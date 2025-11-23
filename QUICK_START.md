# Quick Start Guide

Get the Web3 Message Signer & Verifier running in 5 minutes!

## 📋 Prerequisites

- Node.js v18+ installed
- npm v9+ installed
- Dynamic.xyz account (free)

## ⚡ 5-Minute Setup

### Step 1: Get Dynamic Credentials (2 min)

1. Visit https://app.dynamic.xyz/dashboard
2. Sign up or log in
3. Create a new project
4. Copy your **Environment ID**

### Step 2: Configure Application (1 min)

```bash
cd dynamic

# Frontend configuration
cd frontend
cp .env.example .env.local
# Edit .env.local and paste your Environment ID:
# NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=your_environment_id_here
```

### Step 3: Install & Run (2 min)

```bash
# From dynamic directory
npm install

# Start both servers
npm run dev
```

## 🎮 Using the Application

### First Time

1. **Open** http://localhost:3000
2. **Enter Email** - Get OTP sent to your email
3. **Enter OTP** - Verify the 6-digit code
4. **See Wallet** - Your connected wallet address displays
5. **Sign Message** - Type a message and click "Sign Message"
6. **View Result** - See if signature is valid + signer address
7. **Check History** - All messages stored in browser

### Sign Another Message

1. Type new message
2. Click "Sign Message"
3. It auto-verifies and appears in history

## 🏗️ Architecture at a Glance

```
Browser (React)
    ↓
Dynamic.xyz SDK (Auth + Signing)
    ↓
Express Backend (Verification)
    ↓
ethers.js (Signature Recovery)
```

## 📁 Key Files

**Frontend Components** (`frontend/src/components/`)

- `Auth/` - Email & OTP login
- `Wallet/` - Shows wallet address
- `MessageForm/` - Sign messages
- `Results/` - Verification results
- `History/` - Message history

**Backend API** (`backend/src/`)

- `index.ts` - Express server
- `routes/verify-signature.ts` - API endpoint
- `services/signature-verifier.ts` - Signature logic

**Configuration**

- `frontend/.env.local` - Frontend settings
- `backend/.env` - Backend settings
- `package.json` - Monorepo configuration

## 🔧 Commands

```bash
# Development
npm run dev              # Run both servers
npm run dev:frontend    # Frontend only
npm run dev:backend     # Backend only

# Building
npm run build           # Build for production

# Testing
npm run test            # Run all tests

# Code Quality
npm run lint            # Check code quality
npm run typecheck       # Type check
```

## 🌐 URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📝 What You Can Do

✅ Sign messages with your wallet  
✅ Verify signatures on backend  
✅ View signature results instantly  
✅ See message history  
✅ Clear your history  
✅ Copy wallet addresses  
✅ Works on mobile & desktop

## 🐛 Troubleshooting

### "Configuration Error" on page

→ Make sure `NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID` is in `frontend/.env.local`

### CORS error in console

→ Make sure backend is running: `npm run dev:backend`

### Port already in use

→ Change ports in env files or kill existing processes

### OTP not received

→ Check spam folder or wait a minute before resending

### Dynamic SDK errors

→ Make sure Environment ID is correct (no extra spaces)

## 📚 Full Documentation

- **SETUP.md** - Detailed setup instructions
- **README.md** - Project overview
- **IMPLEMENTATION_GUIDE.md** - Feature implementation details
- **IMPLEMENTATION_COMPLETE.md** - What's been built
- **PROJECT_STATUS.md** - Project structure and progress

## 🎯 Next Steps

1. Get credentials (Dynamic.xyz)
2. Run `npm install`
3. Set up `.env.local`
4. Run `npm run dev`
5. Test the app!

## 💡 Tips

- Messages are stored in browser localStorage
- Each sign includes backend verification
- Wallet address displayed at top of page
- Click history items to see full details
- "Clear History" button removes all messages

## 🚀 Ready to Deploy?

See **README.md** → "Deployment" section for:

- Vercel frontend deployment
- Render/Heroku backend deployment
- Environment variables setup

---

**That's it!** You're ready to sign and verify messages on the blockchain. 🎉
