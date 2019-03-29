# Sample Docker App
Sampe webapp setup to build a docker image of app and run.

- Build docker image
```sh
$ git clone https://github.com/sandeshchoudhary/node-docker.git
$ cd node-docker
$ docker build -t nodedocker .
```

- Run docker image
```sh
$ docker run -p 4000:3031 nodedocker
```

- Run the app in the background, in detached mode:
```sh
$ docker run -d -p 4000:3031 nodedocker
```
Now Go to http://localhost:4000

- Get container id for App
```sh
$ docker container ls
```

- Stop docker image
```sh
$ docker container stop CONTAINER ID
```
