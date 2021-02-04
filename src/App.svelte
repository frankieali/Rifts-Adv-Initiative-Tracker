<script>
  import Tracker from "./components/Tracker.svelte"
</script>

<style type="text/scss">
  @import './theme/vars';

  main {
    text-align: center;
    padding: .1em;
    margin: 0 auto;
    
  }
  
  h1 {
    color: $color-primary;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

</style>

<main>
  <h1>Advanced Initiative Table</h1>
  <Tracker />
</main>
