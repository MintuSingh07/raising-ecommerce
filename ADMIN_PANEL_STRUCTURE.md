# Admin Panel Structure & System Architecture

This document outlines the architecture, schemas, and API endpoints of the Rising Admin Panel. It serves as an editable guide so developers can easily add, update, or remove administrative functionalities.

---

## 1. Directory Structure

All administrative logic is organized inside `src` and the App Router paths:

```text
src/
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx            # Login & registration tabs interface
│   │   ├── page.tsx                # Server component session-check route wrapper
│   │   └── AdminDashboardClient.tsx # Client dashboard layout & widget tabs switcher
│   └── api/
│       └── admin/
│           ├── login/route.ts      # Verifies login credentials & issues JWT cookie
│           ├── logout/route.ts     # Deletes session cookie
│           ├── register/route.ts   # Registers new admin credentials in MongoDB
│           ├── seed/route.ts       # Database seeder to populates all collections
│           ├── products/route.ts   # CRUD endpoint for products
│           ├── blogs/route.ts      # CRUD endpoint for blog posts
│           ├── media/route.ts      # CRUD endpoint for YouTube videos
│           └── banners/route.ts    # CRUD endpoint for homepage banner slides
├── lib/
│   ├── db.ts                       # Hashing utility and server lookup methods
│   ├── mongoose.ts                 # Cached Mongoose connection helper
│   └── session.ts                  # JWT token encryption/decryption utilities
├── models/
│   ├── User.ts                     # Schema for admin users
│   ├── Category.ts                 # Schema for product categories
│   ├── Product.ts                  # Schema for detailed products
│   ├── Blog.ts                     # Schema for blog insights/posts
│   ├── Media.ts                    # Schema for video campaign links
│   └── Banner.ts                   # Schema for slides
└── proxy.ts                        # Edge route guard preventing unauthorized /admin access
```

---

## 2. Database Schema Details (Mongoose)

### A. User Model (`User.ts`)
Stores admin profiles.
```typescript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}
```

### B. Category Model (`Category.ts`)
Stores catalog groupings.
```typescript
{
  id: { type: String, required: true, unique: true, trim: true }, // slug id
  label: { type: String, required: true, trim: true },
  desc: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
}
```

### C. Product Model (`Product.ts`)
Stores catalog entries.
```typescript
{
  id: { type: String, required: true, unique: true, trim: true }, // SKU/ID
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true }, // slug category link
  image: { type: String },
  gallery: [{ type: String }],
  description: { type: String }, // short description HTML block
  features: [{ type: String }],
  specs: [
    {
      label: { type: String, required: true },
      value: { type: String, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
}
```

### D. Blog Model (`Blog.ts`)
Stores insights/articles.
```typescript
{
  slug: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true }, // e.g. "Insights", "Story"
  date: { type: String, required: true }, // e.g. "June 18, 2025"
  readTime: { type: String, required: true }, // e.g. "4 min read"
  excerpt: { type: String, required: true, trim: true },
  image: { type: String },
  accent: { type: String }, // e.g. "from-blue-600/30 to-blue-900/60"
  content: {
    intro: { type: String, required: true },
    sections: [
      {
        heading: { type: String, required: true },
        paragraphs: [{ type: String }]
      }
    ]
  },
  author: { type: String, required: true },
  authorRole: { type: String, required: true },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
}
```

### E. Media Model (`Media.ts`)
Stores YouTube showcase links.
```typescript
{
  id: { type: String, required: true, unique: true, trim: true }, // Youtube video ID
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true } // e.g. "Product", "Campaign"
}
```

### F. Banner Model (`Banner.ts`)
Stores slide assets.
```typescript
{
  id: { type: Number, required: true, unique: true }, // Slide sequence index
  image: { type: String, required: true } // Image URL (local path or Cloudinary URL)
}
```

---

## 3. Administrative Access Controls

1. **Route Protection (Proxy)**:
   - Any client route matches `/admin/:path*` (except `/admin/login`) is intercepted by `src/proxy.ts` on the Edge runtime. Unauthorized hits are redirected immediately to the login form.
2. **API Route Guards**:
   - Secure mutations (`POST`, `PUT`, `DELETE`) require validating session cookies. If not validated, API returns `401 Unauthorized`.

---

## 4. How to Extend This Panel

- **To add a new editable model (e.g. Testimonials)**:
  1. Define a schema model under `src/models/Testimonial.ts`.
  2. Create CRUD api routes inside `src/app/api/admin/testimonials/route.ts`.
  3. Expand `AdminDashboardClient.tsx` to add a "Testimonials" option in `TabType` and draw a list/form viewer component.
