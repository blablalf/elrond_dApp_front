# elrond mint dApp

## Purpose of this project

The purpose of this project is to have a front that calls a specific contract endpoind.
The specific endpoint is the mint endpoint of a custom elven-tools contract manually deployed with erdpy.
The contract source code will be available later but you can see the abi into the project source.

## Source used for this project :
___
### Elrond dApp Template

The **Elrond dApp Template**, built using [React.js](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/).
It's a basic implementation of [@elrondnetwork/dapp-core](https://www.npmjs.com/package/@elrondnetwork/dapp-core), providing the basics for Elrond authentication and TX signing.

See [Dapp template](https://dapp-template.elrond.com/) for live demo.
___
### Requirements

- Node.js version 12.16.2+
- Npm version 6.14.4+

### Getting Started

The dapp is a client side only project and is built using the [Create React App](https://create-react-app.dev) scripts.

### Instalation and running

### Step 1. Install modules

From a terminal, navigate to the project folder and run:

```bash
npm install
```

### Step 2. Update environment

Go to `App.tsx` and edit the `environment` variable according to the environment you want the app to run on.
Valid values are `testnet`, `devnet` or `mainnet`

If you need to edit the network configuration, you can pass in a `customNetworkConfig` object.
More info about this can be found in [dapp-core documentation](https://github.com/ElrondNetwork/dapp-core)

### Step 3. Running in development mode

In the project folder run:

```bash
npm run start
```

This will start the React app in development mode, using the configs found in the `config.tsx` file.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Step 4. Build for testing and production use

A build of the app is necessary to deploy for testing purposes or for production use.
To build the project run:

```bash
npm run build
```
