/**
 * Created by djz on 2023/3/24.
 */
import {http} from '../utils/http/axios/index'

// 获取组织列表
export const queryOrgList = (params) => {
    return http.request(
        {
            url: '/orgs',
            method: 'GET',
            params
        },
        {
            acceptDesc: 'org',
        },
    )
}

// 获取 新建组织 transfer data source
export function getOrgTransferDataRequest() {
    return http.request(
        {
            url: '/users/search',
            method: 'GET',
            params: {
                limit: -1,
                enabled: true,
                verified: true
            }
        },
        {
            acceptDesc: 'org',
        },
    )
}

// 新建组织
export function createOrg(params) {
     return http.request(
        {
            url: '/orgs',
            method: 'POST',
            params
        },
        {
            acceptDesc: 'org',
        },
    )
}

// 删除组织
export function deleteOrg(orgId) {
  return http.request(
    {
      url: `/orgs/${orgId}`,
      method: 'delete',
    },
    {
      acceptDesc: 'org',
      isReturnNativeResponse: true,
    },
  )
}

