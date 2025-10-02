INSERT INTO "user"(email, password_hash, name) 
VALUES ('hiregui92@gmail.com','$2b$10$MFp46jXulrkrUPSIHRX.WeV77gS.t5iHRpA1sAfzdtGygnwu2lNbW','Hembert Iregui');
















puedes generar el sql para insertar permisos al usario 1 con role admin
Este es el DDL de todas las tablas:

-- public.audit_log definition

-- Drop table

-- DROP TABLE public.audit_log;

CREATE TABLE public.audit_log (
	id serial4 NOT NULL,
	"actorId" varchar NOT NULL,
	"actorEmail" varchar NOT NULL,
	"action" varchar NOT NULL,
	metadata json NULL,
	"createdAt" timestamp NOT NULL DEFAULT now(),
	CONSTRAINT "PK_07fefa57f7f5ab8fc3f52b3ed0b" PRIMARY KEY (id)
);

-- public.organization definition

-- Drop table

-- DROP TABLE public.organization;

CREATE TABLE public.organization (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	"parentId" int4 NULL,
	CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY (id),
	CONSTRAINT "FK_da6c3ae56a0c3fc3ce81b0e90a6" FOREIGN KEY ("parentId") REFERENCES public.organization(id)
);

-- public."permission" definition

-- Drop table

-- DROP TABLE public."permission";

CREATE TABLE public."permission" (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY (id),
	CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE (name)
);

-- public."permission" definition

-- Drop table

-- DROP TABLE public."permission";

CREATE TABLE public."permission" (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY (id),
	CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE (name)
);

-- public."permission" definition

-- Drop table

-- DROP TABLE public."permission";

CREATE TABLE public."permission" (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY (id),
	CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE (name)
);

-- public."permission" definition

-- Drop table

-- DROP TABLE public."permission";

CREATE TABLE public."permission" (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY (id),
	CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE (name)
);

-- public."user" definition

-- Drop table

-- DROP TABLE public."user";

CREATE TABLE public."user" (
	id serial4 NOT NULL,
	email varchar NOT NULL,
	password_hash varchar NOT NULL,
	"name" varchar NOT NULL,
	organization_id int4 NULL,
	role_id int4 NULL,
	CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id),
	CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email)
);


-- public."user" foreign keys

ALTER TABLE public."user" ADD CONSTRAINT "FK_3e103cdf85b7d6cb620b4db0f0c" FOREIGN KEY (organization_id) REFERENCES public.organization(id);
ALTER TABLE public."user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY (role_id) REFERENCES public."role"(id);

