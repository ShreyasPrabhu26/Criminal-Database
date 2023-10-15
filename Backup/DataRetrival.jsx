  // const [criminals, setCriminals] = useState(null);
  // const [tags, setTags] = useState(null);

  // useEffect(() => {
  //   const getCriminalData = async () => {
  //     const blogRef = collection(db, "criminals");
  //     const blogs = await getDocs(blogRef);
  //     setCriminals(blogs.doc.map((doc) => ({ id: doc.id, ...doc.data() })));
  //     let tags = [];
  //     blogs.docs.map((doc) => tags.push(...doc.get("tags")));
  //     let uniqueTags = [...new Set(tags)]
  //     setTags(uniqueTags)
  //   }

  //   getCriminalData()
  // }, [])