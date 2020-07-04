# smack

## Installation

1. Clone this repo into your desired directory...
```
git clone https://github.com/Zhongy1/smack.git
```
2. Install npm packages
```
cd smack
npm install
```
3. Install ts-node globally (you may need to put `sudo` first)
```
npm install -g ts-node
```

## Running

1. Run using default port (8000)
```
ts-node server.ts
```
2. Run using your own port
```
ts-node server.ts -p 3000
```

## Usage

1. Use in the browser: go to `http://localhost:{port}`

![Alt text](/images/gui.png?raw=true "Optional Title")

2. Use in the terminal:
```
curl -X POST localhost:{port}/api/string-manipulator --header "Content-Type: application/json" --data '{"string": "This is a sentence!"}'
```

## Testing your code

Each time you save your code, you'll have to restart your server to see changes. To terminate server do `ctrl-c`, then rerun the command you used to start your server.

In the case that you don't want to use the graphical interface to test your code, you can use the terminal:

```
curl -X POST localhost:{port}/api/string-manipulator/1 --header "Content-Type: application/json" --data '{"string": "This is a sentence!"}'
```

Notice that there is a 1 in this command. Replace the 1 with your corresponding number. Values can go from 1 - 9