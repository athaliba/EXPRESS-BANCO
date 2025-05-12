curl --request POST \
  --url 'http://localhost:3000/tasks' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer Sem token '\
  --data '{
    "title": "Treinar",
    
  }'