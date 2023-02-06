import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import HeroSlider from '~/layout/Components/HeroSlider';
import SlideCard from '~/layout/Components/SlideCard/SlideCard';
import * as homeApi from '~/services/Home';

function Home() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const callApi = async () => {
            const res = await homeApi.getHomeMovies();
            setData(res);
        };
        callApi();
    }, []);
    return (
        <Grid container direction={'column'} width={'100%'} spacing={3}>
            <Grid item width={'100%'}>
                <HeroSlider data={data?.Trending} />
            </Grid>

            {
                Object.entries(data).filter((section)=> section[0] !== 'Trending')
                .map((section, index)=>{
                    return (
                    <SlideCard key={index} title={section[0]} data={section[1]}></SlideCard>
                    )
                })
            }
            {/* <Grid item width={'100%'}>
                <SlideCard data={data?.Popular}/>
            </Grid>
            <Grid item width={'100%'}>
                <SlideCard data={data?.TopRated}/>
            </Grid> */}
        </Grid>
    );
}
export default Home;
