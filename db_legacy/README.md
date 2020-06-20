## Database

Directory for database scripts.

### `.env`

Create a `.env` file within this directory:
```
DB_ENDPOINT=mongodb+srv://<your-instance>.mongodb.net
DB_USER=<your-username>
```

### `backend.sh`

#### Available Parameters
- `--access, -a`: Access your cluster through the `mongo` shell
- `--write, -w`: Execute `write-to-db.js` on your MongoDB instance

### `write-to-db.js`

Writes the contents of `projects.json`, `languages.json`, and `tools.json` to your cluster's Projects, LanguageIds, and ToolIds collections respectively.
