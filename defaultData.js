const pizzaItems = [
  {
    id: '7fjh4qqA8pP',
    name: 'Margarita',
    price: 12.50,
    desc: 'Classic italian pizza with tomatos',
    ingredients: ['tomatos', 'cashew cheese', 'basil', 'rosemary'],
    tags: ['soy free'],
    imageSrc: '/images/pizza1.png',
  },
  {
    id: '7fjh4q008pP',
    name: 'Margarita',
    price: 12.50,
    desc: 'Classic italian pizza with tomatos',
    ingredients: ['tomatos', 'cashew cheese', 'basil', 'rosemary'],
    tags: ['soy free'],
    imageSrc: '/images/pizza1.png',
  }
]

const drinksItems = [
  {
    id: '28hjUks764v',
    name: 'Apple pie smoothie',
    price: 5.50,
    desc: 'Raw ingredients whipped in a blender with a complex of vitamins, trace elements, enzymes and fiber',
    ingredients: ['apple fresh', 'cinnamon', 'vanilla', 'cucumber'],
    tags: [],
    imageSrc: '/images/pizza1.png',
  },
  {
    id: '74o0eA8pP',
    name: 'Strawberry cashew smoothie',
    price: 6.70,
    desc: 'Raw ingredients whipped in a blender with a complex of vitamins, trace elements, enzymes and fiber',
    ingredients: ['strawberry', 'oat milk', 'flax seeds', 'cashew'],
    tags: [],
    imageSrc: '/images/pizza1.png',
  },
  {
    id: '74o03eA8pP',
    name: 'Strawberry cashew smoothie2',
    price: 6.70,
    desc: 'Raw ingredients whipped in a blender with a complex of vitamins, trace elements, enzymes and fiber',
    ingredients: ['strawberry', 'oat milk', 'flax seeds', 'cashew'],
    tags: [],
    imageSrc: '/images/pizza1.png',
  }
]

const saladItems = []

module.exports = {
  users: [
    {
      token: 'token_bhje73bkj38jlds9',
      id:  'fsdu274dHsw',
      username: 'admin',
      password: '1234',
    }
  ],
  currency: [
    { id: 'usd', ratio: 1 },
    { id: 'eur', ratio: 0.89 },
  ],
  pizza: pizzaItems,
  drinks: drinksItems,
  salads: saladItems,
}