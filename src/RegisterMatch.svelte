<script>
export let connection;

connection.onmessage = message => {
console.log(message);
result = message.data;
};
	
</script>

<main>
	<h2>Registrer match</h2>
</main>

<style type="text/scss">
@import './App.scss';
@import './_variables.scss';



</style>