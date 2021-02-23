<script>
  import { createEventDispatcher } from "svelte"
  import AppBar from 'svelte-materialify/src/components/AppBar'
  import Button from 'svelte-materialify/src/components/Button'
  import Dialog from 'svelte-materialify/src/components/Dialog'
  import Tabs, { Tab } from 'svelte-materialify/src/components/Tabs'
  import TextField from 'svelte-materialify/src/components/TextField'
  import Window, { WindowItem } from 'svelte-materialify/src/components/Window'

  export let active = false

  const dispatch = createEventDispatcher()
  let activeTab = 0;
  // let firstInput = null;

  const newCharacterDefaults = {
    name: "",
    attacks: 0,
    init: 0
  }

  $:newCharacter = {...newCharacterDefaults}
  
  function addCharacter(e) {
    console.log(newCharacter)
    // appStore.addCharacter(character)
    dispatch('newCharacter',newCharacter)
    newCharacter = {...newCharacterDefaults}
    // firstInput.focus()
  }

  function cancelAddCharacter(e){
    active = false
  }

</script>

<style type="text/scss">
  :global {
    .s-dialog__content {
      .s-window {
        width: auto;
      }
    }
  }
  #addCharacterForm {
    display: flex;
    flex-direction: column;
  }

  .form--input, .form--action {
    margin: 10px 0;
  }
  .flex-row, .form--action {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > * {
      margin: 5px;

      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }

</style>

<Dialog 
  bind:active 
  aria-labelledby="event-title" 
  aria-describedby="event-content"
>
  <AppBar>
    <span slot="title">Add Character</span>
    <div slot="extension">
      <Tabs bind:value={activeTab} fixedTabs>
        <div slot="tabs">
          <Tab>New Mob</Tab>
          <Tab>Favorites</Tab>
        </div>
      </Tabs>
    </div>
  </AppBar>
  <Window value={activeTab} class="ma-4">
    <WindowItem class="tab-window">
      <div>
        <form id="addCharacterForm" on:submit|preventDefault={addCharacter}>
          <div class="form--input">
            <TextField class="form--input-name" name="addChar_name" outlined bind:value={newCharacter.name}>Name</TextField>
          </div>
          <div class="flex-row">
            <div class="form--input">
              <TextField name="addChar_attacks" type="number" outlined bind:value={newCharacter.attacks}># of Attacks</TextField>
            </div>
            <div class="form--input">
              <TextField name="addChar_init" type="number" outlined bind:value={newCharacter.init}>Initiative</TextField>
            </div>
          </div>
          <div class="form--action">
            <Button type="submit">
              Add
            </Button>
            <Button on:click={cancelAddCharacter}>
              Close
            </Button>
          </div>
        </form>
      </div>
    </WindowItem>
    <WindowItem>
      <div>
        Favorite List
      </div>
    </WindowItem>
  </Window>
</Dialog>