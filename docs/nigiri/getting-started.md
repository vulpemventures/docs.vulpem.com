---
id: getting-started
title: Getting Started
image: /img/nigiri_logo.svg
---

Download and install `nigiri` command line interface

```sh
curl https://getnigiri.vulpem.com | bash
```

This will create a directory `~/.nigiri` copying there `{bitcoin|elements}.conf` you can modify.


Lauch Docker daemon (Mac OSX)

```sh
open -a Docker
``` 
You may want to [Manage Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user)


Close and reopen your terminal, then start Bitcoin and Liquid

```sh
nigiri start --liquid
```
**That's it.**
Go to [http://localhost:5000](http://localhost:5000) for quickly inspect the Bitcoin blockchain or [http://localhost:5001](http://localhost:5001) for Liquid.

Use the Bitcoin CLI inside the box

```sh
nigiri rpc getnewaddress "" "bech32"
```

Use the Elements CLI inside the box

```sh
nigiri rpc --liquid getnewaddress "" "bech32"
```