<script>
  import {createEventDispatcher} from "svelte";
  import Slider from 'svelte-materialify/src/components/Slider'

  export let characters = []
  export let rounds = 20
  export let round = 1
  export let absNegativeRounds = null
  export let squareSize = 32
  export let vertical = false

  // $:console.log(activeRows)
  const dispatch = createEventDispatcher();
  const root = document.documentElement;
  let tableGrid

  let verticalClass = vertical ? "trackerGrid--vertical" : ""

  let currentCol = -1;
  let currentRows = [];

  $:styleConfig = [
    `--cell-size: ${squareSize}px`,
    `--col-count: ${rounds + absNegativeRounds}`,
    `--row-count: ${characters.length + 1}`,
  ]

  // Swap two nodes
  function swap(nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
  };

  // Check if `nodeA` is above `nodeB`
  function isAbove(nodeA, nodeB) {
    // Get the bounding rectangle of nodes
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();

    return (rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2);
  }

  // TODO: reorder rows
  // function handleDragStart({target}){
  //   row = target
  // }

  // function handleDragOver({target}) {
  //   let children= Array.from(target.parentNode.parentNode.children);
  
  //   if(children.indexOf(target.parentNode) > children.indexOf(row)){
  //     target.parentNode.after(row);
  //   }
  //   else {
  //     target.parentNode.before(row);
  //   }
  // }

  function childNodeIndex(node) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    if (node.parentElement.nodeType === 1) {
      return [...node.parentElement.children].indexOf(node);
    }
  }

  // function handleMouseMove(e) {
  //   // console.log("Mouse Move", e)
  //   const cell = e.target;
  //   const row = cell.parentNode;
  //   // use data-active attribute or childNodeIndex? Which is faster?
  //   const colIndex = childNodeIndex(cell);
  //   const rowIndex = childNodeIndex(row);
  //   console.log("colIndex: ", colIndex, " | currentIndex: ", currentCol);
  //   console.log("rowIndex: ", rowIndex, " | currentIndex: ", currentRow);
    
  //   if (colIndex !== currentCol) {
  //     currentCol = colIndex;
  //     console.log("tableGrid.style",tableGrid.style)
  //     console.log("tableGrid.style",tableGrid.style)
  //     root.style.setProperty("--grid-col", colIndex + 1);
  //   }
  //   if (rowIndex !== currentRow) {
  //     currentRow = rowIndex;
  //     root.style.setProperty("--grid-row", rowIndex + 2);
  //   }
  // }

  // function handleMouseLeave(e) {
  //   root.style.setProperty("--grid-col", -1);
  //   root.style.setProperty("--grid-row", -1);
  //   currentCol = -1;
  //   currentRow = -1;
  // }

  function customThumb(val){
    return Math.round(rounds - val + 1)
  }

  function handleSliderChange(e){
    const value = e.detail.value[0]
    currentCol = rounds - value + 1
    currentRows = characters.map((character, i) => {
      if(character.attackRounds.includes(currentCol)){
        return i
      }
      return null
    })
  }

</script>

<div bind:this={tableGrid} class="trackerGrid trackerGrid--sticky {verticalClass}" style={[...styleConfig].join(";")}>
  <div class="trackerGrid__viewport">
    <div class="trackerGrid__tableCol--headers">
      <div class="trackerGrid__tableCol trackerGrid__tableCol--name">
        <div class="trackerGrid__tableCol--header"><div></div></div>
        {#each characters as character, i (character.id)}
          <div class:active={currentRows.includes(i)}><div class="truncate">{character.name}</div></div>
        {/each}
      </div>
    </div>
    <div class="trackerGrid__data">
      <div class="trackerGrid__slider">
        <Slider vertical={vertical} class="slider-currentRound" thumb={customThumb} min={1} max={rounds + absNegativeRounds} step={1} bind:value={round} color="secondary" on:update={handleSliderChange} />
      </div>
      <div class="trackerGrid__table" aria-label="Initiative Tracker">
        {#each Array(rounds) as _, i}
          <div class="trackerGrid__tableCol" class:active={rounds - i === currentCol}>
            <div class="trackerGrid__tableCol--header">{rounds - i}</div>
            {#each characters as character, j (character.id)}
              <div>{character.attackRounds.includes(rounds - i) ? "X" : ""}</div>
            {/each}
          </div>
        {/each}
        {#if absNegativeRounds !== null}
          {#each Array(absNegativeRounds) as _, i}
            <div class="trackerGrid__tableCol" class:active={0 - i === currentCol}>
              <div class="trackerGrid__tableCol--header"><div>{0 - i}</div></div>
              {#each characters as character, j (character.id)}
                <div>{character.attackRounds.includes(0 - i) ? "X" : ""}</div>
              {/each}
            </div>
          {/each}
        {/if}
      </div>
    </div>
    <div class="trackerGrid__rowHighlights">
      <div class="trackerGrid__tableRow trackerGrid__tableRow--headers"></div>
      {#each characters as character, i (character.id)}
        <div class="trackerGrid__tableRow" class:active={currentRows.includes(i)}></div>
      {/each}
    </div>

  </div>
</div>

<style>
  :global {
    @import 'trackerFlexGrid';
  }
</style>