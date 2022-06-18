import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default  function Home({allPosts}) {
// create state to hold posts
//



  return (
   <>
   <nav>
    <ul>
      <li>About</li>
      <li>Other stuff</li>
    </ul>
   </nav>
   <h1>All posts </h1>
    <hr />
    <ul>
    {

allPosts.map((post,i)=>{
  return(  <li  key={i}>
    <Link  href={`/post/${post.slug.current}`}>
    <a >
    {post.title}
    </a>
    </Link>
    
    </li>  )
})
}
    </ul>

   </>
  )
}
export  async function getServerSideProps(pageContext){

  const query = encodeURIComponent(`*[_type == "post" ]`);
  const url = `https://tmpcy7lm.api.sanity.io/v1/data/query/production?query=${query}`
  
  const res = await fetch(url).then(res=>{
   
    return res.json() } );
  
  const allPosts = res.result
  console.log(allPosts)
  //is an array of objs
  

  
  
  return{
    props:{
    allPosts:allPosts,
    
      
      
    }

  }


}
