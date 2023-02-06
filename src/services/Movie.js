import PropTypes from 'prop-types';
import * as httpRequest from '~/util/httpRequest';

export const getMovieFullDetail = async (id) => {
    const response = await Promise.all([
        httpRequest.get(`/movie/${id}`),
        httpRequest.get(`/movie/${id}/credits`),
        httpRequest.get(`/movie/${id}/reviews`),
        httpRequest.get(`/movie/${id}/similar`),
        httpRequest.get(`/movie/${id}/videos`),
        httpRequest.get(`/movie/${id}/recommendations`),
    ]);
    const movieInfo = response.reduce((final, current, index) => {
        // eslint-disable-next-line default-case
        switch (index) {
            case 0:
                final.detail = { ...current, media_type: 'movie' };
                break;

            case 1:
                final.credits = current.cast.slice(0, 8);
                break;

            case 2:
                final.reviews = current.results.filter((item) => item.author !== 'MSB');
                break;

            case 3:
                final.similar = current.results.map((item) => ({
                    ...item,
                    media_type: 'movie',
                }));
                break;

            case 4:
                final.videos = current.results
                    .filter((item) => item.site === 'YouTube')
                    .reduce((acc, current) => {
                        if (current.type === 'Trailer') return [current, ...acc];
                        else return [...acc, current];
                    }, []);
                break;
            case 5:
                final.recommendations =current.results.map((item) => ({
                    ...item,
                    media_type: 'movie',
                }));
                break;
        }
        return final;
    }, {});

    return movieInfo;
};

getMovieFullDetail.prototype = {
    id: PropTypes.number,
};

export const getWatchMovie = async (id) => {
    const res = await Promise.all([httpRequest.get(`/movie/${id}`), httpRequest.get(`/movie/${id}/recommendations`)]);

    return {
        detail: res[0],
        recommendations: res[1].results.filter((item) => item.poster_path),
    };
};
