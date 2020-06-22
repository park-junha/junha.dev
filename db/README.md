## Database

Directory for database scripts.

### `.env`

Create a `.env` file within this directory:
```
USER=admin
PASSWORD=sample
NETLOC=127.0.0.1
PORT=5432
DBNAME=sampledb
```

### `postgres.sh`

#### Available Parameters
- `--access, -a`: Access your PostgreSQL database via `psql`
- `--write, -w`: Execute `data.sql` on your PostgreSQL instance

### `schema.sql`

Database schema.
