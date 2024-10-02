#!/bin/bash

# This script gets a subset of the organisations - relevant to our use case - and retrieves the linked data using the OVO number

mkdir -p ./data

declare -a ORG_NAMES=("FAVV" "VREG" "Douane")

for ORG in "${ORG_NAMES[@]}"
do
    OVO_NUMBERS=($(curl -s https://api.wegwijs.vlaanderen.be/v1/search/organisations?q=$ORG | jq -r '.[].ovoNumber')) 
    for OVO in "${OVO_NUMBERS[@]}"
    do 
       curl -s -H "accept: text/turtle" https://data.vlaanderen.be/doc/organisatie/$OVO --output ./data/$OVO.ttl
    done
done
