// Day 13: Database Seeding Script
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'notes.db');

const db = new sqlite3.Database(dbPath);

// Sample data
const users = [
  {
    uuid: uuidv4(),
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123'
  },
  {
    uuid: uuidv4(),
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'password123'
  }
];

const categories = [
  { name: 'Personal', color: '#ff6b6b' },
  { name: 'Work', color: '#4ecdc4' },
  { name: 'Study', color: '#45b7d1' },
  { name: 'Ideas', color: '#f9ca24' },
  { name: 'Goals', color: '#6c5ce7' }
];

const sampleNotes = [
  {
    title: '🎯 Learning Goals for 2025',
    content: `# My Learning Journey

## Frontend Development
- [ ] Master React Hooks
- [ ] Learn TypeScript
- [ ] Build a portfolio website
- [x] Complete full-stack tutorial

## Backend Development
- [ ] Node.js + Express mastery
- [x] Database integration (SQLite)
- [ ] Authentication systems
- [ ] API design best practices

## DevOps & Tools
- [ ] Docker containerization
- [ ] CI/CD pipelines
- [ ] Cloud deployment (AWS/Vercel)

*Remember: Progress over perfection!*`,
    category: 'Goals',
    tags: '["learning", "goals", "2025", "development"]',
    is_favorite: true
  },
  {
    title: '💡 App Ideas',
    content: `# Cool App Ideas to Build

## 1. Habit Tracker
- Daily habit logging
- Progress visualization
- Streak tracking
- Reminders

## 2. Recipe Manager
- Save favorite recipes
- Meal planning
- Shopping list generator
- Nutrition tracking

## 3. Book Notes App
- Book summaries
- Favorite quotes
- Reading progress
- Recommendations

## 4. Expense Tracker
- Category-wise spending
- Budget planning
- Visual reports
- Bill reminders`,
    category: 'Ideas',
    tags: '["ideas", "apps", "projects", "inspiration"]',
    is_favorite: false
  },
  {
    title: '📚 Today\'s Study Plan',
    content: `# Day 13: Database Basics

## Morning (9:00 - 12:00)
- [x] SQLite setup and configuration
- [x] Database schema design
- [x] CRUD operations with SQL

## Afternoon (1:00 - 5:00)
- [x] Express + SQLite integration
- [x] API endpoints for notes
- [ ] Frontend integration

## Evening (6:00 - 8:00)
- [ ] Testing and debugging
- [ ] Documentation
- [ ] Prepare for Day 14

## Key Learnings
- SQLite is great for prototyping
- Database relationships are crucial
- Always use parameterized queries for security`,
    category: 'Study',
    tags: '["study", "database", "sqlite", "express"]',
    is_favorite: false
  },
  {
    title: '🛠️ Work Project Updates',
    content: `# Project Status - Notes Application

## Completed Features ✅
- User authentication system
- CRUD operations for notes
- Category management
- Database integration
- RESTful API design

## In Progress 🔄
- Frontend React interface
- Advanced search functionality
- File attachment support

## Next Sprint 📋
- User authentication UI
- Note sharing capabilities
- Export/import functionality
- Mobile responsive design

## Issues to Address 🐛
- Performance optimization for large datasets
- Better error handling
- Input validation improvements

*Meeting scheduled for Friday to review progress.*`,
    category: 'Work',
    tags: '["work", "project", "notes-app", "status"]',
    is_favorite: true
  },
  {
    title: '🎮 Personal Interests',
    content: `# Things I Love

## Hobbies
- **Reading**: Currently reading "Clean Code" by Robert Martin
- **Gaming**: Enjoying Stardew Valley for relaxation
- **Cooking**: Experimenting with Italian cuisine
- **Photography**: Weekend nature photography walks

## Goals This Month
- [ ] Finish reading current book
- [ ] Try 3 new recipes
- [ ] Take 100 photos for portfolio
- [ ] Complete gaming backlog

## Weekend Plans
- Saturday: Visit local farmers market
- Sunday: Hiking at nearby trails
- Evening: Work on personal coding projects

*Balance between work and personal life is essential!*`,
    category: 'Personal',
    tags: '["personal", "hobbies", "goals", "lifestyle"]',
    is_favorite: false
  }
];

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data
    await new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run('DELETE FROM notes', (err) => {
          if (err) reject(err);
        });
        db.run('DELETE FROM categories', (err) => {
          if (err) reject(err);
        });
        db.run('DELETE FROM users', (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });

    console.log('🗑️ Cleared existing data');

    // Insert users
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO users (uuid, name, email, password_hash) VALUES (?, ?, ?, ?)',
          [user.uuid, user.name, user.email, hashedPassword],
          function(err) {
            if (err) reject(err);
            else {
              user.id = this.lastID;
              resolve();
            }
          }
        );
      });
    }
    console.log(`👥 Inserted ${users.length} users`);

    // Insert categories for first user
    const userId = users[0].id;
    for (const category of categories) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO categories (name, color, user_id) VALUES (?, ?, ?)',
          [category.name, category.color, userId],
          function(err) {
            if (err) reject(err);
            else {
              category.id = this.lastID;
              resolve();
            }
          }
        );
      });
    }
    console.log(`📁 Inserted ${categories.length} categories`);

    // Insert notes
    for (const note of sampleNotes) {
      const category = categories.find(c => c.name === note.category);
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO notes (uuid, title, content, category_id, user_id, is_favorite, tags) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            uuidv4(),
            note.title,
            note.content,
            category?.id || null,
            userId,
            note.is_favorite ? 1 : 0,
            note.tags
          ],
          function(err) {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    }
    console.log(`📝 Inserted ${sampleNotes.length} notes`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Categories: ${categories.length}`);
    console.log(`   Notes: ${sampleNotes.length}`);
    console.log('\n🔐 Test User:');
    console.log(`   Email: ${users[0].email}`);
    console.log(`   Password: password123`);

  } catch (error) {
    console.error('💥 Seeding failed:', error.message);
    throw error;
  }
}

// Run seeding
seedDatabase()
  .then(() => {
    db.close((err) => {
      if (err) {
        console.error('❌ Error closing database:', err.message);
      } else {
        console.log('✅ Database connection closed');
      }
    });
  })
  .catch((err) => {
    console.error('💥 Seeding failed:', err.message);
    process.exit(1);
  });