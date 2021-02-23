<script>
  import MaterialApp from 'svelte-materialify/src/components/MaterialApp'
  import Tracker from "./components/Tracker.svelte"
</script>

<style type="text/scss">
  @import 'theme/vars';

  main {
    text-align: center;
    padding: .1em;
    margin: 0 auto;
    max-width: 1240px;
    
  }
  
  h1 {
    color: $color-primary;
    text-transform: uppercase;
    font-size: 2em;
    margin-bottom: 1rem;
    line-height: normal;
    font-weight: 100;
  }

</style>

<MaterialApp>
  <main>
    <h1>Advanced Initiative Tracker</h1>
    <Tracker />
  </main>
</MaterialApp>
