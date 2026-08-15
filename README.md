# 🎓 AIT University — Frontend

**Advanced Information of Technology**

A modern university management system built with **Next.js 15**, featuring admissions, daily lessons, role-based dashboards, weekly exams, and Stripe-powered payments.

---

## ✨ Features

- 🏫 **Admission System** — Online application & enrollment flow
- 📖 **Daily Lessons** — Scheduled lesson releases with progress tracking
- 👥 **Role-Based Dashboards** — Separate views for Admin, Teacher & Student
- 📝 **Weekly Exams** — Exam scheduling, attempts & auto-grading
- 📊 **Result System** — Grade reports, GPA & performance analytics
- 💳 **Stripe Payments** — Course fees, subscription & payment history

---

## 🛠️ Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| Framework      | Next.js 15 (App Router)             |
| Language       | TypeScript                          |
| Styling        | Tailwind CSS                        |
| UI Components  | shadcn/ui                           |
| Animations     | Framer Motion                       |
| Auth           | Better Auth                         |
| Payments       | Stripe                              |
| State          | Zustand / React Query               |
| HTTP Client    | Axios                               |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/ait-university-frontend.git
cd ait-university-frontend
bun install
```

### 2. Environment Variables

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Auth
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxx
STRIPE_SECRET_KEY=sk_test_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx
```

### 3. Run Development Server

```bash
bun dev
```

---

## 📁 Project Structure

```
ait-university-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── admin/
│   │   │   ├── admissions/
│   │   │   ├── students/
│   │   │   ├── teachers/
│   │   │   └── results/
│   │   ├── teacher/
│   │   │   ├── lessons/
│   │   │   ├── exams/
│   │   │   └── results/
│   │   └── student/
│   │       ├── lessons/
│   │       ├── exams/
│   │       ├── results/
│   │       └── payments/
│   ├── admission/
│   ├── payment/
│   │   ├── success/
│   │   └── cancel/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── admission/
│   ├── lesson/
│   ├── exam/
│   ├── result/
│   ├── payment/
│   └── shared/
├── lib/
│   ├── auth.ts
│   ├── stripe.ts
│   └── utils.ts
├── hooks/
├── types/
├── public/
├── .env.local
├── next.config.ts
└── README.md
```

---

## 👥 Role-Based Access

### 🔴 Admin
- Manage all admissions & approvals
- Create/assign teachers & students
- View all results & analytics
- Manage payment records

### 🟡 Teacher
- Upload daily lessons (text, video, PDF)
- Create & schedule weekly exams
- Grade student submissions
- View class results

### 🟢 Student
- Apply for admission
- Access daily lessons (unlocks day by day)
- Attempt weekly exams
- View own results & GPA
- Pay course fees via Stripe

---

## 📖 Pages Overview

### Public Pages
| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | Login page |
| `/register` | Registration page |

### Student Dashboard
| Route | Description |
|-------|-------------|
| `/student` | Dashboard overview |
| `/student/lessons` | Daily lesson feed |
| `/student/lessons/[id]` | Single lesson view |
| `/student/exams` | Upcoming & past exams |
| `/student/exams/[id]` | Take exam |
| `/student/results` | View grades & GPA |
| `/student/payments` | Payment history |

### Teacher Dashboard
| Route | Description |
|-------|-------------|
| `/teacher` | Dashboard overview |
| `/teacher/lessons` | Manage lessons |
| `/teacher/exams` | Create & manage exams |
| `/teacher/results` | Student results |

### Admin Dashboard
| Route | Description |
|-------|-------------|
| `/admin` | Dashboard overview |
| `/admin/admissions` | Review applications |
| `/admin/students` | All students |
| `/admin/teachers` | All teachers |
| `/admin/results` | All results & analytics |

---

## 💳 Stripe Payment Flow

```
Student → Select Course → Checkout (Stripe)
       → Payment Success → Enrollment Activated
       → Webhook → Backend confirms payment
       → Student gets access to lessons
```

---

## 📝 Admission Flow

```
Student fills form → Submits application
                  → Admin reviews → Approves/Rejects
                  → Student gets notified
                  → Student pays admission fee (Stripe)
                  → Account activated → Dashboard access
```

---

## 📖 Daily Lesson System

- Lessons unlock **day by day** automatically
- Students can't skip ahead
- Each lesson has: **video + notes + resources**
- Progress tracked per student

---

## 📝 Weekly Exam System

- Exams scheduled every week by teacher
- MCQ + Written question support
- **Time-limited** attempts
- Auto-graded MCQ, manual grading for written
- Results visible after teacher publishes

---

## 🧑‍💻 Author

Built with ❤️ for **AIT University** — Advanced Information of Technology.

---

## 📄 License

MIT License