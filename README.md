# IOT-stack prototype

This repository contains a prototype of a classic IOT stack that includes Node-RED, MQTT, Telegraf and InfluxDB.

## How to use?

Checkout the code of this repository. Then execute:
```
docker compose up
```

You can then browse:
- `http://localhost:1880` for the Node-RED web application.
- `http://localhost:8086` for the InfluxDB web application (using username `admin` and password `Password1!`)

## Development

The 3 following custom nodes have been created in Node-RED:
- `random-generator`: This node outputs a JSON payload every 5 seconds, containing an array of random numbers of length `count`.
- `sum-payload`: This node receives and sums up all numbers from an incoming JSON payload.
- `count-config`: This is a configuration node used by the `random-generator` node to retrieve the value of `count`.

To test these nodes locally, move into the `node-red` folder and run:
```
npm install
npm test
```

## Remarks

- Why is Node-RED code syntax so old (no ES modules, no "const", no arrow-functions in the whole documentation)?
