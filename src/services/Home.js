
import * as httpRequest from '~/util/httpRequest';


// export const getMovieHome = async ()=>{
//     const endpoints= {
//         Trending: "/trending/movie/day",
//         Popular: "/movie/popular",
//         "Top Rated": "/movie/top_rated",
//         Hot: "/trending/movie/day?page=2",
//         Upcoming: "/movie/upcoming",
//       };

//     const res =  await httpRequest.get(endpoints.Trending)


//     return res.results;
// }

export const getHomeMovies = async ()=> {
  const endpoints= {
    Trending: "/trending/movie/day",
    Popular: "/movie/popular",
    "Top Rated": "/movie/top_rated",
    Hot: "/trending/movie/day?page=2",
    Upcoming: "/movie/upcoming",
  };

  const responses = await Promise.all(
    Object.entries(endpoints).map((endpoint) => httpRequest.get(endpoint[1]))
  );

  const data = responses.reduce((final, current, index) => {
    final[Object.entries(endpoints)[index][0]] = current.results.map(
      (item) => ({
        ...item,
        media_type: "movie",
      })
    );

    return final;
  },[]);

  return data;
};
