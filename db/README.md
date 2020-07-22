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
- `--write, -w`: Execute `data.sql` on your PostgreSQL instance (note - you will need to make your own `data.sql` script to run)
- `--reset, -r`: Execute `schema.sql` on your PostgreSQL instance (this will drop and re-create all tables!)

### `schema.sql`

Database schema.
