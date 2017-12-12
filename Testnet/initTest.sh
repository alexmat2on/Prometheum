#!/bin/bash

geth --nodiscover --rpc --rpcapi "db,eth,net,web3" --rpcport "8080" --datadir \
"/zfs/blockchains/fintech-aid/privchain" --port "30303" --identity "FinTechAidNode" \
--networkid 2539 init ./fintechGenesis.json

geth.exe --nodiscover --rpc --rpcapi "db,eth,net,web3" --rpcport "8080" --datadir "privchain" --port "30303" --networkid 2539 init ./fintechGenesis.json
