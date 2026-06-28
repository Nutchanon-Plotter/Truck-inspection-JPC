This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# 🚚 FLEET SAFETY - Truck Inspection Checklist

ระบบเว็บแอปพลิเคชันสำหรับตรวจสอบสภาพรถบรรทุกประจำวัน (Daily Inspection) พัฒนาด้วย Next.js (App Router) และเชื่อมต่อฐานข้อมูลแบบ Real-time ด้วย Firebase Firestore

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)
* **Framework:** Next.js (React)
* **Styling:** Tailwind CSS
* **Database:** Firebase Firestore
* **Icons:** Lucide React
* **Charts:** Recharts
* **Deployment:** Vercel

---

## ⚙️ สิ่งที่ต้องมีก่อนติดตั้ง (Prerequisites)
ก่อนเริ่มต้นใช้งาน กรุณาตรวจสอบให้แน่ใจว่าเครื่องของคุณได้ติดตั้งเครื่องมือเหล่านี้แล้ว:
1. [Node.js](https://nodejs.org/) (เวอร์ชัน 18.x ขึ้นไป)
2. บัญชี [Firebase](https://firebase.google.com/) สำหรับจัดการฐานข้อมูล
3. บัญชี [Vercel](https://vercel.com/) สำหรับการ Deploy ระบบ
4. Git สำหรับจัดการ Source Code

---

## 🚀 ขั้นตอนการติดตั้ง (Installation)

### 1. โคลนโปรเจกต์ (Clone Repository)
เปิด Terminal และรันคำสั่งเพื่อดาวน์โหลดโค้ด:
```bash
git clone [https://github.com/USERNAME/truck-inspection-app.git](https://github.com/USERNAME/truck-inspection-app.git)
cd truck-inspection-app