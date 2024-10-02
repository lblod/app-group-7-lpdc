# Seed Organisations As Linked Data for Lookup After Matching

To create the small [data set](./data) - you do not need to do this again
* install  jq - `sudo apt-get install jq` 
* run `./get-organisations-as-linked-data.sh` to retrieve some organisations from the [Organisatieregister SEARCH API](https://vlaamseoverheid.atlassian.net/wiki/spaces/AGB/pages/5720146518/Documentatie+SEARCH+API) and then get the linked data OSLO model (if available)
* create any missing organisation that you need minimally using this [mapping](https://vlaamseoverheid.atlassian.net/wiki/spaces/AGB/pages/6112878734/Organisatieregister+ontsloten+als+linked+open+data)

Once created, import the .ttl files by hand in the Virtuoso or using the migration scripts.

The Organizations Register's DCAT can be found using:

```bash
curl -s -L https://data.vlaanderen.be/id/dataset/organisatieregister -H "accept: text/turtle"
```
Unfortunately it does not contain a data service (e.g. a LDES).
