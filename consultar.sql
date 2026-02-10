-- PostgreSQL

-- Crear tipos ENUM primero
CREATE TYPE theme_type AS ENUM ('light', 'dark', 'system');
CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'dropped', 'completed');
CREATE TYPE priority_type AS ENUM ('low', 'medium', 'high');

-- Tabla usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    banner_picture VARCHAR(255),
    preferred_theme theme_type NOT NULL DEFAULT 'system',
    is_active BOOLEAN DEFAULT true,
    is_banned BOOLEAN DEFAULT false,
    is_admin BOOLEAN DEFAULT false,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla tareas
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status task_status NOT NULL DEFAULT 'pending',
    priority priority_type,
    due_date TIMESTAMP,
    is_deleted BOOLEAN DEFAULT false,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices (email y username YA tienen índice por UNIQUE)
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);

-- Índice compuesto útil para queries comunes
CREATE INDEX idx_tasks_user_status ON tasks(user_id, status, is_deleted);