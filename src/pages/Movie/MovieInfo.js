import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilmBannerInfo from '~/layout/Components/Film/FilmInfo/FilmBannerInfo';
import FilmTabInfo from '~/layout/Components/Film/FilmInfo/FilmTabInfo';
import * as movieApi from '~/services/Movie';

const MovieInfo = () => {
    const id = useParams();
    const [data, setData] = useState();
    useEffect(() => {
        const callApi = async () => {
            if (id) {
                const res = await movieApi.getMovieFullDetail(id.id);
                setData(res);
            }
        };
        callApi();
    }, [id]);
    return (
        <Grid container direction={'column'} spacing={2}>
            <Grid item xs={12} width='100%'> 
                <FilmBannerInfo data={data}/>
            </Grid>
            <Grid item xs={12} width='100%'>
                <FilmTabInfo data={data}/>
            </Grid>
        </Grid>
    );
};

export default MovieInfo;
