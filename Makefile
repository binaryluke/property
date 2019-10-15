server-install:
	docker run -it --rm -v "${PWD}/server":/app -w /app node npm install

server-package:
	docker build -t property-server ./server

server-publish:
	docker tag property-server:latest 690036067783.dkr.ecr.ap-southeast-2.amazonaws.com/property-server:latest
	docker push 690036067783.dkr.ecr.ap-southeast-2.amazonaws.com/property-server:latest

server-start:
	docker run -it --rm -v "${PWD}/server":/app -w /app node npm start

client-install:
	docker run -it --rm -v "${PWD}":/app -w /app node npm install

client-build:
	docker run -it --rm -v "${PWD}":/app -w /app node npm run build

client-package:
	docker build -t property-client .

client-publish:
	docker tag property-client:latest 690036067783.dkr.ecr.ap-southeast-2.amazonaws.com/property-client:latest
	docker push 690036067783.dkr.ecr.ap-southeast-2.amazonaws.com/property-client:latest

client-start:
	docker run -it --rm -v "${PWD}":/app -w /app node npm start
