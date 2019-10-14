server-install:
	cd server && npm install

server-package:
	docker build -t property-server ./server

server-start:
	cd server && npm run start

client-install:
	npm install

client-build:
	npm run build

client-package:
	docker build -t property-client .

client-start:
	npm run start
