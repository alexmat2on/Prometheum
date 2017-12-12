#!/bin/bash

geth --nodiscover --rpc --rpcapi "db,eth,net,web3"  --rpcaddr "0.0.0.0" --rpccorsdomain "*" --datadir \
"/zfs/blockchains/fintech-aid/privchain" --port "30303" --identity "FinTechAidNode" \
--networkid 2539 console

geth.exe --nodiscover --rpc --rpcapi "db,eth,net,web3"  --rpcaddr "0.0.0.0" --rpccorsdomain "*" --datadir "privchain" --port "30303" --networkid 2539 console
