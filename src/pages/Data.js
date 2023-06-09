import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Data() {
    const [loading,setLoading]=useState(false);
    const [posts, setPosts]=useState([]);
  
    useEffect(() => {
      const loadPost = async() =>{
        setLoading(true);
  
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts/");
  
        setPosts(response.data);
        setLoading(false);
  
      }
      loadPost();
    },[]);
    
  
    
    return (
      <>
          <div className="Data">
              {loading ? (
                  <h4>Loading...</h4>) :
                  (posts.map((item) => 
                      <h4>{item.id} {item.title}</h4>)
                  )
              }
          </div>
      </>
  );
  }
  
  export default Data;