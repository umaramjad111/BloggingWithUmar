import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import BlogSection from "../components/BlogSection";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";
import Trending from "../components/Trending";
import Blogger from "../statics/images/blogger.png"


const Home = ({ setActive, user, active }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };

  useEffect(() => {
    getTrendingBlogs();
    // setSearch("");
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        // setTotalBlogs(list);
        setBlogs(list);
        setLoading(false);
        setActive("home");
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
      getTrendingBlogs();
    };
  }, [setActive, active]);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className='container-fluid'>
      <div className="row  p-5 flex align-items-center text-white" style={{minHeight:"550px" , background:"#EEEEEE"}}>
            <div className="col-md-6">
              {/* <h2 className='text-start'>Ignite Your Imagination, Illuminate Your World</h2>
              <p>Discover a world of knowledge, creativity, and insight as we delve into [Your Blog's Niche]. Our mission is to empower, educate, and entertain our readers through thought-provoking articles, in-depth guides, and captivating stories</p> */}
             <div class="auto-write-container">
              <span class="typed-text illuminate text-black text-start">
              Ignite Your Imagination, Illuminate <br />{" "}
                <span
                 className='heading-main'
                >
                  Your World
                </span>{" "}
              </span>
                  
            <p className='text-black text-start'>Discover a world of knowledge, creativity, and insight as we delve into. Our mission is to empower, educate, and entertain our readers through thought-provoking articles, in-depth guides, and captivating stories</p> 
            </div>
            </div>
            <div className="col-md-6">
              <img src={Blogger} alt="blogger" style={{width:"100%" , height:"auto"}} />
            </div>

           </div>
      </div>
   
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
          <Trending blogs={trendBlogs} />
          <div className="col-md-8">
            <BlogSection
              blogs={blogs}
              user={user}
              handleDelete={handleDelete}
            />
          </div>
          <div className="col-md-3">
            <Tags tags={tags} />
            <MostPopular blogs={blogs} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
