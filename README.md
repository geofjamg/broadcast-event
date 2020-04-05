# Broadcast event

Github Action to broadcast an event to all other repositories using repository dispatch event.

## Inputs

### `token` (**required**)

 A repo scoped GitHub [Personal Access Token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

### `organizations` (**optional**)

A list of organizations separated by a white space to send the event in addition to current organization.

### `event-type` (**required**)

A custom event type.

## Example usage

Here is an example how to broadcast an event:

```yaml
uses: gridsuite/broadcast-event@master
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

[Apache 2.0](https://github.com/gridsuite/broadcast-event/blob/master/LICENSE)
