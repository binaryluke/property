server-install:
	cd server && npm install

server-package:
	docker build -t property-server ./server

server-publish:
	docker tag property-server:latest 690036067783.dkr.ecr.ap-southeast-2.amazonaws.com/property-server:latest
	docker push 690036067783.dkr.ecr.ap-southeast-2.amazonaws.com/property-server:latest

server-start:
	cd server && npm run start

client-install:
	npm install

client-build:
	npm run build

client-package:
	docker build -t property-client .

client-publish:
	docker tag property-client:latest 690036067783.dkr.ecr.ap-southeast-2.amazonaws.com/property-client:latest
	docker push 690036067783.dkr.ecr.ap-southeast-2.amazonaws.com/property-client:latest

client-start:
	npm run start
