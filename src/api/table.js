import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getScmList(scmDataDTO) {
  return request({
    url: '/scm/list',
    method: 'post',
    data: scmDataDTO
  })
}

export function scheduleGetScmList(size) {
  return request({
    url: `/scm/schedule/${size}`,
    method: 'get',
  })
}

export function deleteScmById(id) {
  return request({
    url: `/scm/byId/${id}`,
    method: 'delete',
  })
}


export function getAccountList(accountDTO) {
  return request({
    url: '/account/list',
    method: 'post',
    data: accountDTO
  })
}

export function deleteAccountById(id) {
  return request({
    url: `/account/byId/${id}`,
    method: 'delete',
  })
}


export function addUser(account) {
  return request({
    url: `/account/save`,
    method: 'put',
    data: account
  })
}

export function updateUser(account) {
  return request({
    url: `/account//update/byId`,
    method: 'put',
    data: account
  })
}
