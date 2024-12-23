import React, { useState, useEffect } from "react";

function Home() {
  const [data, setData] = useState(null);
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      console.log(response.ok);
      const result = await response.json();

      console.log("Data fetched successfully");

      setData(result);
    } catch (err) {
      setError(err.message);
      console.log("Error fetching data:", err.message);
    } finally {
      setLoading(false);
      console.log("Fetching data finished");
    }
  };

  useEffect(() => {
    fetchData();
  }, [change]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {/* <button onClick={() => setChange(!change)}>Refetch Posts</button> */}
      <button onClick={() => fetchData()}>Refetch Posts</button>
      {/* ok ye set chnge q lgaya was q */} ok thkx
      <ul>
        {data?.map((post) => {
          return (
            <li key={post.id}>
              <strong>{post.title}</strong>: {post.body}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
