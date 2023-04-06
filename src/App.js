import { useState, useEffect } from "react";
var singer = prompt("What singer do you want to search for?");
var s = singer;

var num = prompt("How many songs do you want?")
num = Math.floor(num)

singer = encodeURIComponent(singer.trim())
var url = 'https://www.songsterr.com/a/ra/songs/byartists.json?artists=' + singer;
console.log(url)
var comma = s.search(',')

// if , seperate words and rearrange (Swift,Taylor = Taylor Swift)
//else stay the same (Rihanna = Rihanna)
if (comma === -1) {
  console.log(s)
} else {
  s = s.split(',');
  const toIndex = s.length;
  const element = s.splice(0, 1)[0];
  s.splice(toIndex, 0, element);
  s = s[0] + " " + element;
  console.log(s)
}


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(
        (result) => {
          console.log(result)
          setIsLoaded(true);
          setResult(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  var link = "https://www.google.com/search?q=" + s;
  return (
    <div className="container">
      <h1>Search Artist</h1>
      <h2>{s}</h2>
      <div className="list">
        <ul>
          <Body error={error} isLoaded={isLoaded} result={result} />
        </ul>
        <button>
          <a href={link} target="_blank" rel="noreferrer">
            Learn more about {s}!
          </a></button>
      </div>
    </div>
  )
}

function Body({ error, isLoaded, result }) {
  if (error) {
    return <>Sorry, I couldn't find {s}</>;
  } else if (!isLoaded) {
    return <>loading...</>;
  } else {
    return <>
      {result.map((item, index) => {
        //find artist in data array
        if (index < num) {
          if (item.artist.name === s) {
            //later: limit number of songs listed to 10
            return (
              <li key={item.id}>
                {item.title}
              </li>
            )
          }
        }
      })}
    </>
  }
}

export default App;
