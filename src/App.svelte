<script>
  import { getResultByResponseMessage } from "../utils/websocket-messages.js";
  let name = "Fredrik";
  let result_1 = 0;
  let result_2 = 0;
  import RegisterMatch from "./RegisterMatch.svelte";
  import ResultList from "./ResultList.svelte";
  let connection;

  try {
    connection = new WebSocket("ws://192.168.2.7:8080/ws");

    connection.onopen = () => {
      console.log("WebSocket Connected :)");
    };
    connection.onmessage = message => {
      result_1 = getResultByResponseMessage(message.data, "score_1");
      result_2 = getResultByResponseMessage(message.data, "score_2");
    };
  } catch(e) {
    console.error(e);
  }



  function increment(id, team) {
    const increment_key = `increment_score_${id}`;
    connection.send(
      JSON.stringify({
        [increment_key]: 1,
        team: team
      })
    );
  }
  function decrement(id, team) {
    const increment_key = `increment_score_${id}`;

    connection.send(
      JSON.stringify({
        [increment_key]: -1,
        team: team
      })
    );
  }
</script>

<style type="text/scss">
  @import "./App.scss";
  @import "./_variables.scss";
  main {
    text-align: center;
    padding: 1em;
    max-width: 450px;
    margin: auto;
    background: $secondary;
    padding: 20px 40px;

    h1 {
      color: $black;
    }
    button.player__button  {
      margin: 0;
      padding: 1rem;
      min-height: 100%;
      min-width: 0;
      height: 100%;
      width: auto;
    }

    .player {
      padding: 1rem;
      .player--title {
        font-size: 2rem;
        margin: 0;
      }

      .player--result {
        padding: 1rem 0;
      }
    }
         
  }

  @media only screen and (min-width: 600px) {
    main {
      margin-top: 60px;
    }
  }
</style>

<main>
  <!-- <RegisterMatch connection={connection} /> -->
  <ResultList />
  <h2>Spiller 1</h2>
  <button on:click={() => increment(1, 1)}>+</button>
  {result_1}
  <button on:click={() => decrement(1, 1)}>-</button>

  <div class="player">
    <h2 class="player--title">Spiller 2</h2>
    <button
      class="player__button"
      on:click={() => increment(2, 2)}>
      +
    </button>
    <p class="player--result">{result_2}</p>
    <button
      class="player__button"
      on:click={() => decrement(2, 2)}>
      -
    </button>
  </div>

</main>
