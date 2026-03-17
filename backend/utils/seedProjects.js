const mongoose = require('mongoose');
const Project = require('../models/Project');
require('dotenv').config();

const projects = [
  {
    title: 'Netflix Clone',
    description: 'A full-stack Netflix clone with user authentication, movie browsing, search functionality, and video playback powered by TMDB API.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
    githubUrl: 'https://github.com/kishorshelar/netflix-clone',
    liveUrl: '#',
    featured: true,
    order: 1,
  },
  {
    title: 'Tic Tac Toe Game',
    description: 'An interactive Tic Tac Toe game with AI opponent, score tracking, and smooth animations.',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/kishorshelar/tic-tac-toe',
    liveUrl: '#',
    featured: false,
    order: 2,
  },
  {
    title: 'CRUD Application',
    description: 'A full-stack CRUD app with React frontend, Node/Express REST APIs, and MySQL database with complete user management.',
    techStack: ['React', 'Node.js', 'Express', 'MySQL'],
    githubUrl: 'https://github.com/kishorshelar/crud-app',
    liveUrl: '#',
    featured: true,
    order: 3,
  },
  {
    title: 'Personal Calendar Generator',
    description: 'A custom calendar application with image upload, event management, and personalized calendar generation with export functionality.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Cloudinary'],
    githubUrl: 'https://github.com/kishorshelar/calendar-generator',
    liveUrl: '#',
    featured: true,
    order: 4,
  },
];

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Project.deleteMany();
  await Project.insertMany(projects);
  console.log('✅ Projects seeded!');
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
