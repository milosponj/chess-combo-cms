import request from '@/utils/request'

export function getCombinationsList(params) {
  return request({
    url: '/api/combinations',
    method: 'get',
    params
  })
}

export function createCombination(data) {
  return request({
    url: '/api/combinations',
    method: 'post',
    data
  })
}

export function updateCombination(data) {
  return request({
    url: '/api/combinations/' + data.id,
    method: 'put',
    data
  })
}

export function getCombination(id) {
  return request({
    url: `/api/combinations/${id}`,
    method: 'get'
  })
}
