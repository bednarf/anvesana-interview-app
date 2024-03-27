import { ChangeEvent, FC, KeyboardEventHandler, SyntheticEvent, useCallback, useState } from 'react'
import { Autocomplete, Box, Button, TextField } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { useSearchParams } from 'next/navigation'
import { HandleSearchType } from '@/utils/types'

interface Props {
    options: string[]
    handleSearch: HandleSearchType
}

const Searchbar: FC<Props> = ({ options, handleSearch }) => {
    // Hooks
    const searchParams = useSearchParams()

    // States
    const [query, setQuery] = useState<string | null>(searchParams.get('query'))

    // Callbacks
    const handleAutocompleteChange = useCallback<(event: SyntheticEvent, value: string) => void>((event, value) => setQuery(value), [])
    const handleTextFieldChange = useCallback<(event: ChangeEvent<HTMLInputElement>) => void>((event) => setQuery(event.target.value), [])
    const handleTextFieldKeyDown = useCallback<KeyboardEventHandler>(
        (event) => {
            if (event.key === 'Enter' || event.key === 'NumpadEnter') {
                handleSearch(query)
            }
        },
        [query],
    )
    const handleSearchClick = useCallback<() => void>(() => handleSearch(query), [query])

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                marginBottom: 4,
            }}
        >
            <Autocomplete
                freeSolo
                id={'search-input'}
                disableClearable
                options={options}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={'Search'}
                        value={query}
                        onChange={handleTextFieldChange}
                        onKeyDown={handleTextFieldKeyDown}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
                value={query ? query : undefined}
                onChange={handleAutocompleteChange}
                sx={{ width: 300 }}
                size={'small'}
            />
            <Button variant={'contained'} startIcon={<SearchRoundedIcon />} onClick={handleSearchClick}>
                {'Search'}
            </Button>
        </Box>
    )
}

export default Searchbar
