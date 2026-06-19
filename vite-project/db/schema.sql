-- Archivo Táchira: Folklore & Patrimonio
-- Esquema de base de datos (PostgreSQL / Supabase)

create extension if not exists "pgcrypto";

-- ============================================================
-- PERFILES: extiende auth.users de Supabase con el rol del sistema
-- Roles permitidos: administrador (audita y aprueba) y visitante (público e investigadores)
-- ============================================================
create table perfiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nombre_completo text not null,
  rol text not null default 'visitante' check (rol in ('administrador', 'visitante')),
  created_at timestamptz not null default now()
);

-- ============================================================
-- CULTORES: datos personales, de oficio, materia prima, comercialización
-- y declaración de buena fe del artesano
-- ============================================================
create table cultores (
  id uuid primary key default gen_random_uuid(),

  -- Datos personales
  nombres text not null,
  apellidos text not null,
  cedula text not null unique,
  fecha_nacimiento date,
  lugar_nacimiento text,
  municipio text not null,
  telefono text not null,
  correo text,

  -- Oficio y producto
  oficio text not null,
  especialidad text,
  producto text,
  clasificacion text check (clasificacion in ('Indígena', 'Tradicional', 'Contemporánea')),
  funcionalidad text[] not null default '{}'
    check (funcionalidad <@ array['Utilitaria', 'Decorativa', 'Ceremonial', 'Mixta']),

  -- Materia prima
  materia_prima text,
  fuente_materia_prima text,

  -- Comercialización
  comercializa boolean not null default false,
  lugares_venta text,
  precio_referencial numeric(10, 2),

  -- Declaración de buena fe
  declaracion_buena_fe boolean not null default false,
  firma text not null,

  -- Auditoría del museo
  estado text not null default 'pendiente' check (estado in ('pendiente', 'aprobado', 'rechazado')),
  aprobado boolean not null default false,
  revisado_por uuid references perfiles (id),
  revisado_en timestamptz,
  observaciones text,

  created_at timestamptz not null default now()
);

-- ============================================================
-- RECAUDOS_CULTOR: checkboxes de recaudos exigidos y archivos subidos
-- ============================================================
create table recaudos_cultor (
  id uuid primary key default gen_random_uuid(),
  cultor_id uuid not null references cultores (id) on delete cascade,
  tipo_documento text not null,
  archivo_url text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- OBRAS: piezas artesanales registradas por cada cultor
-- ============================================================
create table obras (
  id uuid primary key default gen_random_uuid(),
  cultor_id uuid not null references cultores (id) on delete cascade,

  titulo text not null,
  categoria text not null check (
    categoria in ('Talla en madera', 'Cerámica', 'Pintura', 'Cestería', 'Textiles')
  ),
  descripcion text,
  ubicacion text not null,
  imagen_url text,

  clasificacion text check (clasificacion in ('Indígena', 'Tradicional', 'Contemporánea')),
  funcionalidad text[] not null default '{}'
    check (funcionalidad <@ array['Utilitaria', 'Decorativa', 'Ceremonial', 'Mixta']),

  materia_prima text,
  fuente_materia_prima text,

  comercializa boolean not null default false,
  lugares_venta text,
  precio_referencial numeric(10, 2),

  estado text not null default 'pendiente' check (estado in ('pendiente', 'publicado', 'rechazado')),
  aprobado boolean not null default false,
  revisado_por uuid references perfiles (id),

  created_at timestamptz not null default now()
);

create index idx_obras_categoria on obras (categoria);
create index idx_obras_cultor on obras (cultor_id);
create index idx_obras_aprobado on obras (aprobado);
create index idx_cultores_municipio on cultores (municipio);
create index idx_cultores_estado on cultores (estado);
create index idx_cultores_aprobado on cultores (aprobado);
