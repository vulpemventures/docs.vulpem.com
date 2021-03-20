---
id: tasting
title: Tasting
image: /img/nigiri_logo.svg
---

At the moment bitcoind, elements and electrs are started on *regtest* network.


## Start

```bash
nigiri start
```
Use the `--liquid` flag to let you do experiments with the Liquid sidechain. A liquid daemon and a block explorer are also started when passing this flag.

## Stop

```bash
nigiri stop
```
Use the `--delete` flag to not just stop Docker containers but also to remove them and delete the config file and any new data written in volumes.


## Faucet
Generate and send bitcoin to given address
```bash
# Bitcoin
$ nigiri faucet bcrt1qsl4j5je4gu3ecjle8lckl3u8yywh8rff6xxk2r

# Elements
$ nigiri faucet --liquid el1qqwwx9gyrcrjrhgnrnjq9dq9t4hykmr6ela46ej63dnkdkcg8veadrvg5p0xg0zd6j3aug74cv9m4cf4jslwdqnha2w2nsg9x3
```

* Liquid only Issue and send a given quantity of an asset

```bash
$ nigiri mint el1qqwwx9gyrcrjrhgnrnjq9dq9t4hykmr6ela46ej63dnkdkcg8veadrvg5p0xg0zd6j3aug74cv9m4cf4jslwdqnha2w2nsg9x3 1000 VulpemToken VLP
```

* Broadcast a raw transaction and automatically generate a block

```bash
# Bitcoin
$ nigiri push <hex>

# Elements
$ nigiri push --liquid <hex>
```

* Check the logs of Bitcoin services

```bash
# Bitcoind
$ nigiri logs node
# Electrs
$ nigiri logs electrs
# Chopsticks
$ nigiri logs chopsticks
```

* Check the logs of Liquid services

```bash
# Elementsd
$ nigiri logs node --liquid
# Electrs Liquid
$ nigiri logs electrs --liquid
# Chopsticks Liquid
$ nigiri logs chopsticks --liquid
```

* Use the Bitcoin CLI inside the box

```
$ nigiri rpc getnewaddress "" "bech32"
bcrt1qsl4j5je4gu3ecjle8lckl3u8yywh8rff6xxk2r
```

* Use the Elements CLI inside the box

```
$ nigiri rpc --liquid getnewaddress "" "bech32"
el1qqwwx9gyrcrjrhgnrnjq9dq9t4hykmr6ela46ej63dnkdkcg8veadrvg5p0xg0zd6j3aug74cv9m4cf4jslwdqnha2w2nsg9x3
```



Nigiri uses the default directory `~/.nigiri` to store configuration files and docker-compose files.
To set a custom directory use the `--datadir` flag.

Run the `help` command to see the full list of available flags.
