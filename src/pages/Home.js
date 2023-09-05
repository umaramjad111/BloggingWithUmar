import {
    collection,
    deleteDoc,
    doc,
    onSnapshot 
  } from "firebase/firestore";
import React, {useState , useEffect} from "react";
import { db } from "../firebase";
import BlogSection from "../components/BlogSection";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";


const Home = ({ setActive, user, active }) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // getTrendingBlogs();
        // setSearch("");
        const unsub = onSnapshot(
          collection(db, "blogs"),
          (snapshot) => {
            let list = [];
            // let tags = [];
            snapshot.docs.forEach((doc) => {
            //   tags.push(...doc.get("tags")); 
              list.push({ id: doc.id, ...doc.data() });
            });
            // const uniqueTags = [...new Set(tags)];
            // setTags(uniqueTags);
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
        //   getTrendingBlogs();
        };
      }, []);

      if(loading){
        return <Spinner/>
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
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
          <h2>Trending</h2>
          <div className="col-md-8">
          <BlogSection blogs={blogs} user={user} handleDelete={handleDelete} />
          </div>
          <div className="col-md-3">
            <h2>Tags</h2>
            <h2>Most Popular</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
