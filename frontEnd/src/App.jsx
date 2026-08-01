import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'

function App() {

  //const [products,error,loading] = customReactQuery("http://localhost:3000/api/products")

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const controller = new AbortController()

      ; (async () => {
        try {
          setError(false)
          setLoading(true)

          const response = await axios.get(`/api/products?search=${searchTerm}`,
            {
              signal: controller.signal,
            }
          );

          console.log(response.data)
          setProducts(response.data)
          setLoading(false)
        } catch (error) {
          if (axios.isCancel(error)) {
            console.log('Request canceled:', error.message)
          } else {
            console.error('Error fetching products:', error)
            setLoading(false)
            setError(true)
          }

        }
      })()

    //cleanUp
    return () => {
      controller.abort()
    }
  }, [])

  if (error) {
    return <h1> Error fetching products. Please try again later.</h1>
  }

  if (loading) {
    return <h1> Loading products...</h1>
  }

  return (
    <>
      <h1> hello api handling </h1>
      <input type="text" placeholder='search'
        onChange={(e) => {
          const search = e.target.value.toLowerCase()
          const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(search)
          );
          setProducts(filteredProducts);

        }}
      />

      <h1> total number of products: {products.length}</h1>
    </>
  )
}

export default App

// const customReactQuery = (url) => {
//   const [products, setProducts] = useState([])
//   const [error, setError] = useState(false)
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     (async () => {
//       try {
//         setError(false);
//         setLoading(true);

//         const response = await axios.get(url);
//         console.log(response.data);
//         setProducts(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching products:', err);
//         setLoading(false);
//         setError(true);
//       }
//     })();
//   }, []);

//   return [products, error, loading]

// }

