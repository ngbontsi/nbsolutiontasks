CREATE TABLE roles (
    id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    full_access BOOLEAN NOT NULL DEFAULT FALSE,
    modify BOOLEAN NOT NULL DEFAULT FALSE,
    read_only BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT pk_roles PRIMARY KEY (id),
    CONSTRAINT uc_roles_name UNIQUE (name)
);

CREATE TABLE users (
    id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role_id VARCHAR(255),
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT pk_users PRIMARY KEY (id),
    CONSTRAINT uc_users_email UNIQUE (email),
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE audit_logs (
    id VARCHAR(255) NOT NULL,
    actor_id VARCHAR(255) NOT NULL,
    actor_email VARCHAR(255),
    action VARCHAR(255) NOT NULL,
    target_id VARCHAR(255),
    target_type VARCHAR(255),
    details VARCHAR(1024),
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT pk_audit_logs PRIMARY KEY (id)
);
