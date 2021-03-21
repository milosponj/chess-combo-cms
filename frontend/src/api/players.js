import request from '@/utils/request'

export function getPlayersList(params) {
  return request({
    url: '/api/players',
    method: 'get',
    params
  })
}

export function createPlayer(data) {
  return request({
    url: '/api/players',
    method: 'post',
    data
  })
}
