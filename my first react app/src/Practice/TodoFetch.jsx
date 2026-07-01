import { useState, useEffect } from 'react';

function TodoFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError("Something went wrong!");
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;
if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
  <ul style={{ color: "white", padding: "20px" }}>
    {data.map((item) => (
      <li key={item.id}>{item.title}</li>
    ))}
  </ul>
);
}

export default TodoFetch;