
import styles from "../../styles/Post.module.css"
import imageUrlBuilder from "@sanity/image-url"
import {useEffect , useState} from 'react'
import Img from "next/Image";
import BlockContent from "@sanity/block-content-to-react"
// import sanity clietn
import { sanityClient } from "@sanity/client";

import { useNextSanityImage } from 'next-sanity-image';
import PortableText from "@portabletext/react";

export default function Post({title,body,image,portableTextContent}) {

  const [imageUrl, setImageUrl] = useState('')
  useEffect(()=>{
    const imgBuild = imageUrlBuilder({
      projectId:'tmpcy7lm',
      dataset:'production'
    }).image(image);

// after building the url 
//add the url to state

 setImageUrl(imgBuild);

  },[image])
  
  const imageProps = useNextSanityImage(
    {
      
          projectId:'tmpcy7lm',
      dataset:'production',
      useCdn: true
    },
    image
    );
console.log(image)
  return (
    <div className={styles.main}>
      
      
      
       <h1>{title}</h1>
    {/* 
    How to use next/Image with sanity to create an acceptable URL for the Image element
    https://stackoverflow.com/questions/64909447/got-an-error-invalid-src-prop-here-is-a-link-on-next-image-hostname-loca
    
    
    */}
    {imageUrl ? <Img loader={() => imageUrl.url()}  src={imageUrl.url()} width={500} height={500}
    /> : null}
    
<div className="post-content">

<BlockContent blocks={body}></BlockContent>

</div>

    </div>
  )
}

export  async function getServerSideProps(pageContext){
const pageSlug = pageContext.query.slug;

// if no slug 

if(!pageSlug){
  return{
    notFound:true
  }
}

const query = encodeURIComponent(`*[_type == "post" && slug.current == "${pageSlug}"]`);
const url = `https://tmpcy7lm.api.sanity.io/v1/data/query/production?query=${query}`

const res = await fetch(url).then(res=>{

  return res.json() } );

const post = res.result[0]
// console.log(res)

if(!post){
  return{
    notFound:true
  }
}else{
  return{
    props:{
      title:post.title,
      body:post.body,
      image:post.mainImage,
      
      
    }

  }
}


}