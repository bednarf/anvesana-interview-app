'use client'
import { Container } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import useHome from '@/hooks/useHome'
import Searchbar from '@/components/Searchbar'

const Home = () => {
    const { options, rows, columns, isLoading, handleSearch } = useHome()

    return (
        <Container
            sx={({ breakpoints }) => ({
                paddingBlock: 10,
                [breakpoints.down('md')]: {
                    paddingBlock: 2,
                },
            })}
        >
            <Searchbar options={options} handleSearch={handleSearch} />
            <DataGrid loading={isLoading} rows={rows} columns={columns} autoHeight />
        </Container>
    )
}

export default Home
