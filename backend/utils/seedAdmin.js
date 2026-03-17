/**
 * Run once to create the admin user:
 *   npm run seed:admin
 *
 * Update the credentials below before running in production!
 */
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const ADMIN = {
  username: 'kishor_admin',
  email: 'kishorshelar@gmail.com',
  password: 'ChangeMe@2024!',   // ⚠️  Change this before running!
  role: 'admin',
};

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');

  const existing = await User.findOne({ username: ADMIN.username });
  if (existing) {
    console.log('ℹ️  Admin user already exists. Skipping.');
    process.exit(0);
  }

  await User.create(ADMIN);
  console.log(`✅ Admin user created: ${ADMIN.username}`);
  console.log('⚠️  IMPORTANT: Change the password after first login!');
  process.exit(0);
};

run().catch((err) => {
  console.error('❌ Error seeding admin:', err.message);
  process.exit(1);
});
