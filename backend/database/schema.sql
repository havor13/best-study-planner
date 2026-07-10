-- ============================
-- Smart Study Planner Database
-- ============================

-- Drop tables if they exist (clean re-run)
DROP TABLE IF EXISTS study_suggestions, progress, reminders, tasks, courses, users CASCADE;

-- ============================
-- Users (extends Django auth_user)
-- ============================
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(150) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Courses
-- ============================
CREATE TABLE courses (
  course_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE
);

-- ============================
-- Tasks
-- ============================
CREATE TABLE tasks (
  task_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  course_id INT REFERENCES courses(course_id) ON DELETE SET NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  priority INT CHECK (priority BETWEEN 1 AND 5),
  due_date TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Reminders
-- ============================
CREATE TABLE reminders (
  reminder_id SERIAL PRIMARY KEY,
  task_id INT REFERENCES tasks(task_id) ON DELETE CASCADE,
  reminder_time TIMESTAMP NOT NULL,
  method VARCHAR(20) DEFAULT 'popup'
);

-- ============================
-- Progress
-- ============================
CREATE TABLE progress (
  progress_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  task_id INT REFERENCES tasks(task_id) ON DELETE CASCADE,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Study Suggestions
-- ============================
CREATE TABLE study_suggestions (
  suggestion_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  suggested_time TIMESTAMP NOT NULL,
  reason TEXT
);

-- ============================
-- Seed Data
-- ============================

-- Users
INSERT INTO users (username, email, password_hash)
VALUES
('sampson', 'sampson@example.com', 'hashed_pw_123'),
('julyanne', 'julyanne@example.com', 'hashed_pw_456'),
('uthman', 'uthman@example.com', 'hashed_pw_789');

-- Courses
INSERT INTO courses (user_id, name, description, start_date, end_date)
VALUES
(1, 'CSE 499 Senior Project', 'Smart Study Planner development', '2026-07-01', '2026-12-01'),
(2, 'Web Development Basics', 'Intro to HTML, CSS, JS', '2026-07-01', '2026-09-30');

-- Tasks
INSERT INTO tasks (user_id, course_id, title, description, priority, due_date, status)
VALUES
(1, 1, 'Design Database Schema', 'Create tables for planner', 5, '2026-07-10', 'pending'),
(1, 1, 'Frontend Setup', 'Initialize React project', 4, '2026-07-15', 'pending'),
(2, 2, 'Build Portfolio Page', 'HTML/CSS assignment', 3, '2026-07-20', 'pending');

-- Reminders
INSERT INTO reminders (task_id, reminder_time, method)
VALUES
(1, '2026-07-09 09:00:00', 'popup'),
(2, '2026-07-14 18:00:00', 'email');

-- Progress
INSERT INTO progress (user_id, task_id, completed_at)
VALUES
(1, 1, '2026-07-08 20:00:00');

-- Study Suggestions
INSERT INTO study_suggestions (user_id, suggested_time, reason)
VALUES
(1, '2026-07-09 07:00:00', 'Morning focus block for schema work'),
(2, '2026-07-10 19:00:00', 'Evening study session for portfolio');
