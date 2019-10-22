dev:
	docker-compose -f development.docker-compose.yml up --build

# test:
# 	docker-compose -f production.docker-compose.yml up --build
# 	docker exec -ti segment_stream_redis_1 sh

test:
	wrk -t1 -c400 -d30s http://localhost:3000/1 \
	& wrk -t1 -c400 -d30s http://localhost:3000/2 \
	& wrk -t1 -c400 -d30s http://localhost:3000/3 \
	& wrk -t1 -c400 -d30s http://localhost:3000/4 \
	& wrk -t1 -c400 -d30s http://localhost:3000/5 \
	& wrk -t1 -c400 -d30s http://localhost:3000/6 \
	& wrk -t1 -c400 -d30s http://localhost:3000/7 \
	& wrk -t1 -c400 -d30s http://localhost:3000/8 \
	& wrk -t1 -c400 -d30s http://localhost:3000/9 \
	& wrk -t1 -c400 -d30s http://localhost:3000/10 \
	& wrk -t1 -c400 -d30s http://localhost:3000/11 \
	& wrk -t1 -c400 -d30s http://localhost:3000/12 \
	& wrk -t1 -c400 -d30s http://localhost:3000/13 \
	& wrk -t1 -c400 -d30s http://localhost:3000/14 \
	& wrk -t1 -c400 -d30s http://localhost:3000/15 

prod:
	docker-compose -f production.docker-compose.yml up --build