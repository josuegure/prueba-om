ID	Req/Regla	Escenario (entrada)	Resultado esperado	Tipo	Herramienta	Evidencia
TC01	Health OK	GET /api/health	200 + ok=true	Funcional	Browser/Postman	captura
TC02	List tasks	GET /api/tasks	200 + array	Funcional	Postman	JSON
TC03	Create OK	POST /api/tasks title="Tarea QA"	201 + task	Funcional	Postman	JSON
TC04	Create FAIL title corto	POST title="a"	400 + error	Negativa	Postman	JSON
TC05	Create FAIL sin title	POST {}	400 + error	Negativa	Postman	JSON
TC06	Create FAIL title espacios	POST title=" "	400 + error	Negativa	Postman	JSON
TC07	Update OK done=true	PUT /api/tasks/1 {done:true}	200 + done true	Funcional	Postman	JSON
TC08	Update FAIL id inexistente	PUT /api/tasks/9999	404	Negativa	Postman	JSON
TC09	Delete OK existente	DELETE /api/tasks/1	204	Funcional	Postman	status
TC10	Delete FAIL inexistente	DELETE /api/tasks/9999	404	Negativa	Postman	JSON
TC11
