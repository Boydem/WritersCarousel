import { httpService } from './http.service'

export const writerService = {
    loadWriters,
    loadMoreWriters,
}

async function loadWriters() {
    return httpService.get('writers')
}

async function loadMoreWriters(pageIdx: number) {
    return httpService.get(`writers?page=${pageIdx}`)
}
