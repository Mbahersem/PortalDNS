CREATE TABLE IF NOT EXISTS dns (
    ip TEXT PRIMARY KEY,
    domain TEXT NOT NULL,
    description TEXT,
    actif INTEGER,
    creation DATE DEFAULT DATE('now')
);