# React Native Chatbot

<a href="https://badge.fury.io/js/react-native-chatbot"><img src="https://badge.fury.io/js/react-native-chatbot.svg" alt="npm version"></a>

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

## Documentation

### Properties

| Name | Type | Default | Description |
|---|---|---|---|
| `avatarStyle` | `PropTypes.object` | | The style object to use to override the avatar element |
| `avatarWrapperStyle` | `PropTypes.object` | | The style object to use to override the avatar surrounding element |
| `botAvatar` | `PropTypes.string` | `img` | Bot image source |
| `botBubbleColor` | `PropTypes.string` | `#6E48AA` | Bot bubble color |
| `botDelay` | `PropTypes.number` | `1000` | The delay time of bot messages |
| `botFontColor` | `PropTypes.string` | `#fff` | Bot font color |
| `bubbleStyle` | `PropTypes.object` | | The style object to use to override the bubble element |
| `optionStyle` | `PropTypes.object` | | The style object to use to override the option container |
| `optionElementStyle` | `PropTypes.object` | | The style object to use to override the option element |
| `optionFontColor` | `PropTypes.string` | | Option font color |
| `optionBubbleColor` | `PropTypes.string` | | Option bubble color |
| `className` | `PropTypes.string` | | Add a class name to root element |
| `contentStyle` | `PropTypes.object` | | The style object to use to override the scroll element |
| `customDelay` | `PropTypes.number` | `1000` | The delay time of custom messages |
| `customStyle` | `PropTypes.object	` | | The style object to use to override the custom step element |
| `footerStyle` | `PropTypes.object`  | | The style object to use to override the footer element |
| `handleEnd({ renderedSteps, steps, values })` | `PropTypes.func`  | | The callback function when chat ends |
| `headerComponent` | `PropTypes.element` | | Header component for the chatbot |
| `hideUserAvatar` | `PropTypes.bool`  | `false` | If true the user avatar will be hidden in all steps |
| `inputStyle` | `PropTypes.object`  | | The style object to use to override the input element |
| `keyboardVerticalOffset` | `PropTypes.number` | `ios ? 44 : 0` | Vertical offset of keyboard view. Check [keyboardVerticalOffset](https://facebook.github.io/react-native/docs/keyboardavoidingview#keyboardverticaloffset)
| `placeholder` | `PropTypes.string`  | `Type the message ...` | Chatbot input placeholder |
| `steps` | `PropTypes.array`  | | The chatbot steps to display |
| `style` | `PropTypes.object`  | | The style object to use to override the submit button element |
| `submitButtonStyle` | `PropTypes.object`  | | The style object to use to override the button element |
| `submitButtonContent` | `PropTypes.string` or `PropTypes.element` | `SEND`| The string or object to use to override the button content |
| `userAvatar` | `PropTypes.string`  | `img` | User image source |
| `userBubbleStyle` | `PropTypes.string`  | `img` | The style object to use to override the user's bubble element |
| `userBubbleColor` | `PropTypes.string`  | `#fff` | User bubble color |
| `userDelay` | `PropTypes.number`  | `1000` | The delay time of user messages |
| `userFontColor` | `PropTypes.string`  | `#4a4a4a` | User font color |
| `scrollViewProps` | `PropTypes.object`  | `#4a4a4a` | Use to override scroll view props |

### Steps

#### Text Step

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `String / Number` | `true` | The step id. Required for any step |
| `message` | `String / Function` | `true` | The text message. If function, it will receive ({ previousValue, steps }) params |
| `trigger` | `String / Number / Function` | `false` | The id of next step to be triggered. If function, it will receive ({ value, steps }) params |
| `avatar` | `String` | `false` | the avatar to be showed just in this step. Note: this step must be a step that avatar appears |
| `delay` | `Number` | `false` | set the delay time to message be shown |
| `end` | `Boolean` | `false` | if true indicate that this step is the last |
| `inputAttributes` | `Object` | Set any attributes on the input field (keyboardType, autoCapitalize, autoComplete) |
| `metadata` | `Object` | Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format |

Example:

``` js
{
  id: '1',
  message: 'Hello World',
  trigger: '2',
},
{
  id: '2',
  message: ({ previousValue, steps }) => 'Hello',
  end: true,
}
```

#### User Step

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `String / Number` | `true` | The step id. Required for any step |
| `user` | `Boolean` | `true` | if true indicate that you waiting a user type action |
| `trigger` | `String / Number / Function` | `false` | The id of next step to be triggered. If function, it will receive ({ value, steps }) params |
| `validator` | `String / Number` | `false` | if user attribute is true you can pass a validator function to validate the text typed by the user |
| `end` | `Boolean` | `false` | if true indicate that this step is the last |
| `inputAttributes` | `Object` | Set any attributes on the input field (keyboardType, autoCapitalize, autoComplete) |
| `metadata` | `Object` | Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format |

Example:

``` js
{
  id: '1',
  user: true,
  inputAttributes: {
    keyboardType: 'email-address'
  },
  end: true,
}
```

#### Options Step

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `String / Number` | `true` | The step id. Required for any step |
| `options` | `Array` | `true` | Array of options with { label, value, trigger } properties |
| `end` | `Boolean` | `false` | if true indicate that this step is the last |
| `inputAttributes` | `Object` | Set any attributes on the input field (keyboardType, autoCapitalize, autoComplete) |
| `metadata` | `Object` | Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format |

Example:

``` js
{
  id: '1',
  options: [
    { value: 1, label: 'Number 1', trigger: '3' },
    { value: 2, label: 'Number 2', trigger: '2' },
    { value: 3, label: 'Number 3', trigger: '2' },
  ],
}
```

#### Custom Step

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `String / Number` | `true` | The step id. Required for any step |
| `component` | `Component` | `true` | Custom React Component |
| `replace` | `Boolean` | `false` | if true indicate that component will be replaced by the next step |
| `waitAction` | `Boolean` | `false` | if true indicate that you waiting some action. You must use the triggerNextStep prop in your component to execute the action |
| `asMessage` | `Boolean` | `false` | f true indicate that the component will be displayed as a text step
| `trigger` | `String / Number / Function` | `false` | The id of next step to be triggered. If function, it will receive ({ value, steps }) params |
| `delay` | `Number` | `false` | set the delay time to component be shown |
| `end` | `Boolean` | `false` | if true indicate that this step is the last |
| `inputAttributes` | `Object` | Set any attributes on the input field (keyboardType, autoCapitalize, autoComplete) |
| `metadata` | `Object` | Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format |

Example:

``` js
{
  id: '1',
  component: <CustomComponent />
  trigger: '2'
}
```

#### Update Step

| Name | Type | Required | Description |
|---|---|---|---|
| `id` | `String / Number` | `true` | The step id. Required for any step |
| `update` | `String / Number` | `true` | The id of next step to be updated |
| `trigger` | `String / Number / Function` | `false` | The id of next step to be triggered. If function, it will receive ({ value, steps }) params |
| `inputAttributes` | `Object` | Set any attributes on the input field (keyboardType, autoCapitalize, autoComplete) |
| `metadata` | `Object` | Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format |

Example:

``` js
{
  id: '1',
  options: [
    { value: 1, label: 'Number 1', trigger: '3' },
    { value: 2, label: 'Number 2', trigger: '2' },
    { value: 3, label: 'Number 3', trigger: '2' },
  ],
}
```

#### Custom Component

When you declare a custom step, you need indicate a custom React Component to be rendered in the chat. This custom component will receive the following properties.

| Name | Type | Description |
|---|---|---|
| `previousStep` | `PropTypes.object` | Previous step rendered |
| `step` | `PropTypes.object` | Current step rendered |
| `steps` | `PropTypes.object` | All steps rendered |
| `triggerNextStep({ value, trigger })` | `PropTypes.func` | Callback function to trigger next step when user attribute is true. Optionally you can pass a object with value to be setted in the step and the next step to be triggered |
| `inputAttributes` | `Object` | Set any attributes on the input field (keyboardType, autoCapitalize, autoComplete) |
| `metadata` | `Object` | Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format |

## How to Contribute

Please check the [contributing guide](https://github.com/LucasBassetti/react-native-chatbot/blob/master/contributing.md)

## Authors

| ![Lucas Bassetti](https://avatars3.githubusercontent.com/u/1014326?v=3&s=150)|
|:---------------------:|
|  [Lucas Bassetti](https://github.com/LucasBassetti/)   |

See also the list of [contributors](https://github.com/LucasBassetti/react-native-chatbot/contributors) who participated in this project.

## Donate

If you liked this project, you can donate to support it :heart:

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=lucasbr%2edafonseca%40gmail%2ecom&lc=US&item_name=Lucas%20Bassetti&item_number=GitHub&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)

## License

MIT · [Lucas Bassetti](http://lucasbassetti.com.br)
