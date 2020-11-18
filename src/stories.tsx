import React from 'react';
import { Text } from 'react-native';
import { storiesOf } from '@storybook/react';
import ChatBot from './ChatBot';
import Button from './Button';
import ButtonText from './ButtonText';
import ChatBotContainer from './ChatBotContainer';
import Footer from './Footer';
import InputView from './InputView';
import Bubbles from './steps/common/Bubbles';
import Loading from './steps/common/Loading';
// import Circle from './steps/common/Circle'; // import SVG

const steps = [
  {
    id: '1',
    message: 'What number I am thinking?',
    trigger: '2',
  },
  {
    id: '2',
    options: [
      { value: 1, label: 'Number 1', trigger: '4' },
      { value: 2, label: 'Number 2', trigger: '3' },
      { value: 3, label: 'Number 3', trigger: '3' },
    ],
  },
  {
    id: '3',
    message: 'Wrong answer, try again.',
    trigger: '2',
  },
  {
    id: '4',
    message: 'Awesome! You are a telepath!',
    trigger: '5',
  },
  {
    id: '5',
    message: 'What word I am thinking?',
    trigger: '6',
  },
  {
    id: '6',
    options: [
      { value: 1, label: 'One', trigger: '7' },
      { value: 2, label: 'Two', trigger: '7' },
      { value: 3, label: 'Five', trigger: '8' },
    ],
  },
  {
    id: '7',
    message: 'Wrong answer, try again.',
    trigger: '6',
  },
  {
    id: '8',
    message: 'Awesome! You are a telepath!!!!!!!!!!!',
    trigger: '9',
  },
  {
    id: '9',
    message: 'Want some more?',
    trigger: '10',
  },
  {
    id: '10',
    options: [
      { value: 1, label: 'Yes', trigger: '1' },
      { value: 2, label: 'No', trigger: '11' },
    ],
  },
  {
    id: '11',
    component: <Text>CUSTOM TEXT</Text>,
    end: true,
  },
];

storiesOf('ChatBot', module).add('default', () => <ChatBot steps={steps} />);

storiesOf('Src/Button', module)
  .add('default', () => <Button>Button</Button>)
  .add('green', () => <Button backgroundColor="green">Button</Button>)
  .add('disabled', () => <Button disabled>Button</Button>)
  .add('invalid', () => <Button invalid>Button</Button>)
  .add('disabled invalid blue', () => (
    <Button backgroundColor="blue" disabled invalid>
      Button
    </Button>
  ));

storiesOf('Src/ButtonText', module)
  .add('default', () => <ButtonText>ButtonText</ButtonText>)
  .add('red', () => <ButtonText fontColor="red">ButtonText</ButtonText>)
  .add('invalid', () => <ButtonText invalid>ButtonText</ButtonText>)
  .add('green invalid', () => (
    <ButtonText fontColor="green" invalid>
      ButtonText
    </ButtonText>
  ));

storiesOf('Src/Button + Text', module)
  .add('default', () => (
    <Button>
      <ButtonText>Button+Text</ButtonText>
    </Button>
  ))
  .add('disabled', () => (
    <Button disabled>
      <ButtonText>Button+Text</ButtonText>
    </Button>
  ))
  .add('invalid', () => (
    <Button invalid>
      <ButtonText>Button+Text</ButtonText>
    </Button>
  ))
  .add('disabled invalid', () => (
    <Button disabled invalid>
      <ButtonText>Button+Text</ButtonText>
    </Button>
  ));

storiesOf('Src/ChatBotContainer', module).add('default', () => (
  <ChatBotContainer style={{ backgroundColor: 'blue', height: '300px' }}>
    <Text>Text</Text>
  </ChatBotContainer>
));

storiesOf('Src/Footer', module)
  .add('default', () => <Footer>Footer</Footer>)
  .add('blue', () => <Footer color="blue">Footer</Footer>)
  .add('disabled', () => <Footer disabled>Footer</Footer>)
  .add('invalid', () => <Footer invalid>Footer</Footer>)
  .add('blue disabled invalid', () => (
    <Footer color="blue" disabled invalid>
      Footer
    </Footer>
  ));

storiesOf('Src/InputView', module).add('default', () => (
  <InputView>InputView</InputView>
));

storiesOf('Steps/Common/Loading', module)
  .add('default', () => <Loading color="red">InputView</Loading>)
  .add('custom', () => (
    <Loading color="red" custom>
      InputView
    </Loading>
  ));

// storiesOf('Steps/Common/Circle', module).add('default', () => (
//   <Circle radius={150} fill="red" cx={500} cy={500} />
// ));

storiesOf('Steps/Common/Bubbles', module)
  .add('default', () => <Bubbles />)
  .add('red', () => <Bubbles color="red" />)
  .add('blue 50', () => <Bubbles color="blue" size={50} />)
  .add('green 20 100', () => (
    <Bubbles color="green" size={20} spaceBetween={100} />
  ));
