import * as httpRequest from '~/util/httpRequest';

export const search = async (query, language = 'en', page = 1, include_adult = false) => {
    try {
        
        const res = await httpRequest.get('/search/movie', {
            params: {
                query,
                language,
                page,
                include_adult,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
