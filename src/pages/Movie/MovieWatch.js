import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilmWatch from "~/layout/Components/Film/FilmWatch/FilmWatch";
import * as httpQuest from '~/services/Movie'

function MovieWatch() {
    const { id } = useParams();
    const [data, setData] =  useState();
    useEffect(()=>{
        const callApi = async ()=>{
            const res = await httpQuest.getWatchMovie(id);
            setData(res)
        }
        callApi();
    },[id]);
    return ( <>
        <FilmWatch data={data} media_type="movie"/>
    </> );
}

export default MovieWatch;