import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    query,
    where,
  } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

const Detail = ({setActive , user}) => {
    const { id } = useParams();
    // const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState(null);
    // const [blogs, setBlogs] = useState([]);
    // const [tags, setTags] = useState([]);
    // const [comments, setComments] = useState([]);
    // let [likes, setLikes] = useState([]);
    // const [userComment, setUserComment] = useState("");
    // const [relatedBlogs, setRelatedBlogs] = useState([]);

    useEffect(() => {
        id && getBlogDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [id]);

      const getBlogDetail = async () => {
        // setLoading(true);
        const blogRef = collection(db, "blogs");
        const docRef = doc(db, "blogs", id);
        const blogDetail = await getDoc(docRef);
        const blogs = await getDocs(blogRef);
        let tags = [];
        blogs.docs.map((doc) => tags.push(...doc.get("tags")));
        // let uniqueTags = [...new Set(tags)];
        // setTags(uniqueTags);
        setBlog(blogDetail.data());
        const relatedBlogsQuery = query(
          blogRef,
          where("tags", "array-contains-any", blogDetail.data().tags, limit(3))
        );
        // setComments(blogDetail.data().comments ? blogDetail.data().comments : []);
        // setLikes(blogDetail.data().likes ? blogDetail.data().likes : []);
        const relatedBlogSnapshot = await getDocs(relatedBlogsQuery);
        const relatedBlogs = [];
        relatedBlogSnapshot.forEach((doc) => {
          relatedBlogs.push({ id: doc.id, ...doc.data() });
        });
        // setRelatedBlogs(relatedBlogs);
        setActive(null);
        // setLoading(false);
      };

  return (
    <div className="single">
        <div className="blog-title-box" style={{backgroundImage: `url('${blog?.imgUrl}')`}}>
            <div className="overlay"> </div>
              <div className="blog-title">
                <span>{blog?.timestamp.toDate().toDateString()}</span>
                <h2>{blog?.title}</h2>
              </div>
           
        </div>
        <div className="container-fluid pb-4 pt-4 padding blog-single-content">
            <div className="container padding">
                <div className="row mx-0">
                    <div className="col-md-8">
                        <span className="meta-info text-start">
                            By <p className="author">{blog?.author}</p> -&nbsp;
                            {blog?.timestamp.toDate().toDateString()}
                        </span>
                        <p className="text-start">{blog?.description}</p>
                    </div>
                    <div className="col-md-3">
                        <h2>Tags</h2>
                        <h2>Most Popular</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Detail