curl --request POST \
  --url 'http://localhost:3000/tasks' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer  '\
  --data '{
    "titulo": "Minha tarefa testada via shell script",
    "descricao": "Criada com POST_CREATE_TASK.sh",
    "status": "pendente"
  }'
 
 