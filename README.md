# n8n-nodes-awork

This repo contains the awork n8n nodes to automate workflows with [awork](awork.com) in [n8n](n8n.io). This is based on the starter node repository.

## Prerequisites

You need the following installed on your development machine:

* [git](https://git-scm.com/downloads)
* Node.js and pnpm. Minimum version Node 18. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).
* Install n8n with:

  ```sh
  pnpm install n8n -g
  ```

* Recommended: follow n8n's guide to [set up your development environment](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/).

## Testing the node

In the node's source folder, run:

```sh
pnpm run build && pnpm link --global
```

Navigate to the custom nodes folder of your local n8n instance, usually `~/.n8n/custom`, and run:

```sh
npm link n8n-nodes-awork
```

Then start n8n:

```sh
n8n start
```

## More information

Refer to the [documentation on creating nodes](https://docs.n8n.io/integrations/creating-nodes/) for detailed information on building custom nodes.
