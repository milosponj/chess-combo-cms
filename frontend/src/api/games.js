import request from '@/utils/request'

export function createGame(data) {
  return request({
    url: '/api/games',
    method: 'post',
    data
  })
}

export function updateGame(data) {
  return request({
    url: '/api/games/' + data.id,
    method: 'put',
    data
  })
}

export function getGame(gameId) {
  return request({
    url: `/api/games/${gameId}`,
    method: 'get'
  })
}

export function getGamesList(params) {
  return request({
    url: '/api/games/list',
    method: 'get',
    params
  })
}
