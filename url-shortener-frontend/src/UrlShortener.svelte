<script>
    let longUrl = '';
    let shortUrl = '';
    let showShortUrl = false;
  
    async function shortenUrl() {
      const response = await fetch("http://localhost:8000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ longUrl }),
      });
  
      if (response.ok) {
        const data = await response.json();
        shortUrl = data.shortKey;
        showShortUrl = true;
      } else {
        console.error("Error:", response.status);
      }
    }
  </script>
  
  <main>
    <h1>URL Shortener</h1>
    <form>
      <input type="text" bind:value={longUrl} placeholder="Enter a long URL">
      <button type="button" on:click={shortenUrl}>Shorten</button>
    </form>
    {#if showShortUrl}
      <div>
        <p>Short URL: localhost:8000/{shortUrl}</p>
        <a href={`http://localhost:8000/${shortUrl}`}>Go to Short URL</a>
      </div>
    {/if}
  </main>
  
  <style>
    main {
      font-family: Arial, sans-serif;
      text-align: center;
      margin-top: 20px;
    }
  
    h1 {
      margin-bottom: 20px;
    }
  
    form {
      margin-bottom: 20px;
    }
  
    input {
      padding: 10px;
    }
  
    button {
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
  
    a {
      color: #007bff;
      text-decoration: none;
      margin-top: 10px;
      display: block;
    }
  </style>
  