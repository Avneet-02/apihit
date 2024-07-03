
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [mydata, setMyData] = useState([]);
  const [isError, setIsError] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setMyData(res.data))
      .catch((error) => setIsError(error.message));
  }, []);
  
  return (
    <>
      <h1>Axios Tutorial</h1>
      {isError && <h2>{isError}</h2>}
      {selectedPost ? (
        <div className="detail-view">
          <h2>{selectedPost.title.toUpperCase()}</h2>
          <p>{selectedPost.body}</p>
          <button onClick={() => setSelectedPost(null)}>Back</button>
        </div>
      ) : (
        <div className="grid">
          {mydata.map((post) => {
            const { id, title, body } = post;
            return (
              <div className="card" key={id} onClick={() => setSelectedPost(post)}>
                <h2>{title.slice(0, 15).toUpperCase()}</h2>
                <p>{body.slice(0, 100)}</p>
              </div>  
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
