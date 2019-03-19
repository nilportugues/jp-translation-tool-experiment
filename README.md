# Japanese To English Translation-tool

It's an API that does some processing under the hood to return a properly translated song in English language.

## How to use it

``` 
[POST] http://localhost:3000/translate/english/

body:

{
  "data": "<your kanji>"
}

```

## TODO

### enhancement idea
for sentences with unknown words... find the original sentence, extract it, translate it alone and check if the unknown translated word remains or not
