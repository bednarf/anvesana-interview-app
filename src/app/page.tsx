'use client'
import { Autocomplete, Box, Button, Container, TextField } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// TODO: refactor
const options = ['BRCA1', 'TP53', 'EGFR', 'KRAS', 'ALK', 'PTEN', 'FLT3', 'MYC', 'MAP2K1', 'NOTCH1']
const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 230 },
    { field: 'email', headerName: 'E-mail', width: 230 },
    { field: 'body', headerName: 'Body', flex: 1 },
]

const Home = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const [query, setQuery] = useState<string | null>(searchParams.get('query'))
    // TODO: add error handling
    const { data, isFetching } = useQuery({
        queryKey: ['fetchComments', searchParams.get('query')],
        queryFn: async (queryArgs) => {
            const response = await axios.get(
                // TODO: move url to env
                `https://jsonplaceholder.typicode.com/comments?${queryArgs.queryKey[1] ? `postId=${queryArgs.queryKey[1]}` : ''}`,
            )
            return response.data
        },
    })

    const handleSearch = useCallback(() => {
        const params = new URLSearchParams(searchParams)
        if (!!query) {
            params.set('query', query)
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    }, [pathname, query, replace, searchParams])

    return (
        // TODO: responsivity
        <Container sx={{ paddingBlock: 10 }}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 4 }}>
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
                            onChange={(event) => {
                                setQuery(event.target.value)
                            }}
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                    value={query ? query : undefined}
                    onChange={(event, value) => {
                        setQuery(value)
                    }}
                    sx={{ width: 300 }}
                    size={'small'}
                />
                <Button variant={'contained'} startIcon={<SearchRoundedIcon />} onClick={handleSearch}>
                    {'Search'}
                </Button>
            </Box>
            <DataGrid loading={isFetching} rows={data || []} columns={columns} autoHeight />
        </Container>
    )
}

export default Home
