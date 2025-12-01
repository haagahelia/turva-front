# Steps for Future Development

This document outlines what needs to be implemented for better performance, scalability, and user experience.

---

## 1. Image Optimization & Cloud Storage

### What Needs to Happen

- **Move content images to cloud storage** (keep app icon and splash screen in project)
  - Images like `Home_screen.png`, `HH_SafetyCharacters.png`, `About_app_screen.png` should be moved to a third-party cloud service
  - Store image URLs/IDs in the relational database
  - Use these IDs/URLs in the app instead of local `require()` statements

- **Optimize image sizes before upload**
  - Resize images to appropriate dimensions (e.g., max 720p for hero images, smaller for thumbnails)
  - Compress images to reduce file size while maintaining quality
  - Target sizes: 50-200KB per image depending on use case

- **Create database table for image metadata**
  - Store cloud URLs, image types, dimensions, file sizes
  - Create Node.js API endpoints to fetch image URLs by type/ID

- **Update app code**
  - Replace local image requires with API calls to fetch cloud URLs
  - Implement loading states and error handling
  - Add image caching for offline use

---

## 2. Authentication

### Why We Need It

Currently, user progress (safety topic completions, game progress) is stored locally on each device. This means:

- If a user switches devices, they lose all their progress
- Progress cannot be shared or synced across devices
- There's no way to identify which user completed what

To save user progress to a database and enable cross-device sync, we need to know **which user** is using the app. Authentication allows us to:

- Identify each user uniquely
- Link their progress, preferences, and data to their account
- Support multiple devices per user

### What Needs to Happen

- Users need to be able to create accounts and log in
- The app needs to know who the current user is
- User progress and preferences should be saved to the database under their account
- Progress should sync across all devices where the user is logged in

---

## 3. Implementation Priority

1. **Image Optimization** (High Priority) - Reduces app package size immediately
2. **Authentication** (High Priority) - Required before progress persistence

---

