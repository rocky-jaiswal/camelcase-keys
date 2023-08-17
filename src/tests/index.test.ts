import camelcaseKeys from '../index'

describe('camelcaseKeys', () => {
  test('test 1', () => {
    expect(camelcaseKeys({ foo_bar: 1 })).toEqual({ fooBar: 1 })
  })

  test('test 2', () => {
    expect(camelcaseKeys([{ foo_bar: 1 }])).toEqual([{ fooBar: 1 }])
  })

  test('test 3', () => {
    expect(
      camelcaseKeys(
        {
          id: '0001',
          type_name: 'donut',
          common_name: 'Cake',
          ppu: 0.55,
          batters: {
            batter: [
              { id: '1001', type_name: 'Regular' },
              { id: '1002', type_name: 'Chocolate' },
              { id: '1003', 'type-name': 'Blueberry' },
              { id: '1004', 'type-name': "Devil's Food" }
            ]
          },
          topping_name: [
            { id: '5001', type: 'None' },
            { id: '5002', type: 'Glazed' },
            { id: '5005', type: 'Sugar' },
            { id: '5007', type: 'Powdered Sugar' },
            { id: '5006', type: 'Chocolate with Sprinkles' },
            { id: '5003', type: 'Chocolate' },
            { id: '5004', type: 'Maple' }
          ]
        },
        { deep: true }
      )
    ).toEqual({
      id: '0001',
      typeName: 'donut',
      commonName: 'Cake',
      ppu: 0.55,
      batters: {
        batter: [
          { id: '1001', typeName: 'Regular' },
          { id: '1002', typeName: 'Chocolate' },
          { id: '1003', typeName: 'Blueberry' },
          { id: '1004', typeName: "Devil's Food" }
        ]
      },
      toppingName: [
        { id: '5001', type: 'None' },
        { id: '5002', type: 'Glazed' },
        { id: '5005', type: 'Sugar' },
        { id: '5007', type: 'Powdered Sugar' },
        { id: '5006', type: 'Chocolate with Sprinkles' },
        { id: '5003', type: 'Chocolate' },
        { id: '5004', type: 'Maple' }
      ]
    })
  })

  test('test 4', () => {
    expect(camelcaseKeys({ fooBar: 1 })).toEqual({ fooBar: 1 })
    expect(camelcaseKeys({ fooBarBazBatBoo: 1 })).toEqual({ fooBarBazBatBoo: 1 })
    expect(camelcaseKeys({ foo_bar_baz_Bat_Boo: 1 })).toEqual({ fooBarBazBatBoo: 1 })
    expect(camelcaseKeys({ FooBar: 1 })).toEqual({ fooBar: 1 })
    expect(camelcaseKeys({ Foo_Bar: 1 })).toEqual({ fooBar: 1 })
    expect(camelcaseKeys({ Foo_bar: 1 })).toEqual({ fooBar: 1 })
  })
})
