TC01 — Health OK
ID: TC01
Objetivo: Validar que el servicio está arriba.
Tipo: Funcional (Smoke)
Endpoint: GET /api/health
URL completa: http://localhost:3000/api/health
Precondiciones:
API corriendo con npm run dev
Datos de entrada: N/A
Pasos:
Abrir Postman (o navegador).
Enviar GET http://localhost:3000/api/health.
Resultado esperado:
Status 200
Body JSON contiene: { "ok": true }
Evidencia a guardar:
Captura de Postman con status + response, o copiar response a evidence/TC01-response.json.



TC02 — Listar tareas
ID: TC02
Objetivo: Validar que el sistema lista tareas existentes.
Tipo: Funcional
Endpoint: GET /api/tasks
URL completa: http://localhost:3000/api/tasks
Precondiciones:
API corriendo
Datos de entrada: N/A
Pasos:
En Postman enviar GET http://localhost:3000/api/tasks.
Resultado esperado:
Status 200
Body es un arreglo JSON (aunque esté vacío o con elementos).
Cada elemento (si existe) debe tener al menos: id, title, done
Evidencia a guardar:
Response guardado como evidence/TC02-response.json o captura.


TC03 — Crear tarea válida (OK)
ID: TC03
Objetivo: Validar creación de tarea con title válido.
Tipo: Funcional
Endpoint: POST /api/tasks
URL completa: http://localhost:3000/api/tasks
Precondiciones:
API corriendo
Datos de entrada (Body JSON):
{ "title": "Tarea QA" } 
Pasos:
En Postman crear request POST a http://localhost:3000/api/tasks.
Body → raw → JSON y pegar el body.
Enviar request.
Resultado esperado:
Status 201
Body contiene un objeto con:
id numérico (nuevo)
title = "Tarea QA"
done = false
Post-validación (opcional recomendable):
Ejecutar GET /api/tasks
Confirmar que existe la tarea creada.
Evidencia a guardar:
Response de POST en evidence/TC03-response.json (y si hacen GET, guardar evidence/TC03-tasks.json).


TC04 — Crear tarea inválida: title muy corto
ID: TC04
Objetivo: Validar que el sistema rechaza títulos menores a 3 caracteres.
Tipo: Negativa
Endpoint: POST /api/tasks
URL completa: http://localhost:3000/api/tasks
Precondiciones: API corriendo
Datos de entrada:
{ "title": "a" } 
Pasos:
Enviar POST con ese body.
Resultado esperado:
Status 400
Body contiene campo error (mensaje de validación)
Evidencia a guardar:
evidence/TC04-response.json o captura.


TC05 — Crear tarea inválida: sin title
ID: TC05
Objetivo: Validar que el sistema rechaza cuando falta title.
Tipo: Negativa
Endpoint: POST /api/tasks
URL completa: http://localhost:3000/api/tasks
Precondiciones: API corriendo
Datos de entrada (Body JSON):
{ } 
Pasos:
En Postman enviar POST con body {}.
Resultado esperado:
Status 400
Body con error
Evidencia a guardar:
evidence/TC05-response.json o captura.


TC06 — Crear tarea inválida: title solo espacios
ID: TC06
Objetivo: Validar que el sistema rechaza title con solo espacios.
Tipo: Negativa (borde)
Endpoint: POST /api/tasks
URL completa: http://localhost:3000/api/tasks
Precondiciones: API corriendo
Datos de entrada:
{ "title": "   " } 
Pasos:
Enviar POST con ese body.
Resultado esperado:
Status 400
Body con error
Evidencia a guardar:
evidence/TC06-response.json o captura.


TC07 — Actualizar tarea existente: marcar done=true (OK)
ID: TC07
Objetivo: Validar actualización de una tarea existente cambiando done.
Tipo: Funcional
Endpoint: PUT /api/tasks/:id
URL completa: http://localhost:3000/api/tasks/1
Precondiciones:
API corriendo
Debe existir una tarea con id=1 (en el arreglo inicial normalmente sí).
Datos de entrada:
{ "done": true } 
Pasos:
En Postman enviar PUT a http://localhost:3000/api/tasks/1.
Body raw JSON con { "done": true }.
Resultado esperado:
Status 200
Body contiene:
id = 1
done = true
Post-validación (recomendada):
GET /api/tasks
Confirmar que la tarea con id=1 está done=true
Evidencia a guardar:
evidence/TC07-response.json (+ opcional evidence/TC07-tasks.json).


TC08 — Actualizar tarea inexistente: 404
ID: TC08
Objetivo: Validar respuesta al actualizar un id que no existe.
Tipo: Negativa
Endpoint: PUT /api/tasks/9999
URL completa: http://localhost:3000/api/tasks/9999
Precondiciones: API corriendo
Datos de entrada:
{ "done": true } 
Pasos:
Enviar PUT a /api/tasks/9999 con body { "done": true }.
Resultado esperado:
Status 404
Body con error = "not found" (o equivalente)
Evidencia a guardar:
evidence/TC08-response.json o captura.


TC09 — Eliminar tarea existente: 204
ID: TC09
Objetivo: Validar eliminación de tarea existente.
Tipo: Funcional
Endpoint: DELETE /api/tasks/:id
URL completa: http://localhost:3000/api/tasks/1
Precondiciones:
API corriendo
Debe existir la tarea con id=1 (si ya se eliminó en pruebas previas, usar otro id existente o primero crear una tarea y borrar esa).
Datos de entrada: N/A
Pasos (opción simple):
Enviar DELETE http://localhost:3000/api/tasks/1.
Resultado esperado:
Status 204
Sin body (o body vacío)
Post-validación (recomendada):
Ejecutar GET /api/tasks
Confirmar que id=1 ya NO aparece
Evidencia a guardar:
Captura del status 204 o un txt evidence/TC09-status.txt con nota “204”.


TC10 — Eliminar tarea inexistente: 404
ID: TC10
Objetivo: Validar respuesta al eliminar un id que no existe.
Tipo: Negativa
Endpoint: DELETE /api/tasks/9999
URL completa: http://localhost:3000/api/tasks/9999
Precondiciones: API corriendo
Datos de entrada: N/A
Pasos:
Enviar DELETE http://localhost:3000/api/tasks/9999.
Resultado esperado:
Status 404
Body con error = "not found" (o equivalente)
Evidencia a guardar:
evidence/TC10-response.json o captura.