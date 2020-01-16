# Broadcast event

Github Action to broadcast an event to all other repositories using repository dispatch event.

## Inputs

### `token` (**required**)

 A repo scoped GitHub [Personal Access Token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

### `event-type` (**required**)

A custom event type.

## Example usage

Here is an example how to broadcast an event:

```yaml
uses: geofjamg/broadcast-event@v1.0.0
with:
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
  event-type: my-event
```

Here is an example how to trigger a workflow from a repository dispatch event:

```yaml
name: On event workflow

on:
  repository_dispatch:
    types: my-event

jobs:
```
## License

[Apache 2.0](https://github.com/geofjamg/broadcast-event/blob/master/LICENSE)
