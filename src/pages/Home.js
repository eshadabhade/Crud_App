import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function Home() {
  const [query, setQuery] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);

      const response = await axios.get("http://localhost:3004/employees");

      setPosts(response.data);
      setLoading(false);

    }
    loadPost();
  }, []);

  const removeData = (id) => {

    toast.error('Please Wait !', {
      position: toast.POSITION.TOP_RIGHT
    });
    setTimeout(() => {
      let url = `http://localhost:3004/employees/${id}`
      axios.delete(url).then(res => {
        const del = posts.filter(post => id !== post.id)
        setPosts(del)
        console.log("res", res)

      })

    }, 5000);

  }

  return (

    <div className='container py-5'>
      <div className="container">
        <input type="text" className="Search" placeholder="Search here" onChange={event => setQuery(event.target.value)} /><hr />
      </div><br></br>

      <table className='table'>
        <thead>
          <th>No.</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Action</th>
        </thead>
        <tbody>
          {
            (posts.filter(post => {
              if (query === '') {
                return post;
              } else if (post.firstName.toLowerCase().includes(query.toLowerCase())) {
                return post;
              }
            }).map((item) => (


              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.gender}</td>
                <td className='btnaction'>



                  <Link className='btn btn-success' to={`/Edit/${item.id}`}>Edit</Link>
                  &nbsp; &nbsp;
                  <button className='btn btn-danger' onClick={() => removeData(item.id)}>Delete</button>
                  <ToastContainer />
                </td>
              </tr>
            )
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
export default Home;
