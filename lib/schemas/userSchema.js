export default [
  {
    key: 'id',
    types: ['string', 'number'],
    required: true,
  },
  {
    key: 'user',
    types: ['boolean'],
    required: true,
  },
  {
    key: 'message',
    types: ['string', 'function'],
    required: false,
  },
  {
    key: 'trigger',
    types: ['string', 'number', 'function'],
    required: false,
  },
  {
    key: 'validator',
    types: ['function'],
    required: false,
  },
  {
    key: 'delay',
    types: ['number'],
    required: false,
  },
  {
    key: 'end',
    types: ['boolean'],
    required: false,
  },
];
