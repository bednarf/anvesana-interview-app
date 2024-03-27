import { GridColDef } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { HandleSearchType, JsonPlaceholderComment } from '@/utils/types'

interface UseHomeResult {
    options: string[]
    rows: JsonPlaceholderComment[]
    columns: GridColDef[]
    isLoading: boolean
    handleSearch: HandleSearchType
}

const useHome = (): UseHomeResult => {
    // Hooks
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    // Queries
    const { data: options, isFetching: isOptionsFetching } = useQuery({
        queryKey: ['getSearchOptions'],
        queryFn: () => mockedOptions,
    })
    const { data: rows, isFetching: isRowsFetching } = useQuery({
        queryKey: ['fetchComments', searchParams.get('query')],
        queryFn: async (queryArgs) => {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/comments?${queryArgs.queryKey[1] ? `postId=${queryArgs.queryKey[1]}` : ''}`,
            )
            return response.data
        },
        throwOnError: true,
    })

    // Memos
    const isLoading = isOptionsFetching || isRowsFetching

    // Callbacks
    const handleSearch = useCallback(
        (query: string | null) => {
            const params = new URLSearchParams(searchParams)
            if (!!query) {
                params.set('query', query)
            } else {
                params.delete('query')
            }
            replace(`${pathname}?${params.toString()}`)
        },
        [pathname, replace, searchParams],
    )

    return {
        options: options || [],
        rows: rows || [],
        columns,
        isLoading,
        handleSearch,
    }
}

const mockedOptions = ['BRCA1', 'TP53', 'EGFR', 'KRAS', 'ALK', 'PTEN', 'FLT3', 'MYC', 'MAP2K1', 'NOTCH1'] // Provided in task description
const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 230 },
    { field: 'email', headerName: 'E-mail', width: 230 },
    { field: 'body', headerName: 'Body', flex: 1 },
]

export default useHome
