#!/bin/sh

DIR=$(cd $(dirname $0) && pwd)
NAME=${DIR##*/}

gulp build

if ! docker ps | grep $NAME > /dev/null ; then
	docker run -d --rm --name $NAME -p 8000:80 -v $(cd build && pwd):/usr/share/nginx/html/ nginx:alpine
fi

trap 'docker stop $NAME' EXIT

gulp watch
