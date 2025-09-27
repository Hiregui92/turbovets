#!/bin/bash
set -e

DB_NAME="taskdb"
DB_USER="postgres"
DB_PASS="postgres"
DB_HOST="localhost"
DB_PORT="5436"
DEFAULT_DB="postgres"

export PGPASSWORD=$DB_PASS

# 1️⃣ Verifica si la DB existe y créala si no
DB_EXISTS=$(psql -U "$DB_USER" -d "$DEFAULT_DB" -h "$DB_HOST" -p "$DB_PORT" -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'")
if [ "$DB_EXISTS" != "1" ]; then
  echo "Base de datos $DB_NAME no existe. Creando..."
  psql -U "$DB_USER" -d "$DEFAULT_DB" -h "$DB_HOST" -p "$DB_PORT" -c "CREATE DATABASE $DB_NAME;"
else
  echo "Base de datos $DB_NAME ya existe. No se crea."
fi

# 2️⃣ Habilita extensión pgcrypto en la DB
psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -p "$DB_PORT" -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;"

# 3️⃣ Crear tablas si no existen
psql -U "$DB_USER" -d "$DB_NAME" -h "$DB_HOST" -p "$DB_PORT" <<'EOSQL'
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
EOSQL

echo "Base de datos y tablas creadas/verificadas correctamente."

