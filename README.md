# Geekathon2024-modules
Geekathon IA modules API

## Project description

This project is an AI-powered application designed to tackle everyday challenges with intelligent, tailored solutions. Leveraging the power of artificial intelligence, the application responds directly to user needs through a modular API structure. Each module specializes in a specific domain, offering precise and effective assistance.

Users can interact with the system via a user-friendly Telegram bot, where the real magic happens. Each module is guided by a specialized prompt that leads users through a series of relevant questions. Based on their responses, the AI generates a customized solution that precisely addresses their requirements. This streamlined process ensures a seamless and highly personalized experience, making complex problem-solving accessible and efficient for everyone.

## Installation
 Clone the project using: 
 ```bash
 git clone git@github.com:romansharapov19/geekathon24-modules.git
```
Create the `.env` file. Copy the information from `.env.example` and insert your AWS credentials.

Install dependencies:
```bash
npm install
```

Finally to run the project locally use:
```bash
npm run dev
```

## Endpoints
Simple chat bot with history.

```bash
endpoint: `/api/chat`
body: `{"question": String}`
```

Finance module
```bash
#1
endpoint: `/api/financeFirst`
body: {
  "name": String,
  "location": String,
      }

#2
endpoint: `/api/financeSecond`
body: {
  "salary": Number, 
  "rent": Number, 
  "familyMembers": Number, 
  "electricity": Number, 
  "gas": Number, 
  "water": Number, 
  "internet": Number, 
  "communications": Number
      }

#3
endpoint: `/api/financeInvest`
body: {
  "strategy": String, 
      }
```

Image recognizer
```bash
endpoint: `/api/imageReader`
body: {
  "image": String, 
  "text": String
  }
```


