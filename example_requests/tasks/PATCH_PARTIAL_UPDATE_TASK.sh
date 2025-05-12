curl --request PATCH \
  --url http://localhost:3000/tasks/tarefa \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjEzMzA4YWNmZWU0ODBmM2VjNGFiNyIsImlhdCI6MTc0NzAwNjIzMCwiZXhwIjoxNzQ3MDA5ODMwfQ.KjVSZKfAdEcvy-xVSJC9BJESXwRqXaexoObNSOTLZfY" \
  --data '{
    "status": "concluida"
  }'
