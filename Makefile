dev:
	docker-compose -f development.docker-compose.yml up --build

test:
	

prod:
	docker-compose -f production.docker-compose.yml up --build