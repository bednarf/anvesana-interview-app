'use client'

import { Alert, Box, Button, Container } from '@mui/material'
import { FC } from 'react'

interface Props {
    error: Error
    reset: () => void
}

const ErrorBoundary: FC<Props> = ({ error, reset }) => (
    <Container
        sx={{ height: '100vh', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBlock: 20 }}
    >
        <Box>
            <Alert
                severity={'error'}
                action={
                    <Button color={'inherit'} size={'small'} onClick={reset}>
                        {'Try again'}
                    </Button>
                }
            >
                {error.message}
            </Alert>
        </Box>
    </Container>
)

export default ErrorBoundary
