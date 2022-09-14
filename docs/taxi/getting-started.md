---
id: getting-started
title: Getting Started
image: /img/taxi_logo.png
---

The easiest way to serve Taxi is with Docker. The [`resources/`](https://github.com/vulpemventures/taxi-daemon/tree/master/resources) folder that you can find in the repository contains docker compose yaml files for running Taxi in Liquid mainnet, testnet or regtest.

This guide walks you through serving Taxi on regtest and requires [`nigiri`](../nigiri/getting-started.md) to be installed locally.

First things first, start nigiri:

```bash
$ nigiri start --liquid
```

Copy the [compose file](https://github.com/vulpemventures/taxi-daemon/blob/master/resources/compose-regtest/docker-compose.yml) in a directory of your choice or clone the repository and `cd` to the folder.

Start and initialize the Ocean wallet, which is the wallet used by taxi to create topups:

```bash
# Start ocean wallet
$ docker-compose up -d oceand

# Alias for ocean cli
alias ocean="docker exec oceand-regtest ocean"

# Initialize wallet with random seed
$ ocean wallet create --password password

# Unlock wallet
$ ocean wallet unlock --password password
```

Start and initialize Taxi:

```bash
# Start taxi
$ docker-compose up -d taxid

# Alias for taxi cli and fragmenter
alias taxi="docker exec taxid-regtest taxi"
alias fragmenter="docker exec taxid-regtest fragmenter"

# Taxi creates 2 new wallet accounts 'lbtc' and 'payout' if not already existing.
$ ocean wallet info

# Send lbtc funds to Taxi to be able to pay for network fees
$ ocean account derive --account-name lbtc -n 10

# At this point, you have to transform the list of derived addresses in a list 
# of comma-separated outputs like the following.
# Change the addresses with those you got with the previous command.
$ fragmenter --outputs "el1qqt0l0lmaw4u9hsr0p6ghek498sjw5zksx82k8n5p8he9plcl9rf5x0hsaj0hjsm3jkvypqwaua4zdgr60avnwkx2lxt4gwhnt=500","el1qqfq3pp98p53228grhl2cmar2zcxt8399c9y6nsm5usuuntc4wmmwm660pwunp8nrye4djkxt4fze9967ud0053rnxsuaffyp0=500,el1qqf4xzp7a6jquhs9ckd7fzhgm5ce8lcwvltjnfsg5fl652jk2tdmmh63973nfph3yg5nuydhh4nvvfyn9knfuujqf8fuygtvdt=500,el1qq23q48gae3pxxevah6435q7wstg3992s5pcral5rfyp2vgnreda0mr7mkz4wwhg45h4h36asz308x6d3h43avht8rfg6ht3n6=500,el1qqwdz5um73n87xdcgzv0k66edcrkyfggzyfkxt3gwqm7qm4pzug56pypnlpth856rqgw7eyu2zezmyqmy8yr8kkledwy3sclaj=700,el1qqtgd6n06g6zrspr6h2t0stpxls905a94d75zs755t0nj9569n7zqgkar2q8jwhleqw5smljnnmvgttyykffvxyvaj43zdxksp=700,el1qqgcr5qvhdw70lz0vclwq9rljyf47sqne0x3uruyx06q0ywxtlmp5udj55mmg50hfr363lhfc5zjraypz4dmcszt68mstpjwvf=700,el1qq249sl8nhc7rvc7cjqkzr2ymcq3epf45sxsq29z8jll8f6zpm9h96qf26dr5ae5jc4k6qkl7hju39sfqsglwgfdc65cssq3eu=1000,el1qqw9qs5zsfq3vej4w6s7vsxy6w8e26j4awmga38mar5q7x4py2dtxprtkqklz6kuly5mc5dh37klnuy6w7fan74jy5qrpfekwu=1000,el1qqt49lhp94uzhup0u70c540zd079ylz43lxnh679mv8e8vtm30zxyy30z76wrvqa8aej9ewfd65r35wsm3lmgw442h575gsu7j=1500"

# Mint a new asset and add it to taxi
$ nigiri rpc --liquid issueasset 100000 0

# Add the minted asset to taxi with a current price of 20k usd and a 1% service fee
$ taxi add-asset --asset <asset> --price 20000 --basis-point 100
```