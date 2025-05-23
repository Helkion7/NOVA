# NOVA API

## Testing with Postman

### Quick Setup

1. Start the server: `npm run dev`
2. Import `postman-collection.json` into Postman
3. Set the `baseUrl` variable to `http://localhost:3000` (should be set by default)

### Manual Testing

#### 1. Status Check

- **GET** `http://localhost:3000/api/status`
- Expected: `200 OK` with `{"status": "ok"}`

#### 2. Get All Items

- **GET** `http://localhost:3000/api/items`
- Expected: `200 OK` with array of items

#### 3. Create New Item

- **POST** `http://localhost:3000/api/items`
- Headers: `Content-Type: application/json`
- Body:

```json
{
  "name": "My Test Item",
  "description": "Test description"
}
```

- Expected: `201 Created` with created item

#### 4. Create Item with Validation Error

- **POST** `http://localhost:3000/api/items`
- Body:

```json
{
  "name": "",
  "description": 123
}
```

- Expected: `400 Bad Request` with validation errors

#### 5. Delete Item

- **DELETE** `http://localhost:3000/api/items/{id}`
- Replace `{id}` with actual item ID (e.g., "1")
- Expected: `204 No Content`

#### 6. Delete Non-existent Item

- **DELETE** `http://localhost:3000/api/items/999`
- Expected: `404 Not Found`

### Expected Status Codes

- `200` - Success with data
- `201` - Created successfully
- `204` - Success with no content
- `400` - Bad request (validation errors)
- `404` - Not found
- `500` - Server error

### Log Verification

Check `/var/logs/api.log` to verify requests are being logged with format:
`HH:MM:SS.DD.MM.YYYY - /api/endpoint`
