<script>
  import Button from 'svelte-materialify/src/components/Button'
  import TextField from 'svelte-materialify/src/components/TextField'

  import appStore from '../store/appStore'
  import TrackerFlexGrid from './TrackerFlexGrid.svelte'
  import AddCharacterModal from './AddCharacterModal.svelte'
  import { distributeInteger, createUUID } from "../helpers"

  let isDialogOpen = false
  let squareSize = 32

  $:roundsMin = 1
  $:negativeRounds = null
  $:absNegativeRounds = negativeRounds !== null ? Math.abs(negativeRounds - 1) : 0
  $:rounds = 20
  $:round = 1
  let characters = {}

  const unsubscribe = appStore.subscribe(items => characters = items)

  function setRound(add = false){
    if(add){
      if(round < rounds + absNegativeRounds) {
        round++
      }
    } else {
      if(round > roundsMin){
        round--
      }
    }
  }

  function handleKeydown({target, keyCode}){
    // ignore if the event target is the slider
    if(target.getAttribute('role') === 'slider'){
      return false
    }
    // left arrow
    if(keyCode === 37){
      setRound()
    }
    // right arrow
    else if (keyCode === 39) {
      setRound(true)
    }
  }


  function openModal_addCharacter(e){
    isDialogOpen = true
  }

  function changeRounds(e){
    rounds = e.target.valueAsNumber
  }

  function addNewCharacter({detail: character}) {
    const init = parseInt(character.init)
    const attacks = parseInt(character.attacks)
    if(init > rounds) {
      rounds = init
    }
    character.attackRounds = distributeInteger(init,attacks)
    const lowestAttack = Math.min(...character.attackRounds)
    if(lowestAttack < roundsMin) {
      roundsMin = lowestAttack
      negativeRounds = lowestAttack
    }
    character.id = createUUID();
    
    appStore.addCharacter(character)
  }

  function handleSlider(e){
    console.log(e)
  }

  /**
   * TODO:
   * don't know if I like the idea of negative rounds. I think it's better if characters lose actions on very low initiative. Make it a configurable option
   * vertical display - from button or orientation change
   * add duplicate mob - will rename to "mob (1)" and "mob (2)"
   * save data to local storage
   * add character to favorites list
   * make name a Chip component
   * add popover to Chip with configurable stats
   * Make multiple different sessions restorable - new/load landing screen
   * sticky header
   * loading indicator
   * dice roller with roll button
   * rearrange rows, new column layout makes drag and drop impossible. Can programmatically update character order in store. Or drag and drop on names only to trigger store change?
   * 
   *   Chip
   *    remove character
   *    rename character
   *    disable character
   *    status / conditions
   *    init / init bonus
   *    attacks
   *    configurable numerical trackers (perhaps with selectable icons) - add or remove as many as you need - label, max value, current value, color
   *    row color (highlight) - select from swatches
   * 
   *  Configurations
   *    dark mode
   *    custom background
   *    show init
   *    make turn "X" a toggle button - configurable option
   *    allow negative rounds
   *    freeze header
  */

</script>

<style lang="scss">
  @import 'svelte-materialify/src/styles/tools/elevation';
  @import 'svelte-materialify/src/styles/variables';
  // @import 'svelte-materialify/src/components/Table/Table';
  .tracker{
    @include elevation(4);
    padding: 10px;
    overflow: hidden;
    @media #{map-get($display-breakpoints, "sm-and-down")} {
      flex-grow: 1;
    }
  }
  .tracker__wrapper {
    display: inline;
  }
  .action {
    margin-top: 20px;
  }
  .rounds {
    display: inline-block;
    width: 100px;
  }
</style>


<svelte:window on:keydown={handleKeydown}/>
<div class="tracker">
  <div class="s-table__wrapper tracker__wrapper" style="--cell-size: {squareSize}px; --rounds: {rounds}; --negative-rounds: {absNegativeRounds}">
    <TrackerFlexGrid
      characters={characters}
      rounds={rounds}
      round={round}
      absNegativeRounds={absNegativeRounds}
      on:slider={handleSlider}
    />
  </div>
</div>
<div class="action">
  <div class="rounds">
    <TextField class="d-inline-block" type="number" outlined value={rounds} min="1" max="36" on:change={changeRounds}>Rounds</TextField>
  </div>
  <div>
    <Button class="d-inline-block" on:click={openModal_addCharacter} touch variant="unelevated">Add Character</Button>
  </div>
</div>

<AddCharacterModal on:newCharacter={addNewCharacter} bind:active={isDialogOpen} />
