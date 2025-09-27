-- Crear extensión para UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Crear tablas
CREATE TABLE IF NOT EXISTS organization (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  parent_id uuid REFERENCES organization(id)
);

CREATE TABLE IF NOT EXISTS permission (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS role (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  parent_role_name text
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id uuid REFERENCES role(id) ON DELETE CASCADE,
  permission_id uuid REFERENCES permission(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS "user" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text,
  organization_id uuid REFERENCES organization(id),
  role_id uuid REFERENCES role(id)
);

CREATE TABLE IF NOT EXISTS task (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  status text,
  category text,
  owner_id uuid REFERENCES "user"(id),
  organization_id uuid REFERENCES organization(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid,
  actor_email text,
  action text,
  metadata json,
  created_at timestamptz DEFAULT now()
);

