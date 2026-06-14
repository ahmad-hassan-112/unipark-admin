APP_NAME=campus-co-admin-dashboard-image
PORT=8058
CONTAINER_NAME=campus-co-admin-dashboard-container

build:
	docker build -t $(APP_NAME) .

up:
	docker run -d --name $(CONTAINER_NAME) -p $(PORT):3000 $(APP_NAME)

down:
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

restart: stop build run

logs:
	docker logs -f $(CONTAINER_NAME)

prune:
	docker ps -a --filter "name=$(CONTAINER_NAME)" --format "{{.ID}}" | xargs -r docker rm -f

	docker images --filter=reference=$(APP_NAME) --format "{{.ID}}" | xargs -r docker rmi -f

