---
id: introduction
title: Introduction
---

Taxi is a service that allows users to transfer their assets without owning L-BTC funds to pay for network fees.

Taxi just takes care of that in exchange for a small service fee that the user pays with the same asset he's trasferring.

The service exposes a public interface over HTTP/2 ([gRPC](https://github.com/vulpemventures/taxi-protobuf/blob/v1/api-spec/protobuf/taxi/v1/taxi.proto)) and HTTP/1 ([RESTful JSON](https://stage-api.liquid.taxi/v1/docs)). Users can interact with it to retrieve the list of assets in which taxi's service fee can be paid, or to request **topups**.

A **topup** is a transaction for which taxi pays for network fees: when requesting a topup, taxi returns a partial transaction (pset) with a single LBTC input and 2 outputs for service and network fees. The input is signed so that other inputs and outputs can be added by the user at will. He just needs to specify the service fee asset and hint at the final tx size (indicatively) in the request message.


Taxi exposes also a private admin interface over HTTP/2 ([gRPC](https://github.com/vulpemventures/taxi-daemon/blob/master/api-spec/protobuf/taxi-daemon/v1/admin.proto)) and HTTP/1 ([RESTful JSON](https://github.com/vulpemventures/taxi-daemon/blob/master/api-spec/protobuf/gen/swagger/taxi-daemon/v1/admin.swagger.json)) allowing the administrator to update the list of supported assets for _topup with asset_. The simplest way to interact with the admin interface is by using Taxi CLI.

