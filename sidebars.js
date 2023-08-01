module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'overview',
    },
    {
      type: 'category',
      label: 'Marina',
      items: [
        'marina/introduction',
        'marina/getting-started',
        'marina/connect',
        'marina/balances',
        'marina/transaction',
        'marina/api',
        'marina/ionio-example',
      ],
    },
    {
      type: 'category',
      label: 'Nigiri',
      items: [
        'nigiri/introduction',
        'nigiri/getting-started',
        'nigiri/tasting',
        'nigiri/nutrition-facts'
      ]
    },
    {
       type: 'category',
       label: 'Taxi',
       items: [
         'taxi/introduction',
         'taxi/topup-with-asset'
       ]
     },
     /* {
       type: 'category',
       label: 'LDK',
       items: [
         'ldk/introduction'
       ]
     }, */
  ]
};
