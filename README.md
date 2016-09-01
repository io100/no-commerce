# Node Express app with nginx postgres nodemon dev cluster

This is a full stack boilerplate using a nginx reverse proxy/load balancer for
a Node Express app backed by Postgres and Elasticsearch. It was forked from
[here](https://github.com/siyangbi/docker-nginx-node-postgres-elasticsearch).

## Prerequisites

Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/installation/mac/) for Mac OS X



# How to use this repo after install docker-machine

## TL;DR

Test your Docker commands.
```
$ docker-machine version
docker-machine version 0.8.0, build b85aac1
```
```
$ docker-machine ls
NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER    ERRORS
default   -        virtualbox   Running   tcp://192.168.99.101:2376           v1.12.1
```
```
$ docker-machine env
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.101:2376"
export DOCKER_CERT_PATH="/Users/me/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"
# Run this command to configure your shell:
# eval $(docker-machine env)
```

Start the default container:
```
$ docker-machine start
Starting "default"...
(default) Check network to re-create if needed...
(default) Waiting for an IP...
Machine "default" was started.
Waiting for SSH to be available...
Detecting the provisioner...
Started machines may have new IP addresses. You may need to re-run the `docker-machine env` command.
```

Run the hello world app:
```
$ docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker Hub account:
 https://hub.docker.com

For more examples and ideas, visit:
 https://docs.docker.com/engine/userguide/

```

Build the boilerplate:
```
$ docker-compose up
Starting dockernginxnodepostgreselasticsearch_elasticsearch_1
Starting dockernginxnodepostgreselasticsearch_postgres_1
Starting dockernginxnodepostgreselasticsearch_node2_1
Starting dockernginxnodepostgreselasticsearch_node1_1
Starting dockernginxnodepostgreselasticsearch_nginx_1
...
[whole bunch of messages]
...
```

(You'll need to `docker-compose up` everytime you want to rebuild.)

Done!

## How does it work?

`docker-compose.yml` contains a whole bunch of instructions on what containers
to build and how to configure them. We try to do as much configuration as
possible in `docker-compose.yml`, but we can also use a `Dockerfile` for
further customization on a per-container basis. We also provide additional
resources such as a nginx server configuration file and Express app source. The
`Dockerfile` provides instructions on how to install those resources into the
containers when they are built.

### Build containers

`docker-compose up` builds five containers, each providing their own service:
1. A nginx container configured to reverse proxy and load balance between two
node app containers
* Two Node containers configured to serve up an Express app backed by Postgres
and Elasticsearch
* A Postgres container  
* An Elasticsearch container

Now when you visit `http://localhost`, it should serve up something like this:
```
This page has been viewed: 1 times! from container ff2216e775df
```

## Connect directly to Postgres

First, get the IP address of the container:
```
$ docker-machine ip
192.168.99.101
```
Then, log in just like you would any other Postgres server.
```
psql -h 192.168.99.101 -U youruser
```
Or if you want a one-liner:
```
psql -h `docker-machine ip` -U youruser
```

## Destroy containers

```
$ docker-compose rm
```

## Setup nodejs package
-- ignore this part

Run `npm install` in node folder

Run `docker-compose build`. It will

* install [nodemon](https://github.com/remy/nodemon) globally in your container
* instruct the container to execute `nodemon index.js` on start up.

## ToDo
redis
