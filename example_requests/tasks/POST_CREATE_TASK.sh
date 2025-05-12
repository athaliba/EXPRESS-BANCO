curl --request POST \
  --url 'http://localhost:3000/tasks' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTUzYzcwNmJmNDYyYjIyNWMxZGUyMiIsImlhdCI6MTc0NjI5MDE0NywiZXhwIjoxNzQ2MjkzNzQ3fQ._eU81VqB5AfsYwXKmCCqadKDpwiYgv7ZKoKOSqtIFjg '\
  --data '{
    "titulo": "Minha tarefa testada via shell script",
    "descricao": "Criada com POST_CREATE_TASK.sh",
    "status": "pendente"
  }'
 
 