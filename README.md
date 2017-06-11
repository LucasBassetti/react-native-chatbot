# React Native Chatbot

<a href="https://travis-ci.org/LucasBassetti/react-native-chatbot"><img src="https://travis-ci.org/LucasBassetti/react-native-chatbot.svg?branch=master" alt="Travis CI" /></a> <a href="https://badge.fury.io/js/react-native-chatbot"><img src="https://badge.fury.io/js/react-native-chatbot.svg" alt="npm version"></a>

A react native chatbot component to create conversation chats. Based on [react-simple-chatbot](https://github.com/LucasBassetti/react-simple-chatbot).

## Getting Start

```bash
npm install react-native-chatbot --save
```

## Usage

``` javascript
import ChatBot from 'react-native-chatbot';

const steps = [
  {
    id: '0',
    message: 'Welcome to react chatbot!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Bye!',
    end: true,
  },
];

<ChatBot steps={steps} />
```

## How to Contribute

Please check the [contributing guide](https://github.com/LucasBassetti/react-native-chatbot/blob/master/contributing.md)

## License

MIT · [Lucas Bassetti](http://lucasbassetti.com.br)
