import { useEffect, useRef, useState } from 'react';
import { alpha, Box, CircularProgress, InputBase, Stack, styled } from '@mui/material';
import HeadlessTippy from '@tippyjs/react/headless';
//icon
import { MagnifyingGlass, SpinnerGap, XCircle } from 'phosphor-react';
//custom hook
import useDebounce from '~/hook/useDebounce';
//components
import * as searchRequest from '~/services/SearchServices';
import SearchResultItem from './SearchResultItem';
import theme from '~/themes';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '220px',
    height: '36px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F2F3F7',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.1),
    },
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
        },
    },
}));

function SearchHeader() {
    //search query
    const [searchTerm, setSearchTerm] = useState('');
    // API search results
    const [results, setResults] = useState([]);
    const [showResult, setShowResult] = useState(false);
    // Searching status (whether there is pending API request)
    const [isSearching, setIsSearching] = useState(false);
    //hook debounce
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    //ref input
    const inputRef = useRef(null);
    // Effect for API call
    useEffect(
        () => {
            if (!debouncedSearchTerm.trim()) {
                setResults([]);
                return;
            }
            if (debouncedSearchTerm) {
                setIsSearching(true);
                const ApiRequest = async () => {
                    const res = await searchRequest.search(debouncedSearchTerm);
                    setResults(res.results.filter((item) => item.poster_path != null));
                    setIsSearching(false);
                    console.log(res.results);
                };
                ApiRequest();
            } else {
                setResults([]);
                setIsSearching(false);
            }
        },
        [debouncedSearchTerm], // Only call effect if debounced search term changes
    );
    const handleClear = () => {
        setSearchTerm('');
        setResults([]);
        inputRef.current.focus();
    };
    //
    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchTerm(searchValue);
        }
    };

    return (
        <>
            <HeadlessTippy
                interactive
                visible={showResult && results.length > 0}
                placement="bottom"
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div className="box" tabIndex="-1" {...attrs} style={{ margin: 0 }}>
                        <SearchResultItem data={results} />
                    </div>
                )}
            >
                <div style={{ margin: '0 !important' }}>
                    <Search>
                        <SearchIconWrapper>
                            <MagnifyingGlass size={20} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            value={searchTerm}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleChange}
                            ref={inputRef}
                            onFocus={() => setShowResult(true)}
                        />
                        <Box
                            sx={{
                                height: '20px',
                                width: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '10px'
                            }}
                        >
                            {!!searchTerm && !isSearching && (
                                <Stack onClick={handleClear} size="small" p={1}>
                                    <XCircle size={20} />
                                </Stack>
                            )}
                            {isSearching && <CircularProgress size={15} color={'grey'} sx={{ fontSize: '0.8rem' }} />}
                        </Box>
                    </Search>
                </div>
            </HeadlessTippy>
        </>
    );
}

export default SearchHeader;
