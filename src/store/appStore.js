import { writable } from "svelte/store";

const store = writable([
  {
    id: "5f59e1dc-064a-4dbf-8a99-b59363298e11",
    name: "Frank",
    init: 18,
    attacks: 2,
    attackRounds: [18,9]
  },
  {
    id: "ad39dc31-483a-4bcf-aeec-480b16e9dcf1",
    name: "Tim",
    init: 12,
    attacks: 3,
    attackRounds: [12,8,4]
  },
  {
    id: "9395d07a-19a8-4ad5-9035-3e62f0a721d0",
    name: "Joe",
    init: 6,
    attacks: 4,
    attackRounds: [6,4,3,1]
  },
  {
    id: "13005523-faa1-42e1-9f46-47cd56f032fb",
    name: "Jason",
    init: 10,
    attacks: 2,
    attackRounds: [10,5]
  },
  {
    id: "5303a6b3-2246-4a5a-8e27-d8d501106a8d",
    name: "Eric",
    init: 3,
    attacks: 19,
    attackRounds: [19,13,7]
  },
  {
    id: "b17b7a27-f3db-4329-a2ad-6b032ac3e45a",
    name: "Ed",
    init: 5,
    attacks: 2,
    attackRounds: [5,3]
  },
  {
    id: "b4eefe79-ddc4-4b43-9e1a-c76e7eb759bd",
    name: "Neil",
    init: 17,
    attacks: 2,
    attackRounds: [17,8]
  }
])

const appStore = {
  subscribe: store.subscribe,
  set: store.set,
  addCharacter: (data) => store.update((items) => [...items, data])
}

export default appStore